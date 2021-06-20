import { TestBed } from '@angular/core/testing';

import { PersonCompanyService } from './person-company.service';

describe('PersonCompanyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PersonCompanyService = TestBed.get(PersonCompanyService);
    expect(service).toBeTruthy();
  });
});
