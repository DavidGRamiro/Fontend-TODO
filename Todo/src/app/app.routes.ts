import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

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
      { path: 'registro', title: "Registro", loadComponent: () => import('./dashboard/pages/register/register.component') },
      { path: 'admin', title: "Administrador", loadComponent: () => import('./dashboard/pages/admin/admin.component') },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },
  {
    path: 'usuarios',
    loadComponent: () => import('./usuarios/usuarios.component'),
    children : [
      { path: 'perfil', title: 'Perfil', loadComponent: () => import('./usuarios/pages/perfil/perfil.component'), canActivate: [authGuard]},
    ]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];
