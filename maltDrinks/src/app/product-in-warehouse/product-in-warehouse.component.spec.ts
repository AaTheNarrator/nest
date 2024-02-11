import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInWarehouseComponent } from './product-in-warehouse.component';

describe('ProductInWarehouseComponent', () => {
  let component: ProductInWarehouseComponent;
  let fixture: ComponentFixture<ProductInWarehouseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductInWarehouseComponent]
    });
    fixture = TestBed.createComponent(ProductInWarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
