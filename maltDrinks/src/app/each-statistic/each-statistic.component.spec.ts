import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EachStatisticComponent } from './each-statistic.component';

describe('EachStatisticComponent', () => {
  let component: EachStatisticComponent;
  let fixture: ComponentFixture<EachStatisticComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EachStatisticComponent]
    });
    fixture = TestBed.createComponent(EachStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
