import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'pedidos',
    loadComponent: () =>
      import('./pedidos/pedidos.page').then((m) => m.PedidosPage),
  },
  {
    path: 'produtos/:id',
    loadComponent: () =>
      import('./produtos/produtos.page').then((m) => m.ProdutosPage),
  },
  {
    path: 'crud/restaurantes',
    loadComponent: () =>
      import('./restaurantes/lista-restaurantes/lista-restaurantes.page').then(
        (m) => m.ListaRestaurantesPage
      ),
  },
  {
    path: 'crud/restaurante/new',
    loadComponent: () =>
      import('./restaurantes/novo-restaurante/novo-restaurante.page').then(
        (m) => m.NovoRestaurantePage
      ),
  },
  {
    path: 'crud/restaurante/:id',
    loadComponent: () =>
      import('./restaurantes/editar-restaurante/editar-restaurante.page').then(
        (m) => m.EditarRestaurantePage
      ),
  },
];