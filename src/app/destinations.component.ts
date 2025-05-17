import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DestinationCardComponent } from './destination-card.component';
import { NavbarComponent } from './navbar.component';

@Component({
  selector: 'app-destinations',
  standalone: true,
  imports: [CommonModule, DestinationCardComponent, NavbarComponent],
  template: `
    <app-navbar></app-navbar>
    <section class="position-relative w-100 mb-5">
      <div class="bg-primary bg-gradient text-white d-flex align-items-center justify-content-center" style="height: 320px; background-image: url('https://images.unsplash.com/photo-1469041797191-50ace28483c3?auto=format&fit=crop&w=2000&q=80'); background-size: cover; background-position: center;">
        <div class="position-absolute top-0 start-0 w-100 h-100" style="background: rgba(0,0,0,0.4);"></div>
        <div class="position-relative z-1 text-center w-100">
          <h1 class="display-4 fw-bold mb-3 text-white text-shadow">Explore All Destinations</h1>
          <p class="lead text-white-50 mb-0">Browse our curated list of the world’s most popular travel spots</p>
        </div>
      </div>
    </section>
    <div class="container pb-5">
      <div class="row g-4 animate__animated animate__fadeInUp">
        <div class="col-12 col-sm-6 col-lg-3" *ngFor="let destination of destinations">
          <app-destination-card [destination]="destination"></app-destination-card>
        </div>
      </div>
    </div>
  `
})
export class DestinationsComponent {
  destinations = [
    {
      city: 'Paris', country: 'France', imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80', price: '$499', link: '/destinations/paris'
    },
    {
      city: 'Bali', country: 'Indonesia', imageUrl: 'https://images.unsplash.com/photo-1518877593221-1f28583780b4?auto=format&fit=crop&q=80', price: '$799', link: '/destinations/bali'
    },
    {
      city: 'New York', country: 'United States', imageUrl: 'https://images.unsplash.com/photo-1439886183900-e79ec0057170?auto=format&fit=crop&q=80', price: '$599', link: '/destinations/new-york'
    },
    {
      city: 'Tokyo', country: 'Japan', imageUrl: 'https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?auto=format&fit=crop&q=80', price: '$899', link: '/destinations/tokyo'
    },
    {
      city: 'London', country: 'UK', imageUrl: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&q=80', price: '$549', link: '/destinations/london'
    },
    {
      city: 'Sydney', country: 'Australia', imageUrl: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&q=80', price: '$899', link: '/destinations/sydney'
    },
    {
      city: 'Rome', country: 'Italy', imageUrl: 'https://images.unsplash.com/photo-1468436139062-f60a71c5c892?auto=format&fit=crop&q=80', price: '$599', link: '/destinations/rome'
    },
    {
      city: 'Bangkok', country: 'Thailand', imageUrl: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80', price: '$499', link: '/destinations/bangkok'
    },
    {
      city: 'Cape Town', country: 'South Africa', imageUrl: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&q=80', price: '$699', link: '/destinations/cape-town'
    }
  ];
}
