import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConRegistrationComponent } from './con-registration.component';

describe('ConRegistrationComponent', () => {
  let component: ConRegistrationComponent;
  let fixture: ComponentFixture<ConRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
