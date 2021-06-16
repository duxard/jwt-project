import { InjectionToken } from '@angular/core';
import { environment as AppConfig } from '../../environments/environment';

export const APP_CONFIG = new InjectionToken('Application configuration', {
  providedIn: 'root',
  factory: () => (AppConfig)
});
