import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YourexamComponent } from './yourexam.component';

describe('YourexamComponent', () => {
  let component: YourexamComponent;
  let fixture: ComponentFixture<YourexamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YourexamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YourexamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
