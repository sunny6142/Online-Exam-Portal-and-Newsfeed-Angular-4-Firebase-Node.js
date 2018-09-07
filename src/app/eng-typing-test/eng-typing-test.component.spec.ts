import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EngTypingTestComponent } from './eng-typing-test.component';

describe('EngTypingTestComponent', () => {
  let component: EngTypingTestComponent;
  let fixture: ComponentFixture<EngTypingTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EngTypingTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EngTypingTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
