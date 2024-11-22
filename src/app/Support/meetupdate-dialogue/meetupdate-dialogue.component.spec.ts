import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetupdateDialogueComponent } from './meetupdate-dialogue.component';

describe('MeetupdateDialogueComponent', () => {
  let component: MeetupdateDialogueComponent;
  let fixture: ComponentFixture<MeetupdateDialogueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MeetupdateDialogueComponent]
    });
    fixture = TestBed.createComponent(MeetupdateDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
