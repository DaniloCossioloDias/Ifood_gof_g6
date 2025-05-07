import { bootstrapApplication, provideClientHydration } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { environment } from './environments/environment';
import { RestauranteState } from './app/state/restaurant/restaurante.state';
import { ProdutoState } from './app/state/product/produto.state';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideClientHydration(),
    provideHttpClient(),
    importProvidersFrom(NgxsModule.forRoot([
      // INSERIR STATES AQUI
      RestauranteState,
      ProdutoState
    ], {developmentMode: !environment.production}))
  ],
});
