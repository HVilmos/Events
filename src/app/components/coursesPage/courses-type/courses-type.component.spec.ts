import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesTypeComponent } from './courses-type.component';

describe('CoursesTypeComponent', () => {
  let component: CoursesTypeComponent;
  let fixture: ComponentFixture<CoursesTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoursesTypeComponent]
    });
    fixture = TestBed.createComponent(CoursesTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
