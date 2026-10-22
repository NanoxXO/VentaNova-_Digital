import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Categoria, Producto } from '../../models/producto.model';
import { CatalogoService } from '../../services/catalogo.service';

@Component({
  selector: 'app-inicio',
  imports: [RouterLink, CurrencyPipe],
  template: `
    <!-- Portada -->
    <section class="overflow-hidden rounded-3xl bg-gradient-to-br from-nova-900 via-nova-700 to-fuchsia-600 px-6 py-14 text-white md:px-12">
      <p class="mb-3 inline-block rounded-full bg-white/15 px-4 py-1 text-sm font-semibold">
        Ventas digitales · Chile
      </p>
      <h1 class="max-w-2xl text-4xl font-extrabold leading-tight md:text-5xl">
        Tu próxima compra y tu próximo negocio, <span class="text-amber-300">en un solo lugar</span>.
      </h1>
      <p class="mt-4 max-w-2xl text-lg text-nova-100">
        VentaNova Digital reúne tecnología, servicios digitales, cursos y suscripciones. Dejamos atrás
        los catálogos estáticos para ofrecerte una experiencia ordenada, rápida y a tu medida.
      </p>
      <div class="mt-8 flex flex-wrap gap-3">
        <a routerLink="/catalogo" class="rounded-full bg-white px-6 py-3 font-bold text-nova-700 transition hover:bg-nova-50">
          Explorar catálogo
        </a>
        <a routerLink="/tendencias" class="rounded-full border border-white/60 px-6 py-3 font-bold transition hover:bg-white/10">
          Ver tendencias
        </a>
      </div>
    </section>

    <!-- Indicadores derivados con computed() -->
    <section class="mt-8 grid gap-4 sm:grid-cols-3">
      <div class="rounded-2xl bg-white p-5 text-center shadow-sm ring-1 ring-slate-200">
        <p class="text-3xl font-extrabold text-nova-700">{{ totalProductos }}</p>
        <p class="text-sm text-slate-500">Productos y servicios</p>
      </div>
      <div class="rounded-2xl bg-white p-5 text-center shadow-sm ring-1 ring-slate-200">
        <p class="text-3xl font-extrabold text-nova-700">{{ categorias.length }}</p>
        <p class="text-sm text-slate-500">Categorías</p>
      </div>
      <div class="rounded-2xl bg-white p-5 text-center shadow-sm ring-1 ring-slate-200">
        <p class="text-3xl font-extrabold text-nova-700">★ {{ valoracionPromedio }}</p>
        <p class="text-sm text-slate-500">Valoración promedio</p>
      </div>
    </section>

    <!-- Interacción 1: selector de categoría (signal) con resumen (computed) -->
    <section class="mt-12">
      <h2 class="text-2xl font-extrabold text-slate-900">Explora por categoría</h2>
      <p class="text-slate-600">Selecciona una categoría y conoce su resumen al instante.</p>

      <div class="mt-4 flex flex-wrap gap-2">
        @for (cat of categorias; track cat) {
          <button
            type="button"
            (click)="categoriaActiva.set(cat)"
            [class]="
              categoriaActiva() === cat
                ? 'rounded-full bg-nova-600 px-5 py-2 text-sm font-semibold text-white'
                : 'rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-700 ring-1 ring-slate-300 hover:bg-nova-50'
            "
          >
            {{ cat }}
          </button>
        }
      </div>

      <div class="mt-4 rounded-2xl bg-nova-50 p-6 ring-1 ring-nova-100">
        <p class="text-lg font-bold text-nova-900">{{ categoriaActiva() }}</p>
        <p class="mt-1 text-slate-700">
          Ofrecemos <strong>{{ resumenCategoria().cantidad }}</strong> opciones, con un precio promedio de
          <strong>{{ resumenCategoria().promedio | currency: 'CLP' : 'symbol-narrow' : '1.0-0' }}</strong>.
        </p>
        <ul class="mt-3 flex flex-wrap gap-2">
          @for (nombre of resumenCategoria().nombres; track nombre) {
            <li class="rounded-full bg-white px-3 py-1 text-sm text-slate-700 ring-1 ring-nova-100">{{ nombre }}</li>
          }
        </ul>
        <a routerLink="/catalogo" class="mt-4 inline-block text-sm font-bold text-nova-700 hover:underline">
          Ir al catálogo completo →
        </a>
      </div>
    </section>

    <!-- Interacción 2: destacados explorados (signal) y progreso (computed) -->
    <section class="mt-12">
      <div class="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 class="text-2xl font-extrabold text-slate-900">Productos destacados</h2>
          <p class="text-slate-600">Marca los que ya revisaste y mira tu avance de exploración.</p>
        </div>
        <div class="w-full max-w-xs">
          <div class="flex justify-between text-sm font-semibold text-slate-700">
            <span>Exploración</span>
            <span>{{ progreso() }}%</span>
          </div>
          <div class="mt-1 h-3 overflow-hidden rounded-full bg-slate-200">
            <div class="h-full rounded-full bg-emerald-500 transition-all" [style.width.%]="progreso()"></div>
          </div>
        </div>
      </div>

      <p class="mt-3 rounded-xl bg-white p-4 text-sm text-slate-700 ring-1 ring-slate-200">
        {{ mensajeProgreso() }}
      </p>

      <div class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        @for (p of destacados; track p.id) {
          <button
            type="button"
            (click)="alternarExplorado(p)"
            [class]="
              estaExplorado(p.id)
                ? 'rounded-2xl bg-emerald-50 p-4 text-left ring-2 ring-emerald-500 transition'
                : 'rounded-2xl bg-white p-4 text-left shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1'
            "
          >
            <span class="text-4xl">{{ p.emoji }}</span>
            <span class="mt-2 block text-sm font-bold text-slate-900">{{ p.nombre }}</span>
            <span class="mt-1 block text-xs font-semibold" [class]="estaExplorado(p.id) ? 'text-emerald-700' : 'text-slate-500'">
              {{ estaExplorado(p.id) ? '✓ Explorado' : 'Marcar como explorado' }}
            </span>
          </button>
        }
      </div>
    </section>
  `,
})
export class Inicio {
  private readonly catalogo = inject(CatalogoService);

