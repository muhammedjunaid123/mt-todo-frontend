import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ProjectService } from '../../services/project/project.service';
import { ToastrService } from 'ngx-toastr';
import { IApiResponse } from '../../../types/api.interface';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrl: './project-create.component.css'
})
export class ProjectCreateComponent {
  projectForm: FormGroup;
  readonly dialog = inject(MatDialog);
  constructor(
    private fb: FormBuilder,
    private _projectService: ProjectService,
    private _ToastrService: ToastrService
  ) {
    // Initialize the form with a title field
    this.projectForm = this.fb.group({
      Title: ['', Validators.required]
    });
  }

  // Method to handle form submission
  onSubmit() {
    if (this.projectForm.valid) {
      const newProject = this.projectForm.value;
      if (newProject['Title'].trim() == "") {
        this._ToastrService.error('Title is required')
        return
      } else {
        newProject['Title'] = newProject['Title'].trim()
      }
      this._projectService.project_create(newProject).subscribe({
        next: (res:IApiResponse<any>) => {
          this._ToastrService.success(res['message'])
          this.dialog.closeAll()
        
        }
      })

    }
  }
}
