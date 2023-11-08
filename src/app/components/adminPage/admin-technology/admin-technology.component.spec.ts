import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTechnologyComponent } from './admin-technology.component';

describe('AdminTechnologyComponent', () => {
  let component: AdminTechnologyComponent;
  let fixture: ComponentFixture<AdminTechnologyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminTechnologyComponent]
    });
    fixture = TestBed.createComponent(AdminTechnologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
