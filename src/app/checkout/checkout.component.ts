import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { cart, order } from '../data-types';
import { Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage-service.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  totalPrice: number | undefined;
  cartData: cart[] | undefined;
  orderMsg: string | undefined;

  constructor(
    private product: ProductService, 
    private router: Router,
    private localStorageService: LocalStorageService // Inject the new service
  ) {}

  ngOnInit(): void {
    this.product.currentCart().subscribe((result) => {
      let price = 0;
      this.cartData = result;
      result.forEach((item) => {
        if (item.quantity) {
          price = price + +item.price * +item.quantity;
        }
      });
      this.totalPrice = parseFloat(
        (price + price / 16 + 50 - price / 15).toFixed(2)
      );
    });
  }

  orderNow(data: { email: string; address: string; phone: string }) {
    const userString = this.localStorageService.getItem('user');
    const userId = userString ? JSON.parse(userString).id : null;

    if (this.totalPrice && userId) {
      let orderData: order = {
        ...data,
        totalPrice: this.totalPrice,
        userId,
        id: undefined,
      };

      this.cartData?.forEach((item) => {
        setTimeout(() => {
          item.id && this.product.deleteCartItems(item.id?.toString() || '');
        }, 700);
      });

      this.product.orderNow(orderData).subscribe((result) => {
        if (result) {
          this.orderMsg = 'Your Order has been Placed';
          setTimeout(() => {
            this.router.navigate(['/my-orders']);
            this.orderMsg = undefined;
          }, 4000);
        }
      });
    }
  }
}