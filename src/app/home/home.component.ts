import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-types';
import { RouterLink } from '@angular/router';
  

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf,NgFor,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  popularProducts:undefined|product[]
  trendyProducts:undefined | product[];
  constructor(private product:ProductService){}
  currentSlide = 0;


  prevSlide() {
    this.currentSlide = (this.currentSlide === 0) ? this.popularProducts!.length - 1 : this.currentSlide - 1;
  }
  nextSlide() {
    this.currentSlide = (this.currentSlide === this.popularProducts!.length - 1) ? 0 : this.currentSlide + 1;
  }

  ngOnInit(): void {
    this.product.popularProducts().subscribe((data)=>{
      this.popularProducts=data;
    })
    this.product.trendyProducts().subscribe((data)=>{
      this.trendyProducts=data;
    })    
  }  
  
}
