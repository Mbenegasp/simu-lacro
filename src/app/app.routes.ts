import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'catalogo'
    },
    {
        path: 'catalogo',
        loadComponent: () => import('./features/catalogo/catalogo').then(m => m.Catalogo)
    },
    {
        path: 'agregar',
        loadComponent: () => import('./features/agregar-pantalones/agregar-pantalones')
        .then(m => m.AgregarPantalones)
    },
    {
        path: 'detalle:id',
        loadComponent: () => import('./features/detalle-pantalones/detalle-pantalones')
        .then(m => m.DetallePantalones)
    },
    {
        path: '**',
        redirectTo: ''
    }
];
