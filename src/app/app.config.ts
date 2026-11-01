import { ApplicationConfig, LOCALE_ID, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import localeFrBE from '@angular/common/locales/fr-BE';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeFrBE);


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
     {
      provide: LOCALE_ID,
      useValue: 'fr-BE'
    }
  ]
};
