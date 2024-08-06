import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProjectCreateComponent } from '../project-create/project-create.component';
import { ProjectService } from '../../services/project/project.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { ToastrService } from 'ngx-toastr';
import { IApiResponse } from '../../../types/api.interface';
import { IProject } from '../../../types/project.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  constructor(private _ProjectService: ProjectService, private _router: Router, private _toastr: ToastrService) { }
  Title = ''
  projects!: IProject[]
  ngOnInit(): void {
    this._ProjectService.user_project().subscribe({
      next: (res: IApiResponse<IProject[]>) => {
        this.projects = res['data']
      }
    })
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(ProjectCreateComponent);
    dialogRef.afterClosed().subscribe((res) => {
      this._ProjectService.user_project().subscribe({
        next: (res: IApiResponse<IProject[]>) => {
          this.projects = res['data']
        }
      })
    })
  }
  navigate(id: string) {
    this._router.navigate(['/project'], { queryParams: { id: id } })
  }
  logout() {
    localStorage.removeItem(environment.userSecret)
    this._router.navigate(['login'])
    this._toastr.success('Logout')
  }

}
