import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'pedidos',
    loadComponent: () => import('./pedidos/pedidos.page').then( m => m.PedidosPage)
  },
  {
    path: 'produtos/:id',
    loadComponent: () => import('./produtos/produtos.page').then( m => m.ProdutosPage)
  },
];
