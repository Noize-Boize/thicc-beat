import { TestBed } from '@angular/core/testing';

import { SamplerService } from './sampler.service';

describe('SamplerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SamplerService = TestBed.get(SamplerService);
    expect(service).toBeTruthy();
  });
});
