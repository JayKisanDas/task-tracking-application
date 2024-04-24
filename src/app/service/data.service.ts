import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

import { Project } from '../models/project.model';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private projects: Project[] = [];
  private tasks: Task[] = [];

  constructor(private toastController: ToastController) {}

  getAllProjects(): Project[] {
    // RETRIEVE PROJECT DATA FROM LOCAL STORAGE
    const projectsJson = localStorage.getItem('projects');
    // PARSE JSON STRING TO AN ARRAY OF PROJECTS
    const projects: Project[] = projectsJson ? JSON.parse(projectsJson) : [];
    return projects;
  }

  addProject(project: Project): void {
    this.projects = [...this.getAllProjects(), project];

    // SAVE PROJECT TO LOCAL STORAGE
    localStorage.setItem('projects', JSON.stringify(this.projects));
  }

  getAllTasks(): Task[] {
    const tasksJson = localStorage.getItem('tasks');
    const tasks: Task[] = tasksJson ? JSON.parse(tasksJson) : [];
    return tasks;
  }

  getProjectById(projectId: number): Project[] {
    // RETRIEVE TASK DATA FROM LOCAL STORAGE
    const projectsJson = localStorage.getItem('projects');
    // PARSE JSON STRING TO AN ARRAY OF PROJECTS
    const projects: Project[] = projectsJson ? JSON.parse(projectsJson) : [];
    return projects.filter((project) => project.id === projectId);
  }

  getTasksByProjectId(projectId: number): Task[] {
    // RETRIEVE TASK DATA FROM LOCAL STORAGE
    const tasksJson = localStorage.getItem('tasks');
    // PARSE JSON STRING TO AN ARRAY OF TASKS
    const tasks: Task[] = tasksJson ? JSON.parse(tasksJson) : [];
    return tasks.filter((task) => task.projectId === projectId);
  }

  getTaskById(taskId: number): Task[] {
    // RETRIEVE TASK DATA FROM LOCAL STORAGE
    const tasksJson = localStorage.getItem('tasks');
    // PARSE JSON STRING TO AN ARRAY OF TASKS
    const tasks: Task[] = tasksJson ? JSON.parse(tasksJson) : [];
    return tasks.filter((task) => task.id === taskId);
  }

  addTask(task: Task[]): void {
    this.tasks = [...this.getAllTasks(), ...task];

    // SAVE TASKS TO LOCAL STORAGE
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  updateTask(task: Task): void {
    let tasks: Task[] = this.getAllTasks();

    const index = tasks.findIndex((t) => t.id === task.id);
    if (index !== -1) {
      tasks[index] = task;
      localStorage.setItem('tasks', JSON.stringify(tasks));
      this.presentToast('Task has been updated.');
    }
  }

  deleteTask(taskId: number): void {
    let tasks: Task[] = this.getAllTasks();
    tasks = tasks.filter((task) => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
  }

  /**
   * PRESENT TOAST MESSAGE
   *
   * @param position
   */
  async presentToast(
    message: string,
    color: string = 'success',
    position: 'top' | 'middle' | 'bottom' = 'bottom'
  ) {
    const toast = await this.toastController.create({
      message,
      duration: 1500,
      position: position,
      color,
    });

    await toast.present();
  }
}
