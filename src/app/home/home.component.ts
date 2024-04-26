import { NgClass } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgClass],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  currentSlide = 0;

  prevSlide() {
    this.currentSlide = (this.currentSlide === 0) ? 2 : this.currentSlide - 1;
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide === 2) ? 0 : this.currentSlide + 1;
  }
}
