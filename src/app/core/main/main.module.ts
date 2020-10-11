import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { MatCardModule } from '@angular/material/card';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [MainComponent, SideBarComponent, TopBarComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    MatCardModule,
    MatIconModule,
    MatBadgeModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class MainModule { }
