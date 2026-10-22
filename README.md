# VentaNova Digital

Aplicación web para una empresa de ventas digitales. Desarrollada con Angular 21, TypeScript y Tailwind CSS.

## Estructura

```
src/app/
  components/   navbar, footer y producto-card (reutilizable con @Input y @Output)
  pages/        inicio, catalogo, tendencias y contacto
  services/     catalogo.service.ts (entrega los datos y guarda la lista de interés)
  models/       interface Producto y TendenciaCategoria
  data/         datos tipados del negocio
```

## Ejecutar en local

```bash
npm install
npm start          # http://localhost:4200
```

## Build de producción

```bash
npm run build      # genera dist/ventanova-digital/browser
```

## Publicación en Netlify

1. Ejecutar `npm run build`.
2. Entrar a https://app.netlify.com/drop y arrastrar la carpeta `dist/ventanova-digital/browser`.
3. Copiar el enlace público que entrega Netlify.

El archivo `public/_redirects` (y `netlify.toml`) redirige todas las rutas a `index.html`,
por lo que `/catalogo`, `/tendencias` y `/contacto` se pueden recargar sin error 404.
