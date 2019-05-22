import { TestBed } from '@angular/core/testing';

import { SoccerpitchplanService } from './soccerpitchplan.service';

describe('SoccerpitchplanService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SoccerpitchplanService = TestBed.get(SoccerpitchplanService);
    expect(service).toBeTruthy();
  });
});
