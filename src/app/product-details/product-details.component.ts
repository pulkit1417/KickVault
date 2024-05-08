import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { NgIf } from '@angular/common';
import { product,cart } from '../data-types';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [NgIf],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  productData :undefined | product;
  productQuantity:number=1;
  removeCart=false;
  cartData:product|undefined;;
  constructor(private activeRoute : ActivatedRoute, private product:ProductService){}
  ngOnInit(): void {
    let productId=this.activeRoute.snapshot.paramMap.get('productId');
    console.warn(productId);
    productId && this.product.getProduct(productId).subscribe((result)=>{
      console.warn(result)
      this.productData=result;
    })
  }
  
  handleQuantity(val:string){
    if(this.productQuantity<20 && val==='plus'){
      this.productQuantity+=1;
    }else if(this.productQuantity>1 && val==='min'){
      this.productQuantity-=1;
    }
  }
//   addToCart(){
//     if(this.productData){
//       this.productData.quantity = this.productQuantity;
//       if(!localStorage.getItem('user')){
//         this.product.localAddToCart(this.productData);
//         this.removeCart=true
//       }else{
//         let user = localStorage.getItem('user');
//         let userId= user && JSON.parse(user).id;
//         let cartData:cart={
//           ...this.productData,
//           productId:this.productData.id,
//           userId
//         }
//         delete cartData.id;
//         this.product.addToCart(cartData).subscribe((result)=>{
//           if(result){
//            this.product.getCartList(userId);
//            this.removeCart=true
//           }
//         })        
//       }
      
//     } 
//   }
//   removeToCart(productId:number){
//     if(!localStorage.getItem('user')){
// this.product.removeItemFromCart(productId)
//     }else{
//       console.warn("cartData", this.cartData);
      
//       this.cartData && this.product.removeToCart(this.cartData.id)
//       .subscribe((result)=>{
//         let user = localStorage.getItem('user');
//         let userId= user && JSON.parse(user).id;
//         this.product.getCartList(userId)
//       })
//     }
//     this.removeCart=false
//   }



}
