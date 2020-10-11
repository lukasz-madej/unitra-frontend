import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModule } from './auth/auth.module';
import { ApiModule } from './api/api.module';
import { MainModule } from './main/main.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthModule,
    ApiModule,
    MainModule
  ]
})
export class CoreModule { }
