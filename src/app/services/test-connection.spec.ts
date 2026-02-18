import { TestBed } from '@angular/core/testing';

import { TestConnection } from './test-connection';

describe('TestConnection', () => {
  let service: TestConnection;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestConnection);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
