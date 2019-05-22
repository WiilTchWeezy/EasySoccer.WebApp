import { TestBed } from '@angular/core/testing';

import { SoccerpitchService } from './soccerpitch.service';

describe('SoccerpitchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SoccerpitchService = TestBed.get(SoccerpitchService);
    expect(service).toBeTruthy();
  });
});
