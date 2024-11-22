import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportTicketsComponent } from './support-tickets.component';

describe('SupportTicketsComponent', () => {
  let component: SupportTicketsComponent;
  let fixture: ComponentFixture<SupportTicketsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupportTicketsComponent]
    });
    fixture = TestBed.createComponent(SupportTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
