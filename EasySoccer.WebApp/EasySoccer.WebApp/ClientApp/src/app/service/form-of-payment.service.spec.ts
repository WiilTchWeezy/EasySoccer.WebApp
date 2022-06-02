import { TestBed } from '@angular/core/testing';

import { FormOfPaymentService } from './form-of-payment.service';

describe('FormOfPaymentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormOfPaymentService = TestBed.get(FormOfPaymentService);
    expect(service).toBeTruthy();
  });
});
