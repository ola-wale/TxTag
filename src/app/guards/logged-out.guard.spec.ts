import { TestBed, async, inject } from '@angular/core/testing';

import { LoggedOutGuard } from './logged-out.guard';
import { testDependencies } from '../test.module';

describe('LoggedOutGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule(testDependencies);
  });

  it('should ...', inject([LoggedOutGuard], (guard: LoggedOutGuard) => {
    expect(guard).toBeTruthy();
  }));
});
