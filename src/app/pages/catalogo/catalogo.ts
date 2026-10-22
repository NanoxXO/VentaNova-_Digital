import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProductoCard } from '../../components/producto-card/producto-card';
import { Categoria, Producto } from '../../models/producto.model';
import { CatalogoService } from '../../services/catalogo.service';

@Component({
  selector: 'app-catalogo',
  imports: [FormsModule, RouterLink, CurrencyPipe, ProductoCard],
  template: `
    <h1 class="text-3xl font-extrabold text-slate-900">Catálogo</h1>
    <p class="text-slate-600">Busca por nombre o descripción y filtra por categoría.</p>

    <!-- Filtros con signals -->
    <div class="mt-6 grid gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 md:grid-cols-[1fr_16rem_auto]">
      <input
        type="search"
        [(ngModel)]="busqueda"
        placeholder="Buscar producto o servicio..."
        class="rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-nova-500 focus:ring-2 focus:ring-nova-100"
      />
      <select
        [(ngModel)]="categoriaSeleccionada"
        class="rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-nova-500 focus:ring-2 focus:ring-nova-100"
      >
        <option value="Todas">Todas las categorías</option>
        @for (cat of categorias; track cat) {
          <option [value]="cat">{{ cat }}</option>
        }
      </select>
      <button
        type="button"
        (click)="limpiarFiltros()"
        class="rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 hover:bg-slate-100"
      >
        Limpiar
      </button>
    </div>

    <p class="mt-4 text-sm text-slate-600">
      Mostrando <strong>{{ productosFiltrados().length }}</strong> de {{ productos.length }} resultados ·
      En tu lista de interés: <strong>{{ interes.listaInteres().length }}</strong>
    </p>

    <div class="mt-4 grid gap-6 lg:grid-cols-[1fr_20rem]">
      <!-- Listado -->
      <div>
        @if (productosFiltrados().length === 0) {
          <div class="rounded-2xl bg-white p-10 text-center ring-1 ring-slate-200">
            <p class="text-5xl">🔍</p>
            <p class="mt-2 font-bold text-slate-900">No encontramos resultados</p>
            <p class="text-sm text-slate-600">Prueba con otra palabra o cambia la categoría.</p>
          </div>
        } @else {
          <div class="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            @for (p of productosFiltrados(); track p.id) {
              <app-producto-card
                [producto]="p"
                [enInteres]="interes.estaEnInteres(p.id)"
                (seleccionar)="seleccionado.set($event)"
                (alternarInteres)="interes.alternarInteres($event.id)"
              />
            }
          </div>
        }
      </div>

      <!-- Panel de detalle (renderizado condicional) -->
      <aside class="lg:sticky lg:top-24 lg:self-start">
        @if (seleccionado(); as p) {
          <div class="rounded-2xl bg-white p-6 shadow-md ring-1 ring-nova-200">
            <div class="flex items-start justify-between">
              <span class="text-6xl">{{ p.emoji }}</span>
              <button type="button" (click)="seleccionado.set(null)" class="text-slate-400 hover:text-slate-700" aria-label="Cerrar detalle">✕</button>
            </div>
            <h2 class="mt-3 text-xl font-extrabold text-slate-900">{{ p.nombre }}</h2>
            <p class="text-sm font-semibold text-nova-700">{{ p.categoria }}</p>
            <p class="mt-3 text-slate-600">{{ p.descripcion }}</p>
            <p class="mt-3 text-2xl font-extrabold text-nova-700">
              {{ p.precio | currency: 'CLP' : 'symbol-narrow' : '1.0-0' }}
            </p>
            <ul class="mt-3 flex flex-wrap gap-2">
              @for (e of p.etiquetas; track e) {
                <li class="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">{{ e }}</li>
              }
            </ul>
            <a routerLink="/contacto" class="mt-5 block rounded-lg bg-nova-600 px-4 py-2 text-center font-semibold text-white hover:bg-nova-700">
              Solicitar información
            </a>
          </div>
        } @else {
          <div class="rounded-2xl border-2 border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
            Selecciona <strong>Ver detalle</strong> en un producto para conocer más sobre él.
          </div>
        }
      </aside>
    </div>
  `,
})
export class Catalogo {
  protected readonly interes = inject(CatalogoService);

  protected readonly productos: Producto[] = this.interes.obtenerProductos();
  protected readonly categorias: Categoria[] = this.interes.obtenerCategorias();

  protected readonly busqueda = signal('');
  protected readonly categoriaSeleccionada = signal<Categoria | 'Todas'>('Todas');
  protected readonly seleccionado = signal<Producto | null>(null);

  /** Resultados visibles: se recalculan solos al cambiar la búsqueda o la categoría. */
  protected readonly productosFiltrados = computed(() => {
    const texto = this.busqueda().trim().toLowerCase();
    const categoria = this.categoriaSeleccionada();

    return this.productos.filter((p) => {
      const coincideCategoria = categoria === 'Todas' || p.categoria === categoria;
      const coincideTexto =
        texto === '' ||
        p.nombre.toLowerCase().includes(texto) ||
        p.descripcion.toLowerCase().includes(texto);
      return coincideCategoria && coincideTexto;
    });
  });

  protected limpiarFiltros(): void {
    this.busqueda.set('');
    this.categoriaSeleccionada.set('Todas');
  }
}
