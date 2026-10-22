import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CatalogoService } from '../../services/catalogo.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
      <nav class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a routerLink="/" class="flex items-center gap-2 text-xl font-extrabold text-nova-900">
          <span class="grid h-9 w-9 place-items-center rounded-xl bg-nova-600 text-white">N</span>
          VentaNova <span class="text-nova-600">Digital</span>
        </a>

        <button
          type="button"
          class="rounded-lg p-2 text-slate-700 hover:bg-slate-100 md:hidden"
          (click)="alternarMenu()"
          aria-label="Abrir o cerrar el menú"
        >
          {{ menuAbierto() ? '✕' : '☰' }}
        </button>

        <ul class="hidden items-center gap-1 md:flex">
          @for (enlace of enlaces; track enlace.ruta) {
            <li>
              <a
                [routerLink]="enlace.ruta"
                routerLinkActive="bg-nova-50 text-nova-700"
                [routerLinkActiveOptions]="{ exact: enlace.ruta === '/' }"
                class="rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
              >
                {{ enlace.texto }}
              </a>
            </li>
          }
          <li>
            <a
              routerLink="/contacto"
              class="ml-2 rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white"
            >
              Mi lista: {{ interes.listaInteres().length }}
            </a>
          </li>
        </ul>
      </nav>

      @if (menuAbierto()) {
        <ul class="space-y-1 border-t border-slate-200 bg-white px-4 py-3 md:hidden">
          @for (enlace of enlaces; track enlace.ruta) {
            <li>
              <a
                [routerLink]="enlace.ruta"
                routerLinkActive="bg-nova-50 text-nova-700"
                [routerLinkActiveOptions]="{ exact: enlace.ruta === '/' }"
                (click)="menuAbierto.set(false)"
                class="block rounded-lg px-4 py-2 font-semibold text-slate-600"
              >
                {{ enlace.texto }}
              </a>
            </li>
          }
        </ul>
      }
    </header>
  `,
})
export class Navbar {
  protected readonly interes = inject(CatalogoService);
  protected readonly menuAbierto = signal(false);

  protected readonly enlaces = [
    { ruta: '/', texto: 'Inicio' },
    { ruta: '/catalogo', texto: 'Catálogo' },
    { ruta: '/tendencias', texto: 'Tendencias' },
    { ruta: '/contacto', texto: 'Contacto' },
  ];

  protected alternarMenu(): void {
    this.menuAbierto.update((abierto) => !abierto);
  }
}
