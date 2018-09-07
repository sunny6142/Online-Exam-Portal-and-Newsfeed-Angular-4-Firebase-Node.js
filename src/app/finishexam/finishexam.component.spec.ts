import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishexamComponent } from './finishexam.component';

describe('FinishexamComponent', () => {
  let component: FinishexamComponent;
  let fixture: ComponentFixture<FinishexamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinishexamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishexamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
