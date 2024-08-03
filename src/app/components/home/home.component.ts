import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  projects = [
    { title: 'Project 1', description: 'Description for project 1' },
    { title: 'Project 2', description: 'Description for project 2' },
    { title: 'Project 3', description: 'Description for project 3' },
  ];
}
