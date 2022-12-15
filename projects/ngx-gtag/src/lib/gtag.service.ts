import { Injectable, Inject } from '@angular/core';
import { GtagPageview, GtagEvent, GtagConfig, CustomParams } from './interfaces';
import { Router, NavigationEnd } from '@angular/router';

declare var gtag: any;

@Injectable()
export class GtagService {
  private mergedConfig: GtagConfig;

  constructor(@Inject('config') gaConfig: GtagConfig, private router: Router) {
    this.mergedConfig = { trackPageviews: true, ...gaConfig };
    if (this.mergedConfig.trackPageviews) {
      router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.pageview();
        }
      });
    }
  }

  event(action: string, params: GtagEvent = {}) {
    // try/catch to avoid cross-platform issues
    try {
      gtag('event', action, params);
      this.debug('event', this.mergedConfig.trackingId, action, params);
    } catch (err) {
      console.error('Google Analytics event error', err);
    }
  }

  // https://developers.google.com/analytics/devguides/collection/gtagjs/pages
  pageview(params?: GtagPageview) {
    try {
      gtag('config', this.mergedConfig.trackingId, params);
      this.debug('pageview', this.mergedConfig.trackingId, params);
    } catch (err) {
      console.error('Google Analytics pageview error', err);
    }
  }

  config(params: CustomParams) {
    try {
      gtag('config', this.mergedConfig.trackingId, params);
    } catch (err) {
      console.error('Google Analytics config error', err);
    }
  }

  set(params: CustomParams) {
    try {
      gtag('set', params);
    } catch (err) {
      console.error('Google Analytics set error', err);
    }
  }

  private debug(...msg: any[]) {
    if (this.mergedConfig.debug) {
      console.log('angular-gtag:', ...msg);
    }
  }
}
