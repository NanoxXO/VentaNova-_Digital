import { CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-producto-card',
  imports: [CurrencyPipe],
  template: `
    <article
      class="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div
        class="flex h-32 items-center justify-center bg-gradient-to-br from-nova-100 to-fuchsia-100 text-6xl"
        aria-hidden="true"
      >
        {{ producto.emoji }}
      </div>

      <div class="flex flex-1 flex-col gap-3 p-5">
        <div class="flex items-center justify-between gap-2">
          <span class="rounded-full bg-nova-50 px-3 py-1 text-xs font-semibold text-nova-700">
            {{ producto.categoria }}
          </span>
          <span class="text-sm font-medium text-amber-600">★ {{ producto.valoracion }}</span>
        </div>

        <h3 class="text-lg font-bold leading-snug text-slate-900">{{ producto.nombre }}</h3>
        <p class="flex-1 text-sm text-slate-600">{{ producto.descripcion }}</p>

        <p class="text-xl font-extrabold text-nova-700">
          {{ producto.precio | currency: 'CLP' : 'symbol-narrow' : '1.0-0' }}
        </p>

        <div class="grid grid-cols-2 gap-2">
          <button
            type="button"
            (click)="seleccionar.emit(producto)"
            class="rounded-lg border border-nova-600 px-3 py-2 text-sm font-semibold text-nova-700 transition hover:bg-nova-50"
          >
            Ver detalle
          </button>
          <button
            type="button"
            (click)="alternarInteres.emit(producto)"
            [class]="
              enInteres
                ? 'rounded-lg bg-emerald-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700'
                : 'rounded-lg bg-nova-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-nova-700'
            "
          >
            {{ enInteres ? '✓ En mi lista' : 'Me interesa' }}
          </button>
        </div>
      </div>
    </article>
  `,
})
export class ProductoCard {
  @Input({ required: true }) producto!: Producto;
  @Input() enInteres = false;

  @Output() seleccionar = new EventEmitter<Producto>();
  @Output() alternarInteres = new EventEmitter<Producto>();
}
