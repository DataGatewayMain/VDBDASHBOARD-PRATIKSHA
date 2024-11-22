import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteUserListComponent } from './invite-user-list.component';

describe('InviteUserListComponent', () => {
  let component: InviteUserListComponent;
  let fixture: ComponentFixture<InviteUserListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InviteUserListComponent]
    });
    fixture = TestBed.createComponent(InviteUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
