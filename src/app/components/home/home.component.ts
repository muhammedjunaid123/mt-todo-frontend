import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProjectCreateComponent } from '../project-create/project-create.component';
import { ProjectService } from '../../services/project/project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  constructor(private _ProjectService: ProjectService,private _router:Router) { }
  Title = ''
  projects = []
  ngOnInit(): void {
    this._ProjectService.user_project().subscribe({
      next: (res: any) => {
        this.projects = res['data']
      }
    })
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(ProjectCreateComponent);
    dialogRef.afterClosed().subscribe((res) => {
      this._ProjectService.user_project().subscribe({
        next: (res: any) => {
          this.projects = res['data']
        }
      })
    })
  }
  navigate(id:string){
  this._router.navigate(['/project'],{queryParams:{id:id}})
  }

}
