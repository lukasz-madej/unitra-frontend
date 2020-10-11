import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { MatCardModule } from '@angular/material/card';
import { SideBarComponent } from './components/side-bar/side-bar.component';



@NgModule({
  declarations: [MainComponent, SideBarComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    MatCardModule
  ]
})
export class MainModule { }
