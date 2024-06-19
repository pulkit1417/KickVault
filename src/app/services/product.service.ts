import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { cart, order, product } from '../data-types';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  cartData = new EventEmitter<product[] | []>();

  constructor(private http: HttpClient, private router: Router) {}
  addProduct(data: product) {
    return this.http.post('https://database-21b41-default-rtdb.firebaseio.com/products', data);
  }

  productList() {
    return this.http.get<product[]>('https://database-21b41-default-rtdb.firebaseio.com/products');
  }

  deleteProduct(id: string) {
    return this.http.delete(`https://database-21b41-default-rtdb.firebaseio.com/products/${id}`);
  }

  getProduct(id: string) {
    return this.http.get<product>(`https://database-21b41-default-rtdb.firebaseio.com/products/${id}`);
  }

  updateProduct(product: product) {
    return this.http.put<product>(
      `https://database-21b41-default-rtdb.firebaseio.com/${product.id}`,
      product
    );
  }
  popularProducts() {
    return this.http.get<product[]>('https://database-21b41-default-rtdb.firebaseio.com/products?_limit=3');
  }
  trendyProducts() {
    return this.http.get<product[]>('https://database-21b41-default-rtdb.firebaseio.com/products?_limit=8');
  }
  searchProducts(query: string) {
    return this.http.get<product[]>(
      `https://database-21b41-default-rtdb.firebaseio.com/products?q=${query}`
    );
  }
  localAddToCart(data: product) {
    let cartData = [];
    let LocalCart = localStorage.getItem('LocalCart');
    if (!LocalCart) {
      localStorage.setItem('LocalCart', JSON.stringify([data]));
      this.cartData.emit([data]);
    } else {
      cartData = JSON.parse(LocalCart);
      cartData.push(data);
      localStorage.setItem('LocalCart', JSON.stringify(cartData));
    }
    this.cartData.emit(cartData);
  }
  removeItemFromCart(productId:string){
    let cartData = localStorage.getItem('LocalCart');
    if(cartData){
      let items : product[] = JSON.parse(cartData);
      items = items.filter((item:product)=>productId!==item.id);
      localStorage.setItem('LocalCart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }

  addToCart(cartData:cart){
    return this.http.post('https://database-21b41-default-rtdb.firebaseio.com/cart', cartData);
  }

  getCartList(userId: string) {
    return this.http.get<product[]>(`https://database-21b41-default-rtdb.firebaseio.com/cart?userId=${userId}`, {
      observe: 'response'
    }).subscribe((result:any) => {
      if (result && result.body) {
        this.cartData.emit(result.body);
      }
    });
  }

  removeToCart(cartId:string){
    return this.http.delete(`https://database-21b41-default-rtdb.firebaseio.com/cart/${cartId}`);
  }

  currentCart(){
    
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<cart[]>(`https://database-21b41-default-rtdb.firebaseio.com/cart?userId=${userData.id}`);
  }

  orderNow(data:order){
    return this.http.post('https://database-21b41-default-rtdb.firebaseio.com/orders', data)
  }

  orderList(){
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<order[]>(`https://database-21b41-default-rtdb.firebaseio.com/orders?userId=${userData.id}`)
  }

  deleteCartItems(cartId:string){
    return this.http.delete(`https://database-21b41-default-rtdb.firebaseio.com/cart/${cartId}`,{observe:'response'}).subscribe((result: any)=>{
      if(result){
        this.cartData.emit([])
      }
    })
  }

  cancelOrder(orderId:string){
    return this.http.delete(`https://database-21b41-default-rtdb.firebaseio.com/orders/${orderId}`)
  }

}
