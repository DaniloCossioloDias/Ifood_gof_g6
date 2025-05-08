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
import { RestauranteRepository } from './app/state/restaurant/restaurante.repository';
import { RestauranteHttpService } from './app/state/restaurant/restaurante.service';
import { ProductRepository } from './app/state/product/product.repository';
import { ProductHttpService } from './app/state/product/product.service';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideClientHydration(),
    provideHttpClient(),
    {provide: RestauranteRepository, useClass: RestauranteHttpService},
    {provide: ProductRepository, useClass: ProductHttpService},
    importProvidersFrom(NgxsModule.forRoot([
      // INSERIR STATES AQUI
      RestauranteState,
      ProdutoState
    ], {developmentMode: !environment.production}))
  ],
});
