import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileloginComponent } from './mobilelogin.component';

describe('MobileloginComponent', () => {
  let component: MobileloginComponent;
  let fixture: ComponentFixture<MobileloginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileloginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
