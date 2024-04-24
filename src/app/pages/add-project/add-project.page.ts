import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Task } from '../../models/task.model';
import { DataService } from '../../service/data.service';
import { Project } from 'src/app/models/project.model';
import { ViewDidEnter } from '@ionic/angular';

@Component({
  selector: 'app-add-project',
  templateUrl: 'add-project.page.html',
  styleUrls: ['add-project.page.scss'],
})
export class AddProjectPage implements OnInit, ViewDidEnter {
  projectName: string = '';
  projectDescription: string = '';
  taskName: string = '';
  taskDescription: string = '';
  tasks: Task[] = [];
  project!: Project;
  projectId = Math.floor(100 + Math.random() * 900); // GENERATE A UNIQUE ID FOR THE PROJECT
  isExistingProjectId = false;
  isExistingTaskId = false;
  editTaskInfo!: Task;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const pId = Number(params['id']);
      const tId = Number(params['taskId']);

      if (pId) {
        this.projectId = pId;
        this.isExistingProjectId = true;
        const projectInfo = this.dataService.getProjectById(this.projectId);
        this.projectName = projectInfo[0].name;
        this.projectDescription = projectInfo[0].description;
      } else {
        this.isExistingProjectId = false;
        this.projectName = this.projectDescription = '';
        this.projectId = Math.floor(100 + Math.random() * 900); // GENERATE A UNIQUE ID FOR THE PROJECT
      }

      if (tId) {
        this.isExistingTaskId = true;
        this.editTaskInfo = this.dataService.getTaskById(tId)[0];
        this.taskName = this.editTaskInfo.name;
        this.taskDescription = this.editTaskInfo.description;
      } else {
        this.isExistingTaskId = false;
        this.taskName = this.taskDescription = '';
      }
    });
  }

  ionViewDidEnter(): void {
    if (!this.isExistingProjectId) {
      this.projectId = Math.floor(100 + Math.random() * 900); // GENERATE A UNIQUE ID FOR THE PROJECT
    }
  }

  addAnotherTask(): void {
    if (
      this.projectName &&
      this.projectDescription &&
      this.taskName &&
      this.taskDescription
    ) {
      const taskObj: Task = {
        id: Math.floor(Math.random() * 1000), // GENERATE A UNIQUE ID FOR THE TASK
        projectId: this.projectId,
        name: this.taskName,
        description: this.taskDescription,
        completed: false,
      };

      this.tasks.push(taskObj);

      if (this.isExistingProjectId) {
        this.dataService.addTask([taskObj]);
        this.dataService.presentToast(
          'New task added successfully for the Project Id: ' + taskObj.projectId
        );
      } else {
        this.dataService.presentToast(
          'New task added successfully. Click on ADD PROJECT to save the project along with the task.'
        );
      }

      this.taskName = '';
      this.taskDescription = '';
    } else {
      this.dataService.presentToast(
        'Enter project & task details to add a task.',
        'danger'
      );
    }
  }

  addProject(): void {
    const projectObj: Project = {
      id: this.projectId,
      name: this.projectName,
      description: this.projectDescription,
      tasks: [],
    };

    if (this.taskName && this.taskDescription) {
      this.addAnotherTask();
    }

    if (this.projectName && this.projectDescription) {
      this.dataService.addProject(projectObj);
      this.dataService.addTask(this.tasks);
      this.dataService.presentToast(
        "Project and it's task added successfully."
      );

      console.log(
        this.dataService.getAllProjects(),
        this.dataService.getAllTasks()
      );

      // CLEARING ALL THE INPUT FIELDS
      this.projectName = '';
      this.projectDescription = '';
      this.tasks = [];
      this.projectId = Math.floor(100 + Math.random() * 900); // GENERATE A UNIQUE ID FOR THE PROJECT
      projectObj.id = this.projectId;
    } else {
      this.dataService.presentToast(
        'Enter project name & description to add a project.',
        'danger'
      );
    }
  }

  updateTaskDetails() {
    this.editTaskInfo.name = this.taskName;
    this.editTaskInfo.description = this.taskDescription;

    this.dataService.updateTask(this.editTaskInfo);
  }
}
