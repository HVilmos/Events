import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSelfImprovmentComponent } from './admin-self-improvment.component';

describe('AdminSelfImprovmentComponent', () => {
  let component: AdminSelfImprovmentComponent;
  let fixture: ComponentFixture<AdminSelfImprovmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminSelfImprovmentComponent]
    });
    fixture = TestBed.createComponent(AdminSelfImprovmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
