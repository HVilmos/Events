import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfImproveComponent } from './self-improve.component';

describe('SelfImproveComponent', () => {
  let component: SelfImproveComponent;
  let fixture: ComponentFixture<SelfImproveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelfImproveComponent]
    });
    fixture = TestBed.createComponent(SelfImproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
