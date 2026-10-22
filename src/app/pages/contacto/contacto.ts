import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Producto } from '../../models/producto.model';
import { CatalogoService } from '../../services/catalogo.service';

@Component({
  selector: 'app-contacto',
  imports: [FormsModule, CurrencyPipe],
  template: `
    <h1 class="text-3xl font-extrabold text-slate-900">Contacto y registro de interés</h1>
    <p class="text-slate-600">Cuéntanos qué te interesa y te responderemos a la brevedad.</p>

    <div class="mt-6 grid gap-6 lg:grid-cols-[1fr_22rem]">
      <!-- Formulario -->
      <section class="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        @if (enviado()) {
          <div class="py-8 text-center">
            <p class="text-6xl">🎉</p>
            <h2 class="mt-3 text-2xl font-extrabold text-emerald-700">¡Solicitud registrada!</h2>
            <p class="mt-2 text-slate-600">
              Gracias, <strong>{{ nombre().trim() }}</strong>. Enviaremos información a
              <strong>{{ correo().trim() }}</strong>.
            </p>
            <button type="button" (click)="reiniciar()" class="mt-6 rounded-lg bg-nova-600 px-6 py-2 font-semibold text-white hover:bg-nova-700">
              Registrar otra solicitud
            </button>
          </div>
        } @else {
          <form (ngSubmit)="enviar()" novalidate class="space-y-4">
            <div>
              <label for="nombre" class="mb-1 block text-sm font-semibold text-slate-700">Nombre completo</label>
              <input id="nombre" name="nombre" type="text" [(ngModel)]="nombre" placeholder="Ej: María González"
                class="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-nova-500 focus:ring-2 focus:ring-nova-100" />
              @if (intentoEnvio() && nombre().trim().length < 3) {
                <p class="mt-1 text-xs text-rose-600">Ingresa tu nombre (mínimo 3 caracteres).</p>
              }
            </div>

            <div>
              <label for="correo" class="mb-1 block text-sm font-semibold text-slate-700">Correo electrónico</label>
              <input id="correo" name="correo" type="email" [(ngModel)]="correo" placeholder="nombre&#64;correo.cl"
                class="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-nova-500 focus:ring-2 focus:ring-nova-100" />
              @if (intentoEnvio() && !correoValido()) {
                <p class="mt-1 text-xs text-rose-600">Ingresa un correo válido.</p>
              }
            </div>

            <div>
              <label for="producto" class="mb-1 block text-sm font-semibold text-slate-700">Producto o servicio de interés</label>
              <select id="producto" name="producto" [(ngModel)]="productoId"
                class="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-nova-500 focus:ring-2 focus:ring-nova-100">
                <option [ngValue]="null">Selecciona una opción</option>
                @for (p of productos; track p.id) {
                  <option [ngValue]="p.id">{{ p.nombre }}</option>
                }
              </select>
              @if (intentoEnvio() && productoId() === null) {
                <p class="mt-1 text-xs text-rose-600">Selecciona un producto o servicio.</p>
              }
            </div>

            <div>
              <label for="comentario" class="mb-1 block text-sm font-semibold text-slate-700">Comentario</label>
              <textarea id="comentario" name="comentario" rows="4" [(ngModel)]="comentario" [maxlength]="maximoCaracteres"
                placeholder="Cuéntanos qué necesitas..."
                class="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-nova-500 focus:ring-2 focus:ring-nova-100"></textarea>
              <p class="mt-1 text-right text-xs text-slate-500">{{ caracteres() }} / {{ maximoCaracteres }} caracteres</p>
            </div>

            <button type="submit" class="w-full rounded-lg bg-nova-600 px-6 py-3 font-bold text-white transition hover:bg-nova-700">
              Enviar solicitud
            </button>
          </form>
        }
      </section>

      <!-- Resumen en vivo y lista de interés -->
      <aside class="space-y-4">
        <div class="rounded-2xl bg-nova-50 p-5 ring-1 ring-nova-100">
          <h2 class="font-extrabold text-nova-900">Resumen de tu solicitud</h2>
          <ul class="mt-3 space-y-1 text-sm text-slate-700">
            <li><strong>Nombre:</strong> {{ nombre().trim() || '—' }}</li>
            <li><strong>Correo:</strong> {{ correo().trim() || '—' }}</li>
            <li>
              <strong>Interés:</strong>
              {{ productoSeleccionado()?.nombre ?? '—' }}
            </li>
            @if (productoSeleccionado(); as p) {
              <li><strong>Valor referencial:</strong> {{ p.precio | currency: 'CLP' : 'symbol-narrow' : '1.0-0' }}</li>
            }
            <li><strong>Comentario:</strong> {{ caracteres() }} caracteres</li>
          </ul>
        </div>

        <div class="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <div class="flex items-center justify-between">
            <h2 class="font-extrabold text-slate-900">Mi lista de interés ({{ interes.listaInteres().length }})</h2>
            @if (interes.listaInteres().length > 0) {
              <button type="button" (click)="interes.limpiarInteres()" class="text-xs font-semibold text-rose-600 hover:underline">Vaciar</button>
            }
          </div>
          @if (interes.listaInteres().length === 0) {
            <p class="mt-2 text-sm text-slate-500">Aún no has marcado productos en el catálogo.</p>
          } @else {
            <ul class="mt-3 space-y-2">
              @for (p of interes.listaInteres(); track p.id) {
                <li class="flex items-center justify-between gap-2 rounded-lg bg-slate-50 px-3 py-2 text-sm">
                  <span>{{ p.emoji }} {{ p.nombre }}</span>
                  <button type="button" (click)="productoId.set(p.id)" class="shrink-0 text-xs font-bold text-nova-700 hover:underline">Elegir</button>
                </li>
              }
            </ul>
          }
        </div>
      </aside>
    </div>
  `,
})
export class Contacto {
  protected readonly interes = inject(CatalogoService);
  protected readonly productos: Producto[] = this.interes.obtenerProductos();

  protected readonly maximoCaracteres = 300;

  protected readonly nombre = signal('');
  protected readonly correo = signal('');
  protected readonly productoId = signal<number | null>(null);
  protected readonly comentario = signal('');

  protected readonly intentoEnvio = signal(false);
  protected readonly enviado = signal(false);

  protected readonly caracteres = computed(() => this.comentario().length);

  protected readonly correoValido = computed(() =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.correo().trim()),
  );

  protected readonly productoSeleccionado = computed(
    () => this.productos.find((p) => p.id === this.productoId()) ?? null,
  );

  protected readonly formularioValido = computed(
    () =>
      this.nombre().trim().length >= 3 &&
      this.correoValido() &&
      this.productoId() !== null,
  );

  protected enviar(): void {
    this.intentoEnvio.set(true);
    if (this.formularioValido()) {
      this.enviado.set(true);
    }
  }

  protected reiniciar(): void {
    this.nombre.set('');
    this.correo.set('');
    this.productoId.set(null);
    this.comentario.set('');
    this.intentoEnvio.set(false);
    this.enviado.set(false);
  }
}
