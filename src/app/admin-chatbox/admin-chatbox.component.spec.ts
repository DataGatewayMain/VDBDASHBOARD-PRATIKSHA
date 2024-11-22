import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminChatboxComponent } from './admin-chatbox.component';

describe('AdminChatboxComponent', () => {
  let component: AdminChatboxComponent;
  let fixture: ComponentFixture<AdminChatboxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminChatboxComponent]
    });
    fixture = TestBed.createComponent(AdminChatboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
