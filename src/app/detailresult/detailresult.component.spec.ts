import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailresultComponent } from './detailresult.component';

describe('DetailresultComponent', () => {
  let component: DetailresultComponent;
  let fixture: ComponentFixture<DetailresultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailresultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailresultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
