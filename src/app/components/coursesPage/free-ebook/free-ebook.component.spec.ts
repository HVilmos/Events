import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeEbookComponent } from './free-ebook.component';

describe('FreeEbookComponent', () => {
  let component: FreeEbookComponent;
  let fixture: ComponentFixture<FreeEbookComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FreeEbookComponent]
    });
    fixture = TestBed.createComponent(FreeEbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
