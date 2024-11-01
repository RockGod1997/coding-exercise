import { ApplicationConfig, importProvidersFrom, EnvironmentProviders, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { portfolioReducer } from './store/portfolio-reducer';
import { PortfolioEffects } from './store';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),  provideStore({ portfolio:portfolioReducer }), provideAnimationsAsync('noop'),provideEffects([PortfolioEffects])]
};

