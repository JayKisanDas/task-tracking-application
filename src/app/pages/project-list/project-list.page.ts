import { Component, OnInit } from '@angular/core';

import { Project } from '../../models/project.model';
import { DataService } from '../../service/data.service';
import { Router } from '@angular/router';
import { ViewDidEnter } from '@ionic/angular';

@Component({
  selector: 'app-project-list',
  templateUrl: 'project-list.page.html',
  styleUrls: ['project-list.page.scss'],
})
export class ProjectListPage implements OnInit, ViewDidEnter {
  projects!: Project[];

  constructor(private router: Router, private dataService: DataService) {}

  ngOnInit() {
    this.projects = this.dataService.getAllProjects();
  }

  ionViewDidEnter(): void {
    this.projects = this.dataService.getAllProjects();
  }

  /**
   * NAVIGATE TO VIEW PROJECT DETAILS PAGE
   *
   * @param projectId
   */
  viewProjectDetails(projectId: number): void {
    this.router.navigateByUrl(`tabs/project-details/${projectId}`);
  }

  deleteProject(projectId: number): void {
    this.dataService.deleteProject(projectId);
    this.projects = this.dataService.getAllProjects();
  }
}
