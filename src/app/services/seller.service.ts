import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login, SignUp } from '../data-types';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { LocalStorageService } from './local-storage-service.service';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false)

  constructor(
    private http: HttpClient, 
    private router: Router,
    private localStorageService: LocalStorageService // Inject the new service
  ) {}

  userSignUp(data: SignUp) {
    this.http
      .post('https://database-yme9.onrender.com/seller', data, { observe: 'response' })
      .subscribe((result: { body: any; }) => {
        this.isSellerLoggedIn.next(true);
        this.localStorageService.setItem('seller', JSON.stringify(result.body));
        this.router.navigate(['seller-home']);
      });
  }

  reloadSeller() {
    if (this.localStorageService.getItem('seller')) {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);
    }
  }

  userLogin(data: Login) {
    this.http
      .get(
        `https://database-yme9.onrender.com/seller?email=${data.email}&password=${data.password}`,
        { observe: 'response' }
      )
      .subscribe((result: any) => {
        if (result && result.body && result.body.length) {
          this.localStorageService.setItem('seller', JSON.stringify(result.body));
          this.router.navigate(['seller-home']);
        } else {
          this.isLoginError.emit(true)
        }
      });
  }
}