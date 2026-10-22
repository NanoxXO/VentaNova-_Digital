export type Categoria =
  | 'Tecnología'
  | 'Servicios Digitales'
  | 'Cursos Online'
  | 'Suscripciones';

/** Recurso comercial principal de VentaNova Digital. */
export interface Producto {
  id: number;
  nombre: string;
  categoria: Categoria;
  descripcion: string;
  precio: number; // valor de referencia en pesos chilenos
  valoracion: number; // de 1 a 5
  emoji: string;
  destacado: boolean;
  etiquetas: string[];
}

/** Indicadores de mercado por categoría (datos referenciales). */
export interface TendenciaCategoria {
  categoria: Categoria;
  crecimiento: number; // % anual
  clientesNuevos: number; // por mes
  ticketPromedio: number; // CLP
  conversion: number; // %
  ventasMensuales: number[]; // últimos 6 meses, índice 0-100
}

export type Metrica = 'crecimiento' | 'clientesNuevos' | 'ticketPromedio' | 'conversion';
