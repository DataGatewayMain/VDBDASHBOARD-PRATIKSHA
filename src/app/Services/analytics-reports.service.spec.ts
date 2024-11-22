import { TestBed } from '@angular/core/testing';

import { AnalyticsReportsService } from './analytics-reports.service';

describe('AnalyticsReportsService', () => {
  let service: AnalyticsReportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnalyticsReportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
