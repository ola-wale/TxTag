import { TestBed, async, inject } from '@angular/core/testing';

import { LoggedInGuard } from './logged-in.guard';
import { testDependencies } from '../test.module';

describe('LoggedInGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule(testDependencies);
  });

  it('should ...', inject([LoggedInGuard], (guard: LoggedInGuard) => {
    expect(guard).toBeTruthy();
  }));
});
