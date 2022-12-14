import { GtagService } from './gtag.service';
import { Router } from '@angular/router';

describe('Gtag', () => {
  let gtag: GtagService;

  beforeEach(() => {
    gtag = new GtagService({ trackingId: 'testId' }, {} as Router);
  });

  it('should be defined', () => {
    expect(gtag).toBeDefined();
  });
});
