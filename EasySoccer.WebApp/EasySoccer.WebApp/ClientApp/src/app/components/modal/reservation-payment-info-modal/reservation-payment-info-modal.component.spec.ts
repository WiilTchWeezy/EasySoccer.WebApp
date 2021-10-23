import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationPaymentInfoModalComponent } from './reservation-payment-info-modal.component';

describe('ReservationPaymentInfoModalComponent', () => {
  let component: ReservationPaymentInfoModalComponent;
  let fixture: ComponentFixture<ReservationPaymentInfoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationPaymentInfoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationPaymentInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
