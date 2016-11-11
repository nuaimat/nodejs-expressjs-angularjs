import { Component } from '@angular/core';
import { Product }    from './product';
import { ProductService } from './product.service'
import { OnInit } from '@angular/core';



@Component({
    selector: 'my-app',
    providers: [ProductService],
    styles: [`
      .selected {
        background-color: #CFD8DC !important;
        color: white;
      }
      .products {
        margin: 0 0 2em 0;
        list-style-type: none;
        padding: 0;
        width: 15em;
      }
      .products li {
        cursor: pointer;
        position: relative;
        left: 0;
        background-color: #EEE;
        margin: .5em;
        padding: .3em 0;
        height: 1.6em;
        border-radius: 4px;
      }
      .products li.selected:hover {
        background-color: #BBD8DC !important;
        color: white;
      }
      .products li:hover {
        color: #607D8B;
        background-color: #DDD;
        left: .1em;
      }
      .products .text {
        position: relative;
        top: -3px;
      }
      .products .badge {
        display: inline-block;
        font-size: small;
        color: white;
        padding: 0.8em 0.7em 0 0.7em;
        background-color: #607D8B;
        line-height: 1em;
        position: relative;
        left: -1px;
        top: -4px;
        height: 1.8em;
        margin-right: .8em;
        border-radius: 4px 0 0 4px;
      }
    `],
    template: `<h1>{{title}}</h1>
    <h2>My Products</h2>
    <ul class="products">
      <li *ngFor="let product of products" (click)="onSelect(product)"
          [class.selected]="product === selectedProduct">
        <span class="badge">{{product.id}}</span> {{product.name}}
      </li>
    </ul>
    <my-product-detail [product]="selectedProduct"></my-product-detail>
    `
})
export class AppComponent implements OnInit  {
    constructor(private productService: ProductService) { }
    title = 'Product List';
    categories = ['Phone', 'Tablet',
    'Music Player', 'Watch'];
    products: Product[];

    selectedProduct: Product;
    onSelect(p: Product): void {
      this.selectedProduct = p;
    }

    getProducts(): void {
      this.productService.getProductsSlowly().then(products => this.products = products);
    }

    ngOnInit():void {
      this.getProducts();
    }
}
