import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Login, SignUp } from '../data-types';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css',
})
export class UserAuthComponent implements OnInit {
  showLogin: boolean = true;
  authError:string="";
  constructor(private user: UserService) {}
  ngOnInit(): void {
    this.user.userAuthReload();
  }
  openSignUp() {
    this.showLogin = true;
  }
  openLogin() {
    this.showLogin = false;
    this.user.inValidUserAuth.subscribe((result)=>{
      console.warn("apple",result);
      if(result){
        this.authError="Please Enter Valid User Credentials"
      }
    })
  }
  signUp(data: SignUp) {
    this.user.userSignUp(data);
  }
  login(data: Login) {
    this.user.userLogin(data);
  }
}
