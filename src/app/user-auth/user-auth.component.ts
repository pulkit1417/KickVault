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
  constructor(private user: UserService) {}
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
  }
}
