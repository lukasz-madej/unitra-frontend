import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../shared/services/category/category.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private _categoryService: CategoryService) { }

  ngOnInit(): void {
    this._initializeData();
  }

  private _initializeData = (): void => {
    this._categoryService.getList();
  }
}
