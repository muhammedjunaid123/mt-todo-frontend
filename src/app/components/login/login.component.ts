import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user/user.service';
import { environment } from '../../../environments/environment.development';
import { IApiResponse } from '../../../types/api.interface';
import { user } from '../../../types/user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup
  constructor(
    private _fb: FormBuilder,
    private _toastr: ToastrService,
    private _userService: UserService,
    private _router: Router
  ) { }
  ngOnInit(): void {
    this.loginForm = this._fb.group({
      email: [null, Validators.email],
      password: [null, Validators.required]
    })
  }

  submit() {

    if (!this.loginForm.valid) {
      this._toastr.error('fields are required')
      return
    }
    this._userService.userLogin(this.loginForm.getRawValue()).subscribe({
      next: (res: IApiResponse<string>) => {
        this._toastr.success(res['message'])
        localStorage.setItem(environment.userSecret, res['data'])
        this._router.navigate(['home'])
      }
    })
  }
}
