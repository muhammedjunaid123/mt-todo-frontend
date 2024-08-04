import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ProjectService } from '../../services/project/project.service';
import { ToastrService } from 'ngx-toastr';
import { TodoService } from '../../services/todo/todo.service';


@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrl: './todo-create.component.css'
})
export class TodoCreateComponent implements OnInit {
  todoForm!: FormGroup;
  readonly dialog = inject(MatDialog);
  constructor(
    private fb: FormBuilder,
    private _todoservice: TodoService,
    private _ToastrService: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

  }
  ngOnInit(): void {
    this.todoForm = this.fb.group({
      Description: ['', Validators.required],
      projectId:[this.data['id'],Validators.required]
    });
  }


  onSubmit() {
    if (this.todoForm.valid) {
      const newProject = this.todoForm.value;
      if (newProject['Description'].trim() == "") {
        this._ToastrService.error('Description is required')
        return
      } else {
        newProject['Description'] = newProject['Description'].trim()
      }
      this._todoservice.todoCreate(newProject).subscribe({
        next: (res: any) => {
          this._ToastrService.success(res['message'])
          this.dialog.closeAll()

        }
      })

    }
  }
}