  protected readonly categorias: Categoria[] = this.catalogo.obtenerCategorias();
  protected readonly destacados: Producto[] = this.catalogo.obtenerDestacados();
  private readonly productos: Producto[] = this.catalogo.obtenerProductos();

  protected readonly totalProductos = this.productos.length;
  protected readonly valoracionPromedio = (
    this.productos.reduce((suma, p) => suma + p.valoracion, 0) / this.productos.length
  ).toFixed(1);

  // Interacción 1
  protected readonly categoriaActiva = signal<Categoria>(this.categorias[0]);
  protected readonly resumenCategoria = computed(() => {
    const lista = this.productos.filter((p) => p.categoria === this.categoriaActiva());
    const promedio = lista.reduce((suma, p) => suma + p.precio, 0) / lista.length;
    return { cantidad: lista.length, promedio, nombres: lista.map((p) => p.nombre) };
  });

  // Interacción 2
  private readonly idsExplorados = signal<number[]>([]);
  protected readonly progreso = computed(() =>
    Math.round((this.idsExplorados().length / this.destacados.length) * 100),
  );
  protected readonly mensajeProgreso = computed(() => {
    const vistos = this.idsExplorados().length;
    if (vistos === 0) return 'Aún no has explorado ningún destacado. ¡Comienza ahora!';
    if (vistos === this.destacados.length) return '¡Excelente! Exploraste todos los destacados. Revisa el catálogo completo.';
    return `Llevas ${vistos} de ${this.destacados.length} destacados explorados.`;
  });

  protected estaExplorado(id: number): boolean {
    return this.idsExplorados().includes(id);
  }

  protected alternarExplorado(producto: Producto): void {
    this.idsExplorados.update((ids) =>
      ids.includes(producto.id) ? ids.filter((x) => x !== producto.id) : [...ids, producto.id],
    );
  }
}
