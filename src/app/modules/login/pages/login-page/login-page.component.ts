import { Component, OnInit } from '@angular/core';
import { PasswordInputType } from '../../models/login.model';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  passwordInputType: string;
  showPassword: boolean;
  loginForm: FormGroup;

  get login(): AbstractControl {
    return this.loginForm.get('login');
  }
  get password(): AbstractControl {
    return this.loginForm.get('password');
  }

  constructor(private _formBuilder: FormBuilder, private _loginService: LoginService) {
    this.showPassword = false;
    this.passwordInputType = PasswordInputType.PASSWORD;
  }

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  toggleShowPassword = (): void => {
    this.showPassword = !this.showPassword;
    this.passwordInputType = this.showPassword ? PasswordInputType.TEXT : PasswordInputType.PASSWORD;
  }

  onLogin = (): void => {
    if (this.loginForm.valid) {
      this._loginService.userLogin(this.loginForm.value);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
