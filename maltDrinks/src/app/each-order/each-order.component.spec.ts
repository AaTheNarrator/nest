import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EachOrderComponent } from './each-order.component';

describe('EachOrderComponent', () => {
  let component: EachOrderComponent;
  let fixture: ComponentFixture<EachOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EachOrderComponent]
    });
    fixture = TestBed.createComponent(EachOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
