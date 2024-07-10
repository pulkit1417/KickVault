import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ProductService } from '../services/product.service';
import { product } from '../data-types';
import { LocalStorageService } from '../services/local-storage-service.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  title = 'Ecommerce-Project';
  menuType: string = 'default';
  sellerName: string = '';
  userName: string = '';
  searchResult: undefined | product[];
  searchText: undefined | product[];
  cartItems = 0;
  constructor(
    private route: Router, 
    private product: ProductService,
    private localStorage: LocalStorageService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        const sellerData = this.getSellerData();
        const userData = this.getUserData();

        if (sellerData && val.url.includes('seller')) {
          this.sellerName = sellerData.username;
          this.menuType = 'seller';
        } else if (userData) {
          this.userName = userData.username;
          this.menuType = 'user';
          this.product.getCartList(userData.id);
        } else {
          this.menuType = 'default';
        }
      }
    });

    const cartData = this.localStorage.getItem('LocalCart');
    if (cartData) {
      this.cartItems = JSON.parse(cartData).length;
    }

    this.product.cartData.subscribe((items) => {
      this.cartItems = items.length;
    });
  }

  private getSellerData() {
    const sellerStore = this.localStorage.getItem('seller');
    return sellerStore ? JSON.parse(sellerStore)[0] : null;
  }

  private getUserData() {
    const userStore = this.localStorage.getItem('user');
    return userStore ? JSON.parse(userStore) : null;
  }

  sellerLogout() {
    this.localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }

  userLogout() {
    this.localStorage.removeItem('user');
    this.route.navigate(['user-auth']);
    this.product.cartData.emit([]);
  }


  searchProducts(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      this.product.searchProducts(element.value).subscribe((result) => {
        if (result.length > 5) {
          result.length = length;
        }
        this.searchResult = result;
      });
    }
  }
  hideSearch() {
    this.searchResult = undefined;
  }
  redirectToDetails(id: string) {
    this.route.navigate(['/details/' + id]);
  }
  submitSearch(val: string) {
    this.route.navigate([`search/${val}`]);
  }
}
