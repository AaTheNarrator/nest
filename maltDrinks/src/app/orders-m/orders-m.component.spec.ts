import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersMComponent } from './orders-m.component';

describe('OrdersMComponent', () => {
  let component: OrdersMComponent;
  let fixture: ComponentFixture<OrdersMComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrdersMComponent]
    });
    fixture = TestBed.createComponent(OrdersMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
