import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Task } from '../../models/task.model';
import { DataService } from '../../service/data.service';
import { ViewDidEnter } from '@ionic/angular';

@Component({
  selector: 'app-project-details',
  templateUrl: 'project-details.page.html',
  styleUrls: ['project-details.page.scss'],
})
export class ProjectDetailsPage implements OnInit, ViewDidEnter {
  projectId!: number;
  tasks!: Task[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.projectId = Number(params.get('id'));
    });
    this.tasks = this.dataService.getTasksByProjectId(this.projectId);
  }

  ionViewDidEnter(): void {
    this.route.paramMap.subscribe((params) => {
      this.projectId = Number(params.get('id'));
    });
    this.tasks = this.dataService.getTasksByProjectId(this.projectId);
  }

  deleteTask(taskId: number) {
    this.dataService.deleteTask(taskId);
    this.tasks = this.dataService.getTasksByProjectId(this.projectId);
    this.dataService.presentToast('Task deleted successfully.');
  }

  editTask(taskId: number) {
    this.router.navigate(['/tabs/add-project'], {
      queryParams: { id: this.projectId, taskId },
    });
  }

  /**
   * NAVIGATE TO ADD PROJECT PAGE FOR EDIT
   */
  addTask(): void {
    this.router.navigate(['/tabs/add-project'], {
      queryParams: { id: this.projectId },
    });
  }
}
