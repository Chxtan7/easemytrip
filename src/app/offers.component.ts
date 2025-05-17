import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar.component';

interface Offer {
  title: string;
  type: 'flight' | 'hotel' | 'package';
  image: string;
  discount: string;
  destination?: string;
  duration?: string;
  validUntil: string;
  price: string;
  oldPrice?: string;
  promoCode?: string;
  description: string;
}

@Component({
  selector: 'app-offers',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  template: `
    <app-navbar></app-navbar>
    <div class="container py-5">
      <section class="mb-5 position-relative" style="height:300px;">
        <div class="position-absolute top-0 start-0 w-100 h-100" style="background:url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80') center/cover no-repeat;"></div>
        <div class="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"></div>
        <div class="position-relative z-1 text-center text-white py-5">
          <h1 class="display-5 fw-bold mb-3">Special Offers & Deals</h1>
          <p class="lead mx-auto" style="max-width:600px;">Discover our best promotions and save big on your next trip</p>
        </div>
      </section>
      <div>
        <ul class="nav nav-tabs mb-4" role="tablist">
          <li class="nav-item" role="presentation"><button class="nav-link" [class.active]="activeTab==='all'" (click)="setTab('all')" type="button" role="tab">All Offers</button></li>
          <li class="nav-item" role="presentation"><button class="nav-link" [class.active]="activeTab==='flights'" (click)="setTab('flights')" type="button" role="tab">Flight Deals</button></li>
          <li class="nav-item" role="presentation"><button class="nav-link" [class.active]="activeTab==='hotels'" (click)="setTab('hotels')" type="button" role="tab">Hotel Deals</button></li>
          <li class="nav-item" role="presentation"><button class="nav-link" [class.active]="activeTab==='packages'" (click)="setTab('packages')" type="button" role="tab">Package Deals</button></li>
        </ul>
        <div class="tab-content">
          <div class="tab-pane fade" [class.show]="activeTab==='all'" [class.active]="activeTab==='all'">
            <div class="row g-4">
              <div class="col-md-4" *ngFor="let offer of allOffers">
                <div class="card h-100 shadow offer-card position-relative overflow-hidden">
                  <img [src]="offer.image" [alt]="offer.title" class="card-img offer-img position-absolute w-100 h-100 object-fit-cover" />
                  <div class="card-img-overlay d-flex flex-column justify-content-between p-3 bg-dark bg-opacity-50">
                    <div>
                      <span class="badge bg-primary mb-2">{{ offer.discount }}</span>
                      <h5 class="card-title text-white fw-bold">{{ offer.title }}</h5>
                      <p class="card-text text-white-50 small">{{ offer.description }}</p>
                    </div>
                    <a href="#" class="btn btn-outline-light btn-sm align-self-start mt-2">Book Now</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="tab-pane fade" [class.show]="activeTab==='flights'" [class.active]="activeTab==='flights'">
            <div class="row g-4">
              <div class="col-md-4" *ngFor="let offer of flightOffers">
                <div class="card h-100 shadow offer-card position-relative overflow-hidden">
                  <img [src]="offer.image" [alt]="offer.title" class="card-img offer-img position-absolute w-100 h-100 object-fit-cover" />
                  <div class="card-img-overlay d-flex flex-column justify-content-between p-3 bg-dark bg-opacity-50">
                    <div>
                      <span class="badge bg-primary mb-2">{{ offer.discount }}</span>
                      <h5 class="card-title text-white fw-bold">{{ offer.title }}</h5>
                      <p class="card-text text-white-50 small">{{ offer.description }}</p>
                    </div>
                    <a href="#" class="btn btn-outline-light btn-sm align-self-start mt-2">Book Now</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="tab-pane fade" [class.show]="activeTab==='hotels'" [class.active]="activeTab==='hotels'">
            <div class="row g-4">
              <div class="col-md-4" *ngFor="let offer of hotelOffers">
                <div class="card h-100 shadow offer-card position-relative overflow-hidden">
                  <img [src]="offer.image" [alt]="offer.title" class="card-img offer-img position-absolute w-100 h-100 object-fit-cover" />
                  <div class="card-img-overlay d-flex flex-column justify-content-between p-3 bg-dark bg-opacity-50">
                    <div>
                      <span class="badge bg-primary mb-2">{{ offer.discount }}</span>
                      <h5 class="card-title text-white fw-bold">{{ offer.title }}</h5>
                      <p class="card-text text-white-50 small">{{ offer.description }}</p>
                    </div>
                    <a href="#" class="btn btn-outline-light btn-sm align-self-start mt-2">Book Now</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="tab-pane fade" [class.show]="activeTab==='packages'" [class.active]="activeTab==='packages'">
            <div class="row g-4">
              <div class="col-md-4" *ngFor="let offer of packageOffers">
                <div class="card h-100 shadow offer-card position-relative overflow-hidden">
                  <img [src]="offer.image" [alt]="offer.title" class="card-img offer-img position-absolute w-100 h-100 object-fit-cover" />
                  <div class="card-img-overlay d-flex flex-column justify-content-between p-3 bg-dark bg-opacity-50">
                    <div>
                      <span class="badge bg-primary mb-2">{{ offer.discount }}</span>
                      <h5 class="card-title text-white fw-bold">{{ offer.title }}</h5>
                      <p class="card-text text-white-50 small">{{ offer.description }}</p>
                    </div>
                    <a href="#" class="btn btn-outline-light btn-sm align-self-start mt-2">Book Now</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section class="bg-primary bg-opacity-10 rounded p-4 p-md-5 shadow mt-5 text-center mx-auto" style="max-width:600px;">
        <h2 class="h4 fw-bold mb-3 text-dark">Get the Latest Deals Straight to Your Inbox</h2>
        <p class="text-secondary mb-4">Subscribe to our newsletter and be the first to know about exclusive offers, flash sales, and travel inspirations.</p>
        <form class="d-flex flex-column flex-sm-row gap-2 justify-content-center">
          <input type="email" class="form-control" placeholder="Your email address">
          <button type="submit" class="btn btn-primary">Subscribe</button>
        </form>
      </section>
    </div>
  `
})
export class OffersComponent {
  activeTab: 'all' | 'flights' | 'hotels' | 'packages' = 'all';
  setTab(tab: 'all' | 'flights' | 'hotels' | 'packages') { this.activeTab = tab; }
  flightOffers: Offer[] = [
    {
      title: 'Fly to Europe for Less',
      type: 'flight',
      image: 'https://images.unsplash.com/photo-1493962853295-0fd70327578a?auto=format&fit=crop&q=80',
      discount: 'Up to 30% OFF',
      destination: 'Multiple European Destinations',
      validUntil: 'Dec 31, 2025',
      price: '$499',
      oldPrice: '$699',
      promoCode: 'EUROPE30',
      description: 'Explore Europe with our special discounted fares to multiple destinations. Book by December for travel through March 2026.'
    },
    {
      title: 'Summer Flight Sale',
      type: 'flight',
      image: 'https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?auto=format&fit=crop&q=80',
      discount: '25% OFF',
      destination: 'Domestic Routes',
      validUntil: 'Aug 31, 2025',
      price: '$149',
      oldPrice: '$199',
      promoCode: 'SUMMER25',
      description: 'Enjoy discounted fares on all domestic routes this summer. Perfect for your family vacation or weekend getaways.'
    }
  ];
  hotelOffers: Offer[] = [
    {
      title: '5-Star Luxury Resort',
      type: 'hotel',
      image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&q=80',
      discount: '40% OFF',
      destination: 'Maldives',
      duration: '7 nights',
      validUntil: 'Oct 15, 2025',
      price: '$1,199',
      oldPrice: '$1,999',
      description: 'Enjoy a luxurious stay at a 5-star overwater villa with private pool. Includes breakfast and dinner daily.'
    },
    {
      title: 'City Break Special',
      type: 'hotel',
      image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&q=80',
      discount: '20% OFF',
      destination: 'New York, Paris, London',
      duration: '3-5 nights',
      validUntil: 'Nov 30, 2025',
      price: '$299',
      oldPrice: '$379',
      promoCode: 'CITY20',
      description: 'Book your urban escape and enjoy complimentary breakfast and late check-out at select city center hotels.'
    }
  ];
  packageOffers: Offer[] = [
    {
      title: 'All-Inclusive Caribbean',
      type: 'package',
      image: 'https://images.unsplash.com/photo-1439886183900-e79ec0057170?auto=format&fit=crop&q=80',
      discount: '35% OFF',
      destination: 'Cancun, Mexico',
      duration: '5 nights',
      validUntil: 'Sep 30, 2025',
      price: '$899',
      oldPrice: '$1,399',
      promoCode: 'BEACH35',
      description: 'All-inclusive beach resort package with flights, transfers, meals, and drinks included. Perfect for couples and families.'
    },
    {
      title: 'Southeast Asia Tour',
      type: 'package',
      image: 'https://images.unsplash.com/photo-1469041797191-50ace28483c3?auto=format&fit=crop&q=80',
      discount: '25% OFF',
      destination: 'Thailand, Vietnam & Cambodia',
      duration: '12 nights',
      validUntil: 'Dec 15, 2025',
      price: '$1,699',
      oldPrice: '$2,299',
      description: 'Experience the beauty and culture of Southeast Asia with this comprehensive tour package including flights, hotels, and guided tours.'
    }
  ];
  get allOffers(): Offer[] {
    return [...this.flightOffers, ...this.hotelOffers, ...this.packageOffers];
  }
}
