import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { product } from '../data-types';
import {Router} from '@angular/router'

@Component({
  selector: 'app-seller-add-product',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './seller-add-product.component.html',
  styleUrl: './seller-add-product.component.css',
})
export class SellerAddProductComponent {
  constructor(private product: ProductService,private router  : Router) {}
  addProductMessage: string | undefined;
  addProductMessage2: undefined | string;
  addproduct(data: product) {
    this.product.addProduct(data).subscribe((result) => {
      if (result) {
        this.addProductMessage = 'Your product has been added';
        this.addProductMessage2= "Page will be redirected to Product-List"
  }});
    setTimeout(() => {
      this.addProductMessage = undefined;
      this.addProductMessage2=undefined;
      this.router.navigate(['/seller-home'])
    }, 3000);
  }
}
