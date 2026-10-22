import { Producto, TendenciaCategoria } from '../models/producto.model';

export const PRODUCTOS: Producto[] = [
  {
    id: 1, nombre: 'Audífonos Inalámbricos Nova Pods', categoria: 'Tecnología',
    descripcion: 'Audífonos Bluetooth con cancelación de ruido y 24 horas de batería para trabajo y estudio.',
    precio: 39990, valoracion: 4.6, emoji: '🎧', destacado: true, etiquetas: ['Bluetooth', 'Envío rápido'],
  },
  {
    id: 2, nombre: 'Smartwatch Nova Fit', categoria: 'Tecnología',
    descripcion: 'Reloj inteligente con monitoreo de actividad, notificaciones y resistencia al agua.',
    precio: 59990, valoracion: 4.4, emoji: '⌚', destacado: false, etiquetas: ['Deporte', 'Resistente al agua'],
  },
  {
    id: 3, nombre: 'Teclado Mecánico Compacto', categoria: 'Tecnología',
    descripcion: 'Teclado mecánico de 75% con retroiluminación y conexión por cable o inalámbrica.',
    precio: 44990, valoracion: 4.7, emoji: '⌨️', destacado: true, etiquetas: ['Gaming', 'Retroiluminado'],
  },
  {
    id: 4, nombre: 'Cámara Web Full HD', categoria: 'Tecnología',
    descripcion: 'Cámara de 1080p con micrófono integrado, ideal para teletrabajo y clases en línea.',
    precio: 24990, valoracion: 4.2, emoji: '📷', destacado: false, etiquetas: ['Teletrabajo'],
  },
  {
    id: 5, nombre: 'Tienda Online Express', categoria: 'Servicios Digitales',
    descripcion: 'Diseño y puesta en marcha de una tienda en línea lista para vender en 7 días hábiles.',
    precio: 349000, valoracion: 4.8, emoji: '🛒', destacado: true, etiquetas: ['E-commerce', 'Pagos integrados'],
  },
  {
    id: 6, nombre: 'Gestión de Redes Sociales', categoria: 'Servicios Digitales',
    descripcion: 'Planificación de contenidos, publicación y reportes mensuales de resultados para tu marca.',
    precio: 189000, valoracion: 4.5, emoji: '📱', destacado: false, etiquetas: ['Marketing', 'Mensual'],
  },
  {
    id: 7, nombre: 'Campaña de Publicidad Digital', categoria: 'Servicios Digitales',
    descripcion: 'Diseño y optimización de campañas en buscadores y redes para aumentar tus ventas.',
    precio: 229000, valoracion: 4.3, emoji: '📈', destacado: false, etiquetas: ['Anuncios', 'Resultados medibles'],
  },
  {
    id: 8, nombre: 'Fotografía de Producto Profesional', categoria: 'Servicios Digitales',
    descripcion: 'Sesión fotográfica con edición para catálogos digitales y marketplaces.',
    precio: 99000, valoracion: 4.6, emoji: '📸', destacado: false, etiquetas: ['Catálogo', 'Edición incluida'],
  },
  {
    id: 9, nombre: 'Curso de Ventas por Internet', categoria: 'Cursos Online',
    descripcion: 'Aprende a vender por redes sociales y marketplaces con casos reales y plantillas.',
    precio: 49990, valoracion: 4.7, emoji: '🎓', destacado: true, etiquetas: ['Principiantes', 'Certificado'],
  },
  {
    id: 10, nombre: 'Curso de Atención al Cliente Digital', categoria: 'Cursos Online',
    descripcion: 'Técnicas para atender clientes por mensajería y correo, con foco en la fidelización.',
    precio: 34990, valoracion: 4.4, emoji: '💬', destacado: false, etiquetas: ['Mensajería', 'Certificado'],
  },
  {
    id: 11, nombre: 'Plan Nova Plus (mensual)', categoria: 'Suscripciones',
    descripcion: 'Acceso a ofertas anticipadas, despacho prioritario y soporte preferente durante todo el mes.',
    precio: 4990, valoracion: 4.5, emoji: '⭐', destacado: false, etiquetas: ['Despacho prioritario', 'Mensual'],
  },
  {
    id: 12, nombre: 'Plan Nova Empresas (anual)', categoria: 'Suscripciones',
    descripcion: 'Plan anual para negocios con panel de pedidos, facturación y asesoría comercial.',
    precio: 299000, valoracion: 4.6, emoji: '🏢', destacado: false, etiquetas: ['Anual', 'Asesoría'],
  },
];

export const TENDENCIAS: TendenciaCategoria[] = [
  { categoria: 'Tecnología', crecimiento: 18, clientesNuevos: 420, ticketPromedio: 42000, conversion: 3.1, ventasMensuales: [52, 55, 61, 66, 72, 80] },
  { categoria: 'Servicios Digitales', crecimiento: 27, clientesNuevos: 150, ticketPromedio: 215000, conversion: 2.4, ventasMensuales: [40, 46, 55, 63, 74, 88] },
  { categoria: 'Cursos Online', crecimiento: 34, clientesNuevos: 310, ticketPromedio: 42000, conversion: 4.2, ventasMensuales: [35, 44, 52, 65, 78, 92] },
  { categoria: 'Suscripciones', crecimiento: 22, clientesNuevos: 260, ticketPromedio: 150000, conversion: 5.0, ventasMensuales: [30, 36, 45, 50, 58, 69] },
];
