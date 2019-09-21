import { TestBed } from '@angular/core/testing';

import { ToastserviceService } from './toastservice.service';

describe('ToastserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ToastserviceService = TestBed.get(ToastserviceService);
    expect(service).toBeTruthy();
  });
});
