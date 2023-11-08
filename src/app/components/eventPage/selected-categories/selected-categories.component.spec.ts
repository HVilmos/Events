import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedCategoriesComponent } from './selected-categories.component';

describe('SelectedCategoriesComponent', () => {
  let component: SelectedCategoriesComponent;
  let fixture: ComponentFixture<SelectedCategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectedCategoriesComponent]
    });
    fixture = TestBed.createComponent(SelectedCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
