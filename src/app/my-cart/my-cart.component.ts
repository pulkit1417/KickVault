import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {cart,priceSummary} from '../data-types'
import { ProductService } from '../services/product.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-my-cart',
  standalone: true,
  imports: [NgIf,NgFor],
  templateUrl: './my-cart.component.html',
  styleUrl: './my-cart.component.css'
})

export class MyCartComponent implements OnInit {
  cartData: cart[] | undefined;
  priceSummary:priceSummary = {
    price:0,
  discount:0,
  tax:0,
  shipping:0,
  total:0
  }
  constructor(private product: ProductService, private router: Router) { }

  ngOnInit(): void {
   this.product.currentCart().subscribe((result)=>{
    this.cartData = result;
    let price=0;
    result.forEach((item)=>{
      if (item.quantity) {
        price = price + (+item.price * +item.quantity)
      }
    });
    this.priceSummary.price = price;
      this.priceSummary.discount = parseFloat((price / 15).toFixed(1));
      this.priceSummary.tax = parseFloat((price / 16).toFixed(1))
      this.priceSummary.shipping = 50;
      this.priceSummary.total = parseFloat((price + (price / 10) + 50 - this.priceSummary.discount).toFixed(2));
   })
  }
  checkout() {
    this.router.navigate(['/checkout'])
  }

}
