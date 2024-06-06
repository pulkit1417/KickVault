import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { product } from '../data-types';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-seller-update-product',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './seller-update-product.component.html',
  styleUrl: './seller-update-product.component.css',
})
export class SellerUpdateProductComponent implements OnInit {
  productData: undefined | product;
  productMessage: undefined | string;
  productMessage2: undefined | string;
  constructor(private route: ActivatedRoute, private product: ProductService,private router  : Router) {}
  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
    productId &&
      this.product.getProduct(productId).subscribe((data) => {
        
        this.productData = data;
      });
  }
  addproduct(data: product) {
    if(this.productData){
      data.id = this.productData.id;
    }
    this.product.updateProduct(data).subscribe((result) => {
      if (result) {
        this.productMessage = 'Product has beeen Updated';
        this.productMessage2= "Page will be redirected to Product-List"

      }
    });
    setTimeout(() => {
      this.productMessage = undefined;
      this.productMessage2 = undefined;
      this.router.navigate(['/seller-home'])
    }, 3000);
  }
}
