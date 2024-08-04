import { Component, inject, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project/project.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TodoCreateComponent } from '../todo-create/todo-create.component';
import { TodoService } from '../../services/todo/todo.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  constructor(private _projectService: ProjectService, private _activeRouter: ActivatedRoute, private _todoService: TodoService, private _toastr: ToastrService) { }
  project!: any
  editingTitle = false;
  editingTodoIndex: number | null = null;
  projectId!: string
  ngOnInit(): void {
    this._activeRouter.queryParams.subscribe((res: any) => {
      this.projectId = res['id']
      this._projectService.get_project(this.projectId).subscribe({
        next: (res: any) => {
          this.project = res['data'][0]
        }
      })
    })
  }

  toggleEditTitle(): void {
    this.editingTitle = true;
  }

  saveTitle(newTitle: string): void {

    this.editingTitle = false;
  }

  toggleEditTodo(index: number): void {
    if (this.editingTodoIndex === index) {
      this.editingTodoIndex = null;
    } else {
      this.editingTodoIndex = index;
    }
  }

  saveTodo(id: string, newDescription: string, newStatus: boolean): void {
    const data = { _id: id, Status: newStatus, Description: newDescription }
    this._todoService.todoUpdate(data).subscribe({
      next: (res: any) => {
        this._toastr.success(res['message'])
        this._projectService.get_project(this.projectId).subscribe({
          next: (res: any) => {
            this.project = res['data'][0]
          }
        })

      }
    })
    this.editingTodoIndex = null;
  }

  getCompletionRate(): number {
    const completedTodos = this.project?.ListTodos?.filter((todo: any) => todo.Status).length;
    return (completedTodos / this.project?.ListTodos?.length) * 100;
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(TodoCreateComponent, { data: { id: this.projectId } });
    dialogRef.afterClosed().subscribe((res) => {
      this._projectService.get_project(this.projectId).subscribe({
        next: (res: any) => {
          this.project = res['data'][0]
        }
      })
    })
  }

}
