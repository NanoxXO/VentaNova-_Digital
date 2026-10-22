import { registerLocaleData } from '@angular/common';
import localeEsCl from '@angular/common/locales/es-CL';
import {
  ApplicationConfig,
  LOCALE_ID,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';

registerLocaleData(localeEsCl);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'top' })),
    { provide: LOCALE_ID, useValue: 'es-CL' },
  ],
};
