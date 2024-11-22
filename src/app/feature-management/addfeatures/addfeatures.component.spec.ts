import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddfeaturesComponent } from './addfeatures.component';

describe('AddfeaturesComponent', () => {
  let component: AddfeaturesComponent;
  let fixture: ComponentFixture<AddfeaturesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddfeaturesComponent]
    });
    fixture = TestBed.createComponent(AddfeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
