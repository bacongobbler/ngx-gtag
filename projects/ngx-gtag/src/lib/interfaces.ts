export interface CustomParams {
  [key: string]: any;
}

export interface GtagEvent extends CustomParams {
  event_category?: string;
  event_label?: string;
  value?: any;
}

export interface GtagPageview extends CustomParams {
  page_title?: string;
  page_path?: string;
  page_location?: string;
}

export interface GtagConfig {
  trackingId: string;
  trackPageviews?: boolean;
  debug?: boolean;
}
