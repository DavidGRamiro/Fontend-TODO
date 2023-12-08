import { Routes } from '@angular/router';

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
      { path: 'logout', title: 'Logout', loadComponent:() => import('./dashboard/pages/logout/logout.component') },
      { path: 'admin', title: "Administrador", loadComponent: () => import('./dashboard/pages/admin/admin.component') },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },
  {
    path: 'usuarios',
    loadComponent: () => import('./usuarios/usuarios.component'),
    children : [
      { path: 'perfil', title: 'Perfil', loadComponent: () => import('./usuarios/pages/perfil/perfil.component')},
    ]
  },
  {
    path: '*',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];
