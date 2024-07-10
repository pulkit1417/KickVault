import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product, saleItem } from '../data-types';
import { RouterLink } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  orderNow(arg0: any) {
    throw new Error('Method not implemented.');
  }
  popularProducts: undefined | product[];
  trendyProducts: undefined | product[];
  saleItems: undefined | saleItem[];
  orderMsg: any;
  totalPrice: any;
  constructor(private product: ProductService) {}
  currentSlide = 0;
  isWished: boolean = false;

  toggleWishlist(item: any) {
    item.isWished = !item.isWished;
    item['animateHeart'] = true; // Use bracket notation here
    setTimeout(() => item['animateHeart'] = false, 300);
  }

  prevSlide() {
    this.currentSlide =
      this.currentSlide === 0
        ? this.popularProducts!.length - 1
        : this.currentSlide - 1;
  }
  nextSlide() {
    this.currentSlide =
      this.currentSlide === this.popularProducts!.length - 1
        ? 0
        : this.currentSlide + 1;
  }

  ngOnInit(): void {
    this.product.popularProducts().subscribe((data) => {
      this.popularProducts = data;
    });
    this.product.trendyProducts().subscribe((data) => {
      this.trendyProducts = data;
    });
    this.product.saleProducts().subscribe((data) => {
      this.saleItems = data;
    });
  }

}
