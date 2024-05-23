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
      productId && this.product.getProduct(productId).subscribe((result)=>{
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
  addToCart(){
    if(this.productData){
      this.productData.quantity = this.productQuantity;
      if(!localStorage.getItem('user')){
        this.product.localAddToCart(this.productData);
      }
      else{
        
      }
    }
    
  }
}
