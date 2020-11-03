import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  diameter: number;

  @Input() show: boolean;
  @Input() small: boolean;

  ngOnInit(): void {
    this.diameter = this.small ? 60 : 100;
  }
}
