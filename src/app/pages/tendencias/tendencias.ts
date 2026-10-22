import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Categoria, Metrica, TendenciaCategoria } from '../../models/producto.model';
import { CatalogoService } from '../../services/catalogo.service';

@Component({
  selector: 'app-tendencias',
  imports: [FormsModule, DecimalPipe, CurrencyPipe],
  template: `
    <h1 class="text-3xl font-extrabold text-slate-900">Tendencias de venta digital</h1>
    <p class="text-slate-600">
      Compara categorías y descubre dónde está creciendo el mercado. Datos referenciales para fines académicos.
    </p>

    <!-- Ranking por métrica -->
    <section class="mt-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <h2 class="text-xl font-extrabold text-slate-900">Ranking de categorías</h2>
        <select
          [(ngModel)]="metrica"
          class="rounded-lg border border-slate-300 px-4 py-2 text-sm outline-none focus:border-nova-500"
        >
          @for (m of metricas; track m.valor) {
            <option [value]="m.valor">{{ m.texto }}</option>
          }
        </select>
      </div>

      <ul class="mt-5 space-y-4">
        @for (t of ranking(); track t.categoria; let i = $index) {
          <li>
            <div class="flex justify-between text-sm font-semibold text-slate-700">
              <span>{{ i + 1 }}. {{ t.categoria }}</span>
              <span>{{ formatear(t) }}</span>
            </div>
            <div class="mt-1 h-3 overflow-hidden rounded-full bg-slate-100">
              <div
                class="h-full rounded-full bg-gradient-to-r from-nova-500 to-fuchsia-500 transition-all"
                [style.width.%]="porcentajeBarra(t)"
              ></div>
            </div>
          </li>
        }
      </ul>
    </section>

    <!-- Comparación entre dos categorías -->
    <section class="mt-8">
      <h2 class="text-xl font-extrabold text-slate-900">Compara dos categorías</h2>
      <div class="mt-3 grid gap-3 sm:grid-cols-2">
        <select [(ngModel)]="categoriaA" class="rounded-lg border border-slate-300 bg-white px-4 py-2 outline-none focus:border-nova-500">
          @for (c of categorias; track c) { <option [value]="c">{{ c }}</option> }
        </select>
        <select [(ngModel)]="categoriaB" class="rounded-lg border border-slate-300 bg-white px-4 py-2 outline-none focus:border-nova-500">
          @for (c of categorias; track c) { <option [value]="c">{{ c }}</option> }
        </select>
      </div>

      @if (categoriaA() === categoriaB()) {
        <p class="mt-4 rounded-xl bg-amber-50 p-4 text-sm text-amber-800 ring-1 ring-amber-200">
          Elige dos categorías distintas para realizar la comparación.
        </p>
      } @else {
        <p class="mt-4 rounded-xl bg-emerald-50 p-4 text-sm font-semibold text-emerald-800 ring-1 ring-emerald-200">
          {{ conclusion() }}
        </p>

        <div class="mt-4 grid gap-4 md:grid-cols-2">
          @for (t of comparadas(); track t.categoria) {
            <article class="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <h3 class="text-lg font-extrabold text-nova-700">{{ t.categoria }}</h3>
              <dl class="mt-3 space-y-2 text-sm">
                <div class="flex justify-between"><dt class="text-slate-500">Crecimiento anual</dt><dd class="font-bold">{{ t.crecimiento }}%</dd></div>
                <div class="flex justify-between"><dt class="text-slate-500">Clientes nuevos al mes</dt><dd class="font-bold">{{ t.clientesNuevos | number: '1.0-0' }}</dd></div>
                <div class="flex justify-between"><dt class="text-slate-500">Ticket promedio</dt><dd class="font-bold">{{ t.ticketPromedio | currency: 'CLP' : 'symbol-narrow' : '1.0-0' }}</dd></div>
                <div class="flex justify-between"><dt class="text-slate-500">Conversión</dt><dd class="font-bold">{{ t.conversion }}%</dd></div>
              </dl>
              <p class="mt-4 text-xs font-semibold text-slate-500">Evolución de ventas (últimos 6 meses)</p>
              <div class="mt-2 flex h-24 items-end gap-2">
                @for (v of t.ventasMensuales; track $index) {
                  <div class="flex-1 rounded-t bg-nova-500" [style.height.%]="v" [title]="'Índice ' + v"></div>
                }
              </div>
            </article>
          }
        </div>
      }
    </section>

    <!-- Propuesta de valor -->
    <section class="mt-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <h2 class="text-xl font-extrabold text-slate-900">Nuestra propuesta de valor</h2>
      <p class="text-sm text-slate-600">Cómo mejoramos frente a vender solo por redes sociales y catálogos estáticos.</p>
      <div class="mt-4 overflow-x-auto">
        <table class="w-full min-w-[32rem] text-left text-sm">
          <thead>
            <tr class="border-b border-slate-200 text-slate-500">
              <th class="py-2">Aspecto</th>
              <th class="py-2">Antes</th>
              <th class="py-2 text-nova-700">Con VentaNova Digital</th>
            </tr>
          </thead>
          <tbody>
            @for (f of propuesta; track f.aspecto) {
              <tr class="border-b border-slate-100">
                <td class="py-3 font-semibold">{{ f.aspecto }}</td>
                <td class="py-3 text-slate-600">{{ f.antes }}</td>
                <td class="py-3 font-semibold text-emerald-700">{{ f.ahora }}</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </section>
  `,
})
export class Tendencias {
  private readonly catalogo = inject(CatalogoService);

