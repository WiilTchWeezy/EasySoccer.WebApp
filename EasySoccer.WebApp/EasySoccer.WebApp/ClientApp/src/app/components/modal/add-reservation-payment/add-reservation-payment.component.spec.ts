import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReservationPaymentComponent } from './add-reservation-payment.component';

describe('AddReservationPaymentComponent', () => {
  let component: AddReservationPaymentComponent;
  let fixture: ComponentFixture<AddReservationPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddReservationPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReservationPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
