import { Component, OnInit } from '@angular/core';

import { Task } from '../../models/task.model';
import { DataService } from '../../service/data.service';
import { Project } from 'src/app/models/project.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-project',
  templateUrl: 'add-project.page.html',
  styleUrls: ['add-project.page.scss'],
})
export class AddProjectPage implements OnInit {
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

  addAnotherTask(): void {
    if (this.taskName && this.taskDescription) {
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
      }

      this.taskName = '';
      this.taskDescription = '';
    } else {
      alert('Enter task name & description to add a task.');
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
      if (!this.projectId) {
        this.projectId = Math.floor(100 + Math.random() * 900); // GENERATE A UNIQUE ID FOR THE PROJECT
      }

      this.dataService.addProject(projectObj);
      this.dataService.addTask(this.tasks);

      // CLEARING ALL THE INPUT FIELDS
      this.projectName = '';
      this.projectDescription = '';
      this.projectId = 0;
    } else {
      alert('Enter project name & description to add a project.');
    }
  }

  updateTaskDetails() {
    this.editTaskInfo.name = this.taskName;
    this.editTaskInfo.description = this.taskDescription;

    this.dataService.updateTask(this.editTaskInfo);
  }
}
