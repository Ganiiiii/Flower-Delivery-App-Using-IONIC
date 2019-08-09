import { TestBed } from '@angular/core/testing';

import { ServicService } from './servic.service';

describe('ServicService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServicService = TestBed.get(ServicService);
    expect(service).toBeTruthy();
  });
});
