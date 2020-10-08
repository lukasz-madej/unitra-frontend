import { Component, OnInit } from '@angular/core';
import { PasswordInputType } from '../../models/login.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  passwordInputType: string;
  showPassword: boolean;
  loginForm: FormGroup;

  constructor(private _formBuilder: FormBuilder) {
    this.showPassword = false;
    this.passwordInputType = PasswordInputType.PASSWORD;
  }

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      login: [],
      password: []
    });
  }

  toggleShowPassword = (): void => {
    this.showPassword = !this.showPassword;
    this.passwordInputType = this.showPassword ? PasswordInputType.TEXT : PasswordInputType.PASSWORD;
  }

}
