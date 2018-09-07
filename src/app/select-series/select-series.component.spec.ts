import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSeriesComponent } from './select-series.component';

describe('SelectSeriesComponent', () => {
  let component: SelectSeriesComponent;
  let fixture: ComponentFixture<SelectSeriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectSeriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
