import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';
import { product } from '../data-types';
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
  searchResult:undefined|product[];
  searchText:undefined |product[];
  constructor(private route: Router,private product:ProductService) {}

  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          this.menuType = 'seller';
          if (localStorage.getItem('seller')) {
            let sellerStore = localStorage.getItem('seller');
            let sellerData = sellerStore && JSON.parse(sellerStore)[0];
            this.sellerName = sellerData.username;
          }
        } else {
          this.menuType = 'default';
        }
      }
    });
  }
  logout() {
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }
  searchProducts(query:KeyboardEvent){
    if(query){
      const element = query.target as HTMLInputElement;
      this.product.searchProducts(element.value).subscribe((result)=>{
        
        if(result.length>5){
          result.length=length
        }
        this.searchResult=result;

      })
    }
  }
  hideSearch(){
    this.searchResult=undefined
  }
  redirectToDetails(id:string){
    this.route.navigate(['/details/'+id])
  }
  submitSearch(val:string){
    console.warn(val)
  this.route.navigate([`search/${val}`]);
  }
}
