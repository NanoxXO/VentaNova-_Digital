import { Routes } from '@angular/router';
import { Catalogo } from './pages/catalogo/catalogo';
import { Contacto } from './pages/contacto/contacto';
import { Inicio } from './pages/inicio/inicio';
import { Tendencias } from './pages/tendencias/tendencias';

export const routes: Routes = [
  { path: '', component: Inicio, title: 'Inicio | VentaNova Digital' },
  { path: 'catalogo', component: Catalogo, title: 'Catálogo | VentaNova Digital' },
  { path: 'tendencias', component: Tendencias, title: 'Tendencias | VentaNova Digital' },
  { path: 'contacto', component: Contacto, title: 'Contacto | VentaNova Digital' },
  { path: '**', redirectTo: '' },
];
