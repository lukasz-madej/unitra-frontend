import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetsListPageComponent } from './sets-list-page.component';

describe('SetsListPageComponent', () => {
  let component: SetsListPageComponent;
  let fixture: ComponentFixture<SetsListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetsListPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetsListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
