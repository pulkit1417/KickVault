import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { cart, Login, product, SignUp } from '../data-types';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css',
})
export class UserAuthComponent implements OnInit {
  showLogin: boolean = true;
  authError: string = '';

  constructor(private user: UserService, private product: ProductService) {}
  ngOnInit(): void {
    this.user.userAuthReload();
  }
  openSignUp() {
    this.showLogin = true;
  }
  openLogin() {
    this.showLogin = false;
  }
  signUp(data: SignUp) {
    this.user.userSignUp(data);
  }
  login(data: Login) {
    this.user.userLogin(data);
    this.user.inValidUserAuth.subscribe((result) => {
      if (result) {
        this.authError = 'Please Enter Valid User Credentials';
      } else {
        this.localCartToRemoteCart();
      }
    });
  }


  
  localCartToRemoteCart() {
    let data = localStorage.getItem('LocalCart');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if (data) {
      let cartDataList: product[] = JSON.parse(data);

      cartDataList.forEach((product: product, index) => {
        let cartData: cart = {
          ...product,
          productId: product.id,
          userId,
        };

        delete cartData.id;
        setTimeout(() => {
          this.product.addToCart(cartData).subscribe((result) => {
            if (result) {
            }
          });
        }, 500);
        if (cartDataList.length === index + 1) {
          localStorage.removeItem('LocalCart');
        }
      });
    }
    setTimeout(()=>{
      let newUser = localStorage.getItem('user');
      let userId = newUser && JSON.parse(newUser).id;
      this.product.getCartList(userId);
     },200);
  }
}
