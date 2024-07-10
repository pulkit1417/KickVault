import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { NgIf } from '@angular/common';
import { product, cart } from '../data-types';
import { LocalStorageService } from '../services/local-storage-service.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [NgIf],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  productData: undefined | product;
  productQuantity: number = 1;
  removeCart = false;
  cartData: product | undefined;

  constructor(
    private activeRoute: ActivatedRoute,
    private product: ProductService,
    private localStorageService: LocalStorageService // Inject the new service
  ) {}

  ngOnInit(): void {
    let productId = this.activeRoute.snapshot.paramMap.get('productId');
    productId &&
      this.product.getProduct(productId).subscribe((result) => {
        this.productData = result;

        let cartData = this.localStorageService.getItem('LocalCart');
        if (productId && cartData) {
          let items = JSON.parse(cartData);
          items = items.filter(
            (item: product) => productId == item.id.toString()
          );
          this.removeCart = items.length > 0;
        }

        let userString = this.localStorageService.getItem('user');
        if (userString) {
          let userId = JSON.parse(userString).id;
          this.product.getCartList(userId);
          this.product.cartData.subscribe((result) => {
            let item = result.filter(
              (item: product) =>
                productId?.toString() === item.productId?.toString()
            );
            if (item.length) {
              this.cartData = item[0];
              this.removeCart = true;
            }
          });
        }
      });
  }

  handleQuantity(val: string) {
    if (this.productQuantity < 20 && val === 'plus') {
      this.productQuantity += 1;
    } else if (this.productQuantity > 1 && val === 'min') {
      this.productQuantity -= 1;
    }
  }

  addToCart() {
    if (this.productData) {
      this.productData.quantity = this.productQuantity;
      if (!this.localStorageService.getItem('user')) {
        this.product.localAddToCart(this.productData);
        this.removeCart = true;
      } else {
        let userString = this.localStorageService.getItem('user');
        let userId = userString && JSON.parse(userString).id;
        let cartData: cart = {
          ...this.productData,
          userId,
          productId: this.productData.id,
        };
        delete cartData.id;
        this.product.addToCart(cartData).subscribe((result) => {
          if (result) {
            this.product.getCartList(userId);
            this.removeCart = true;
          }
        });
      }
    }
  }

  removeToCart(productId: string) {
    if (!this.localStorageService.getItem('user')) {
      this.product.removeItemFromCart(productId);
    } else {
      this.cartData &&
        this.product.removeToCart(this.cartData.id).subscribe((result) => {
          let userString = this.localStorageService.getItem('user');
          let userId = userString && JSON.parse(userString).id;
          this.product.getCartList(userId);
        });
    }
    this.removeCart = false;
  }
}