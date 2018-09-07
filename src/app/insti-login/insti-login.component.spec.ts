import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstiLoginComponent } from './insti-login.component';

describe('InstiLoginComponent', () => {
  let component: InstiLoginComponent;
  let fixture: ComponentFixture<InstiLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstiLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstiLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
