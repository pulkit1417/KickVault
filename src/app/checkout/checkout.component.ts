import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { order } from '../data-types';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  totalPrice:number|undefined;
constructor(private product : ProductService){}
ngOnInit(): void {
  this.product.currentCart().subscribe((result) => {
    let price = 0;
    result.forEach((item) => {
      if (item.quantity) {
        price = price + +item.price * +item.quantity;
      }
    });
    this.totalPrice=parseFloat(
      (price + (price/16) + 50 - (price/15)).toFixed(2)
    );
  });
}

orderNow(data:{email:string,address:string,phone:string}){
  let user = localStorage.getItem('user');
  let userId= user && JSON.parse(user).id;

  if(this.totalPrice){
    let orderData:order={
      ...data,
      totalPrice:this.totalPrice,
      userId
    }
    this.product.orderNow(orderData).subscribe((result)=>{
      if(result){
        alert("Your Order has been Placed");
      }
    })
    }

}
}
