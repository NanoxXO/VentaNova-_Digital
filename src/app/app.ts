import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './components/footer/footer';
import { Navbar } from './components/navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer],
  template: `
    <app-navbar />
    <main class="mx-auto min-h-[70vh] max-w-6xl px-4 py-8">
      <router-outlet />
    </main>
    <app-footer />
  `,
})
export class App {}
