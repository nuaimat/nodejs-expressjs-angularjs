import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
    <nav>
      <a routerLink="/products"  routerLinkActive="active">Products</a>
      <a routerLink="/dashboard"  routerLinkActive="active">Dashboard</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styleUrls: [ 'app/app.component.css' ]
})
export class AppComponent {
  title = 'My Products';
}
