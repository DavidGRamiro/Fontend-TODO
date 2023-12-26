import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { TokenService } from './services/token.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withViewTransitions()
      ),
    provideClientHydration(),
    provideHttpClient(),
    provideAnimations(),
    importProvidersFrom(
      HttpClientModule,
    ),
    { provide: HTTP_INTERCEPTORS, useClass: TokenService, multi: true }

  ]
};
