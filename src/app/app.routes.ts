import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full'
  },
  {
    path: 'users',
    loadComponent: () => import('@components/users/users/users.component').then((m) => m.UsersComponent),
  },
  {
    path: 'users/add',
    loadComponent: () => import('@components/users/form/form.component').then((m) => m.FormComponent),
  },
  {
    path: 'users/edit/:id',
    loadComponent: () => import('@components/users/form/form.component').then((m) => m.FormComponent),
  },
];
