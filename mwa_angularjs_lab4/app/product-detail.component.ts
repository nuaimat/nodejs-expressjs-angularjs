import {Product} from "./product";

// Keep the Input import for now, we'll remove it later:
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import { ProductService } from './product.service';

@Component({
  selector: 'my-product-detail',
  templateUrl: 'app/product-detail.component.html',
  styleUrls: [ 'app/product-detail.component.css' ]
})
export class ProductDetailComponent implements OnInit {

  @Input()
  product: Product;

  constructor(
      private productService: ProductService,
      private route: ActivatedRoute,
      private location: Location
  ) {}

  ngOnInit():void {
    this.route.params.forEach((params: Params) => {
      let id = +params['id'];
      this.productService.getProduct(id)
          .then(product => this.product = product);
    });
  }

  goBack(): void {
    this.location.back();
  }
}
