import { EventEmitter, Injectable } from '@angular/core';
import { Login, SignUp } from '../data-types';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LocalStorageService } from './local-storage-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  inValidUserAuth = new EventEmitter<boolean>(false);

  constructor(
    private http: HttpClient, 
    private router: Router,
    private localStorageService: LocalStorageService // Inject the new service
  ) { }

  userSignUp(user: SignUp) {
    this.http.post("https://database-yme9.onrender.com/users", user, { observe: 'response' })
      .subscribe((result) => {
        if (result) {
          this.localStorageService.setItem('user', JSON.stringify(result.body));
          this.router.navigate(['/'])
        }
      })
  }

  userLogin(data: Login) {
    this.http.get<SignUp[]>(`https://database-yme9.onrender.com/users?email=${data.email}&password=${data.password}`,
      { observe: 'response' }
    ).subscribe((result) => {
      if (result && result.body?.length) {
        this.inValidUserAuth.emit(false);
        this.localStorageService.setItem('user', JSON.stringify(result.body[0]));
        this.router.navigate(['/']);
      }
      else {
        this.inValidUserAuth.emit(true)
      }
    });
  }

  userAuthReload() {
    if (this.localStorageService.getItem('user')) {
      this.router.navigate(['/']);
    }
  }
}