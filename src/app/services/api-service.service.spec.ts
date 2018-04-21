import { TestBed, inject } from '@angular/core/testing';

import { ApiService } from './api-service.service';
import { testDependencies } from '../test.module';

describe('ApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule(testDependencies);
  });

  it('should be created', inject([ApiService], (service: ApiService) => {
    expect(service).toBeTruthy();
  }));
});
