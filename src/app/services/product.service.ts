import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { cart, order, product, saleItem } from '../data-types';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  cartData = new EventEmitter<product[] | []>();

  constructor(private http: HttpClient, private router: Router) {}
  addProduct(data: product) {
    return this.http.post('https://database-yme9.onrender.com/products', data);
  }

  productList() {
    return this.http.get<product[]>('https://database-yme9.onrender.com/products');
  }

  deleteProduct(id: string) {
    return this.http.delete(`https://database-yme9.onrender.com/products/${id}`);
  }

  getProduct(id: string) {
    return this.http.get<product>(`https://database-yme9.onrender.com/products/${id}`)
  }

  updateProduct(product: product) {
    return this.http.put<product>(
      `https://database-yme9.onrender.com/products/${product.id}`,
      product
    );
  }
  popularProducts() {
    return this.http.get<product[]>('https://database-yme9.onrender.com/products?_limit=3');
  }
  trendyProducts() {
    return this.http.get<product[]>('https://database-yme9.onrender.com/products?_limit=8');
  }

  saleProducts(){
    return this.http.get<saleItem[]>('https://database-yme9.onrender.com/saleItem?_limit=4')
  }

  searchProducts(query: string) {
    return this.http.get<product[]>(
      `https://database-yme9.onrender.com/products?q=${query}`
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
    return this.http.post('https://database-yme9.onrender.com/cart', cartData);
  }

  getCartList(userId: string) {
    return this.http.get<product[]>(`https://database-yme9.onrender.com/cart?userId=${userId}`, {
      observe: 'response'
    }).subscribe((result:any) => {
      if (result && result.body) {
        this.cartData.emit(result.body);
      }
    });
  }

  removeToCart(cartId:string){
    return this.http.delete(`https://database-yme9.onrender.com/cart/${cartId}`);
  }

  currentCart(){
    
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<cart[]>(`https://database-yme9.onrender.com/cart?userId=${userData.id}`);
  }

  orderNow(data:order){
    return this.http.post('https://database-yme9.onrender.com/orders', data)
  }

  orderList(){
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<order[]>(`https://database-yme9.onrender.com/orders?userId=${userData.id}`)
  }

  deleteCartItems(cartId:string){
    return this.http.delete(`https://database-yme9.onrender.com/cart/${cartId}`,{observe:'response'}).subscribe((result: any)=>{
      if(result){
        this.cartData.emit([])
      }
    })
  }

  cancelOrder(orderId:string){
    return this.http.delete(`https://database-yme9.onrender.com/orders/${orderId}`)
  }

}
