import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectexamComponent } from './selectexam.component';

describe('SelectexamComponent', () => {
  let component: SelectexamComponent;
  let fixture: ComponentFixture<SelectexamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectexamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectexamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
