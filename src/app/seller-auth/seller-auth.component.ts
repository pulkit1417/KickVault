import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { SellerService } from '../serivces/seller.service';
import { Router } from '@angular/router';
import { Login, SignUp } from '../data-types';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-seller-auth',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css',
})
export class SellerAuthComponent implements OnInit {
  constructor(private seller: SellerService, private router: Router) {}
  showLogin = false;
  authError : string = '';
  ngOnInit(): void {
    this.seller.reloadSeller();
  }
  signup(data: SignUp): void {
    this.seller.userSignUp(data);
  }
  login(data: Login): void {
    this.authError="";
    this.seller.userLogin(data);
    this.seller.isLoginError.subscribe((isError)=>{
      if(isError){
        this.authError = "Email or password is incorrect!!";
      }
    })
  }
  openLogin() {
    this.showLogin = true;
  }
  openSignUp() {
    this.showLogin = false;
  }
}
