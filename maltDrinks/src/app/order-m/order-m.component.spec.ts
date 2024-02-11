import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderMComponent } from './order-m.component';

describe('OrderMComponent', () => {
  let component: OrderMComponent;
  let fixture: ComponentFixture<OrderMComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderMComponent]
    });
    fixture = TestBed.createComponent(OrderMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
