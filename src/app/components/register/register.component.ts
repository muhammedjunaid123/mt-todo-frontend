import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { __createBinding } from 'tslib';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';
import { IApiResponse } from '../../../types/api.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup
  constructor(
    private _fb: FormBuilder,
    private _toastr: ToastrService,
    private _userService: UserService,
   private _router:Router
  ) { }
  ngOnInit(): void {
    this.registerForm = this._fb.group({
      email: [null, Validators.email],
      password: [null, Validators.required]
    })
  }
  submit() {

    if (!this.registerForm.valid) {
      this._toastr.error('fields are required')
      return
    }
    this._userService.userRegister(this.registerForm.getRawValue()).subscribe({
      next: (res:  IApiResponse<any>) => {
        console.log(res);

        this._toastr.success(res['message'])
        this._router.navigate(['login'])
      }
    })
  }
}
