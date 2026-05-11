import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {

  tasks: any[] = [];

  newTask = {
    title: '',
    description: '',
    
    status: 'TODO',
    dueDate: '',
    project: {
      id: 1
    },
    assignedTo: {
      id: 6
    }
  };

  constructor(private http: HttpClient,private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {

    this.loadTasks();
  }

  loadTasks() {

    const token = localStorage.getItem('token');

    this.http.get(
      'https://task-manager-fullstack-aubv.onrender.com/api/tasks',
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    ).subscribe((res: any) => {

      console.log(res);

      this.tasks = res;

    }, (error) => {

      console.log(error);

    });
  }

  createTask() {

    const token = localStorage.getItem('token');

    this.http.post(
      'https://task-manager-fullstack-aubv.onrender.com/api/tasks',
      this.newTask,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    ).subscribe(() => {

      alert('Task Created');

      this.newTask = {
        title: '',
        description: '',
        status: 'TODO',
        dueDate: '',
        project: {
          id: 1
        },
        assignedTo: {
          id: 1
        }
      };

      // Reload tasks automatically
      this.loadTasks();
      this.cdr.detectChanges();

    }, (error) => {

      console.log(error);

      alert('Task creation failed');

    });
  }

  logout() {

    localStorage.removeItem('token');

    window.location.href = '/';
  }
}