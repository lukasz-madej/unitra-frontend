import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesListPageComponent } from './categories-list-page.component';

describe('CategoriesPageComponent', () => {
  let component: CategoriesListPageComponent;
  let fixture: ComponentFixture<CategoriesListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriesListPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
