import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFormOfPaymentComponent } from './add-form-of-payment.component';

describe('AddFormOfPaymentComponent', () => {
  let component: AddFormOfPaymentComponent;
  let fixture: ComponentFixture<AddFormOfPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFormOfPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFormOfPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
