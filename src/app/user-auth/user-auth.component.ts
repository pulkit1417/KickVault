import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { cart, Login, product, SignUp } from '../data-types';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';
import { LocalStorageService } from '../services/local-storage-service.service';

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

  constructor(
    private user: UserService, 
    private product: ProductService,
    private localStorageService: LocalStorageService // Inject the new service
  ) {}

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
    let data = this.localStorageService.getItem('LocalCart');
    let userString = this.localStorageService.getItem('user');
    let userId = userString && JSON.parse(userString).id;
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
          this.product.addToCart(cartData).subscribe((result: any) => {
            if (result) {
              // Handle successful addition to cart
            }
          });
        }, 500);
        if (cartDataList.length === index + 1) {
          this.localStorageService.removeItem('LocalCart');
        }
      });
    }
    setTimeout(() => {
      let newUserString = this.localStorageService.getItem('user');
      let newUserId = newUserString && JSON.parse(newUserString).id;
      this.product.getCartList(newUserId);
    }, 200);
  }
}