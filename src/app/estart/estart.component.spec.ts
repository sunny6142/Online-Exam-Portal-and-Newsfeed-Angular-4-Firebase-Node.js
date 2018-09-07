import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstartComponent } from './estart.component';

describe('EstartComponent', () => {
  let component: EstartComponent;
  let fixture: ComponentFixture<EstartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
