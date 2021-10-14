import { TestBed } from '@angular/core/testing';

import { ReservationsPaymentService } from './reservations-payment.service';

describe('ReservationsPaymentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReservationsPaymentService = TestBed.get(ReservationsPaymentService);
    expect(service).toBeTruthy();
  });
});
