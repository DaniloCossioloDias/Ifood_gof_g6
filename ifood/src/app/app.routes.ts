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
  {
    path: 'crud/produtos/:id',
    loadComponent: () =>
      import('./produtos/lista-produtos/lista-produtos.page').then(
        (m) => m.ListaProdutosPage
      ),
  },
  {
    path: 'crud/produto/new',
    loadComponent: () =>
      import('./produtos/novo-produto/novo-produto.page').then(
        (m) => m.NovoProdutoPage
      ),
  },
  {
    path: 'crud/produto/:id',
    loadComponent: () =>
      import('./produtos/editar-produto/editar-produto.page').then(
        (m) => m.EditarProdutoPage
      ),
  },
  {
    path: 'tab1',
    loadComponent: () => import('./tab1/tab1.page').then((m) => m.Tab1Page),
  },
];