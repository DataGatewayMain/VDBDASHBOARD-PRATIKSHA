import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewfeedbacksComponent } from './viewfeedbacks.component';

describe('ViewfeedbacksComponent', () => {
  let component: ViewfeedbacksComponent;
  let fixture: ComponentFixture<ViewfeedbacksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewfeedbacksComponent]
    });
    fixture = TestBed.createComponent(ViewfeedbacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
