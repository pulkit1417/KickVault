import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { product } from '../data-types';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient, private router: Router) {}
  addProduct(data: product) {
    return this.http.post('http://localhost:3000/products', data);
  }

  productList() {
    return this.http.get<product[]>('http://localhost:3000/products');
  }
  
  deleteProduct(id:string){
    return this.http.delete(`http://localhost:3000/products/${id}`)
  }

  getProduct(id:string){
    return this.http.get<product>(`http://localhost:3000/products/${id}`);
  }

  updateProduct(product : product){
    return this.http.put<product>(`http://localhost:3000/products/${product.id}`,product);
  }
  popularProducts(){
    return this.http.get<product[]>('http://localhost:3000/products?_limit=3');
  }
  trendyProducts() {
    return this.http.get<product[]>('http://localhost:3000/products?_limit=8');
  }
  searchProducts(query:string){
    return this.http.get<product[]>(`http://localhost:3000/products?q=${query}`);
  }
  localAddToCart(data:product){
    let CartData = [];
    let LocalCart = localStorage.getItem('LocalCart');
    if(!LocalCart){
      localStorage.setItem('LocalCart',JSON.stringify ([data]))
    }
    else{
      CartData = JSON.parse(LocalCart);
      CartData.push(data);
      localStorage.setItem('LocalCart',JSON.stringify (CartData))
      }
  }
  }
