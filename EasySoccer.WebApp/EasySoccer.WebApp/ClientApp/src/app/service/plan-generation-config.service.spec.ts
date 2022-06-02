import { TestBed } from '@angular/core/testing';

import { PlanGenerationConfigService } from './plan-generation-config.service';

describe('PlanGenerationConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlanGenerationConfigService = TestBed.get(PlanGenerationConfigService);
    expect(service).toBeTruthy();
  });
});
