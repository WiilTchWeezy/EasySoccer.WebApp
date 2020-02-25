import { TestBed } from '@angular/core/testing';

import { CompanyUserService } from './company-user.service';

describe('CompanyUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CompanyUserService = TestBed.get(CompanyUserService);
    expect(service).toBeTruthy();
  });
});
