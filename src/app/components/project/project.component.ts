import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project/project.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit {
  constructor(private _projectService: ProjectService, private _activeRouter: ActivatedRoute) { }
  project!: any
  editingTitle = false;
  editingTodoIndex: number | null = null;

  projectId!: string
  ngOnInit(): void {
    this._activeRouter.queryParams.subscribe((res: any) => {
      this.projectId = res['id']
      this._projectService.get_project(this.projectId).subscribe({
        next: (res: any) => {
          this.project = res['data']
        }
      })
    })
  }

  toggleEditTitle(): void {
    this.editingTitle = !this.editingTitle;
  }

  saveTitle(newTitle: string): void {
    this.project.Title = newTitle;
    this.editingTitle = false;
  }

  toggleEditTodo(index: number): void {
    if (this.editingTodoIndex === index) {
      this.editingTodoIndex = null;
    } else {
      this.editingTodoIndex = index;
    }
  }

  saveTodo(index: number, newDescription: string, newStatus: boolean): void {
    this.project.ListTodos[index].Description = newDescription;
    this.project.ListTodos[index].Status = newStatus;
    this.editingTodoIndex = null;
  }

  getCompletionRate(): number {
    const completedTodos = this.project.ListTodos.filter((todo:any) => todo.Status).length;
    return (completedTodos / this.project.ListTodos.length) * 100;
  }


}
