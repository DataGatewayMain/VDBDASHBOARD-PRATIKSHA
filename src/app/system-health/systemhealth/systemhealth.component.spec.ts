import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemhealthComponent } from './systemhealth.component';

describe('SystemhealthComponent', () => {
  let component: SystemhealthComponent;
  let fixture: ComponentFixture<SystemhealthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SystemhealthComponent]
    });
    fixture = TestBed.createComponent(SystemhealthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
