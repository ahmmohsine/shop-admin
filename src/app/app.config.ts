import { ApplicationConfig, LOCALE_ID, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import localeFrBE from '@angular/common/locales/fr-BE';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeFrBE);


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
     {
      provide: LOCALE_ID,
      useValue: 'fr-BE'
    }
  ]
};