  protected readonly tendencias: TendenciaCategoria[] = this.catalogo.obtenerTendencias();
  protected readonly categorias: Categoria[] = this.tendencias.map((t) => t.categoria);

  protected readonly metricas: { valor: Metrica; texto: string }[] = [
    { valor: 'crecimiento', texto: 'Crecimiento anual (%)' },
    { valor: 'clientesNuevos', texto: 'Clientes nuevos por mes' },
    { valor: 'ticketPromedio', texto: 'Ticket promedio (CLP)' },
    { valor: 'conversion', texto: 'Tasa de conversión (%)' },
  ];

  protected readonly metrica = signal<Metrica>('crecimiento');
  protected readonly categoriaA = signal<Categoria>('Tecnología');
  protected readonly categoriaB = signal<Categoria>('Cursos Online');

  protected readonly ranking = computed(() => {
    const m = this.metrica();
    return [...this.tendencias].sort((a, b) => b[m] - a[m]);
  });

  private readonly maximo = computed(() => {
    const m = this.metrica();
    return Math.max(...this.tendencias.map((t) => t[m]));
  });

  protected readonly comparadas = computed(() =>
    [this.categoriaA(), this.categoriaB()].map(
      (c) => this.tendencias.find((t) => t.categoria === c)!,
    ),
  );

  protected readonly conclusion = computed(() => {
    const [a, b] = this.comparadas();
    const lider = a.crecimiento >= b.crecimiento ? a : b;
    const otra = lider === a ? b : a;
    const diferencia = lider.crecimiento - otra.crecimiento;
    return diferencia === 0
      ? 'Ambas categorías crecen al mismo ritmo.'
      : `${lider.categoria} crece ${diferencia} puntos porcentuales más que ${otra.categoria}.`;
  });

  protected readonly propuesta = [
    { aspecto: 'Catálogo', antes: 'Imágenes y listas estáticas', ahora: 'Catálogo dinámico con búsqueda y filtros' },
    { aspecto: 'Atención', antes: 'Mensajes sueltos por redes', ahora: 'Formulario de interés con resumen inmediato' },
    { aspecto: 'Decisión de compra', antes: 'Sin comparaciones', ahora: 'Tendencias y detalle de cada producto' },
    { aspecto: 'Experiencia móvil', antes: 'Dependía de cada red social', ahora: 'Sitio adaptable a cualquier pantalla' },
  ];

  protected porcentajeBarra(t: TendenciaCategoria): number {
    return Math.round((t[this.metrica()] / this.maximo()) * 100);
  }

  protected formatear(t: TendenciaCategoria): string {
    const valor = t[this.metrica()];
    switch (this.metrica()) {
      case 'crecimiento':
      case 'conversion':
        return `${valor}%`;
      case 'ticketPromedio':
        return `$${valor.toLocaleString('es-CL')}`;
      default:
        return valor.toLocaleString('es-CL');
    }
  }
}
