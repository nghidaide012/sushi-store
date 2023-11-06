import { TestBed } from '@angular/core/testing';

import { CusStoreService } from './cus-store.service';

describe('CusStoreService', () => {
  let service: CusStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CusStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
