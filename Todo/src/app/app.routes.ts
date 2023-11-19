import { Routes } from '@angular/router';
import path from 'path';

export const routes: Routes = [

  {
    path: 'home',
    loadComponent : () => import('./dashboard/pages/home/home.component')
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component'),
    children: [
      { path: 'login', title:'Login', loadComponent: () => import('./dashboard/pages/login/login.component') },
      { path: 'logout', title: 'Logout', loadComponent:() => import('./dashboard/pages/logout/logout.component') },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]

  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];
