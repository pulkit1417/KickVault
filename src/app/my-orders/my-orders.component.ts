import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { order } from '../data-types';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [NgFor],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css',
})
export class MyOrdersComponent implements OnInit {
  orderData: order[] = [];
  cancelOrderMsg: string | undefined;
  constructor(private product: ProductService, private router:Router) {}
  ngOnInit(): void {
    this.getOrderList();
  }

  cancelOrder(orderId: string | undefined) {
    orderId &&
      this.product.cancelOrder(orderId).subscribe((result) => {
        this.cancelOrderMsg="Your Order has been Cancled"
        this.getOrderList();
        setTimeout(()=>{
          this.cancelOrderMsg=undefined;
        },3000)
      });
  }

  getOrderList() {
    this.product.orderList().subscribe((result) => {
      this.orderData = result;
    });
  }
}
