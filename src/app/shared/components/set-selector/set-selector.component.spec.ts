import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetSelectorComponent } from './set-selector.component';

describe('SetAutocompleteComponent', () => {
  let component: SetSelectorComponent;
  let fixture: ComponentFixture<SetSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
