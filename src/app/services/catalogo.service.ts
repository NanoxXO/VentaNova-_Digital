import { Injectable, computed, signal } from '@angular/core';
import { PRODUCTOS, TENDENCIAS } from '../data/productos.data';
import { Categoria, Producto, TendenciaCategoria } from '../models/producto.model';

/**
 * Entrega los datos del negocio a las páginas y componentes.
 * También conserva la lista de interés del cliente, compartida entre vistas.
 */
@Injectable({ providedIn: 'root' })
export class CatalogoService {
  private readonly productos: Producto[] = PRODUCTOS;
  private readonly tendencias: TendenciaCategoria[] = TENDENCIAS;

  private readonly idsInteres = signal<number[]>([]);

  /** Productos que el cliente marcó como de interés. */
  readonly listaInteres = computed(() =>
    this.productos.filter((p) => this.idsInteres().includes(p.id)),
  );

  obtenerProductos(): Producto[] {
    return [...this.productos];
  }

  obtenerDestacados(): Producto[] {
    return this.productos.filter((p) => p.destacado);
  }

  obtenerCategorias(): Categoria[] {
    return [...new Set(this.productos.map((p) => p.categoria))];
  }

  obtenerTendencias(): TendenciaCategoria[] {
    return [...this.tendencias];
  }

  estaEnInteres(id: number): boolean {
    return this.idsInteres().includes(id);
  }

  alternarInteres(id: number): void {
    this.idsInteres.update((ids) =>
      ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id],
    );
  }

  limpiarInteres(): void {
    this.idsInteres.set([]);
  }
}
