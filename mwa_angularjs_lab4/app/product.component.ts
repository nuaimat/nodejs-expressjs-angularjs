import { Component } from '@angular/core';
import { Product }    from './product';
import { ProductService } from './product.service'
import { OnInit } from '@angular/core';
import { Router }   from '@angular/router';




@Component({
    selector: 'my-products',
    providers: [ProductService],
    styleUrls: [ 'app/product.component.css' ],
    templateUrl: 'app/product.component.html'
})
export class ProductsComponent implements OnInit  {
    constructor(
        private productService: ProductService,
        private router: Router
        ) { }
    categories = ['Phone', 'Tablet',
    'Music Player', 'Watch'];
    products: Product[];

    selectedProduct: Product;
    onSelect(p: Product): void {
      this.selectedProduct = p;
    }

    getProducts(): void {
      this.productService.getProducts().then(products => this.products = products);
    }

    ngOnInit():void {
      this.getProducts();
    }

    gotoDetail(): void {
        this.router.navigate(['/detail', this.selectedProduct.id]);
    }
}
