import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  template: `
    <footer class="mt-16 bg-nova-900 text-nova-100">
      <div class="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <p class="text-lg font-extrabold text-white">VentaNova Digital</p>
          <p class="mt-2 text-sm text-nova-100/80">
            Productos y servicios digitales para personas y negocios que quieren vender y crecer en línea.
          </p>
        </div>
        <div>
          <p class="font-semibold text-white">Navegación</p>
          <ul class="mt-2 space-y-1 text-sm">
            <li><a routerLink="/catalogo" class="hover:underline">Catálogo</a></li>
            <li><a routerLink="/tendencias" class="hover:underline">Tendencias</a></li>
            <li><a routerLink="/contacto" class="hover:underline">Contacto</a></li>
          </ul>
        </div>
        <div>
          <p class="font-semibold text-white">Atención</p>
          <p class="mt-2 text-sm">Lunes a viernes, 9:00 a 18:00 horas</p>
          <p class="text-sm">contacto&#64;ventanova.cl</p>
        </div>
      </div>
      <p class="border-t border-white/10 py-4 text-center text-xs text-nova-100/70">
        © 2026 VentaNova Digital. Proyecto académico, Desarrollo Web 2.
      </p>
    </footer>
  `,
})
export class Footer {}
