import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportStatusComponent } from './support-status.component';

describe('SupportStatusComponent', () => {
  let component: SupportStatusComponent;
  let fixture: ComponentFixture<SupportStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupportStatusComponent]
    });
    fixture = TestBed.createComponent(SupportStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
