import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'pedidos',
    loadComponent: () => import('./pedidos/pedidos.page').then( m => m.PedidosPage)
  },
  {
    path: 'historico',
    loadComponent: () => import('./historico/historico.page').then( m => m.HistoricoPage)
  },
  {
    path: 'cupons',
    loadComponent: () => import('./cupons/cupons.page').then( m => m.CuponsPage)
  },
  {
    path: 'tabs',
    loadComponent: () => import('./tabs/tabs.page').then( m => m.TabsPage)
  },
];
