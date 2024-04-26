import { Component, OnInit } from '@angular/core';
import { product } from '../data-types';
import { ProductService } from '../services/product.service';
import { NgFor } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-seller-home',
  standalone: true,
  imports: [NgFor,FontAwesomeModule,RouterLink],
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css',
})
export class SellerHomeComponent implements OnInit {
  productList: undefined | product[];
  deleteProductMessage:undefined |string;
  icon = faTrash;
  iconEdit = faEdit;
  constructor(private product: ProductService) {}
  ngOnInit(): void {
    this.list();
  }
  deleteProduct(id:string){
      this.product.deleteProduct(id).subscribe((result)=>{
        if(result){
          this.deleteProductMessage="Product has been deleted";
          this.list();
        }
      })
      setTimeout(()=>{
        this.deleteProductMessage=undefined;
      },3000)
  }

  list(){
    this.product.productList().subscribe((result) => {
      if(result){
      this.productList = result;
    }
    });
  }
}
