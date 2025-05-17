import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar.component';

interface Hotel {
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  type: string;
  location: string;
  features: string[];
  price: string;
}

@Component({
  selector: 'app-hotels',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  template: `
    <app-navbar></app-navbar>
    <div class="container py-5">
      <h2 class="h2 fw-bold mb-4">Search Hotels</h2>
      <div class="row">
        <div class="col-lg-3 mb-4">
          <div class="bg-white rounded shadow p-3 mb-4">
            <h5 class="fw-semibold mb-3">Filters</h5>
            <div class="mb-4">
              <label class="form-label">Price Per Night</label>
              <input type="range" class="form-range" min="50" max="400" [(ngModel)]="priceMin" (change)="applyFilters()">
              <input type="range" class="form-range" min="50" max="400" [(ngModel)]="priceMax" (change)="applyFilters()">
              <div class="d-flex justify-content-between small">
                <span>&dollar;{{ priceMin }}</span>
                <span>&dollar;{{ priceMax }}</span>
              </div>
            </div>
            <div class="mb-4">
              <label class="form-label">Star Rating</label>
              <div *ngFor="let rating of [5,4,3,2,1]" class="form-check d-flex align-items-center">
                <input class="form-check-input me-2" type="checkbox" [id]="'star-' + rating" [(ngModel)]="starFilter[rating]" (change)="applyFilters()">
                <label class="form-check-label d-flex align-items-center" [for]="'star-' + rating">
                  <ng-container *ngFor="let _ of [].constructor(rating)">
                    <span class="text-warning">&#9733;</span>
                  </ng-container>
                  <ng-container *ngFor="let _ of [].constructor(5-rating)">
                    <span class="text-secondary">&#9733;</span>
                  </ng-container>
                </label>
              </div>
            </div>
            <div class="mb-4">
              <label class="form-label">Hotel Facilities</label>
              <div *ngFor="let facility of facilities" class="form-check">
                <input class="form-check-input" type="checkbox" [id]="facility" [(ngModel)]="facilitiesFilter[facility]" (change)="applyFilters()">
                <label class="form-check-label" [for]="facility">{{facility}}</label>
              </div>
            </div>
            <div>
              <label class="form-label">Property Type</label>
              <div *ngFor="let type of propertyTypes" class="form-check">
                <input class="form-check-input" type="checkbox" [id]="type" [(ngModel)]="propertyTypeFilter[type]" (change)="applyFilters()">
                <label class="form-check-label" [for]="type">{{type}}</label>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-9">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <span class="text-secondary">Showing {{filteredHotels.length}} hotels in New York</span>
            <div class="d-flex align-items-center">
              <span class="me-2 small">Sort by:</span>
              <select class="form-select form-select-sm w-auto" [(ngModel)]="sortBy" (change)="applySort()">
                <option value="recommended">Recommended</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>
          <div *ngFor="let hotel of pagedHotels()" class="bg-white rounded shadow mb-4 overflow-hidden">
            <div class="row g-0">
              <div class="col-md-4">
                <img [src]="hotel.image" [alt]="hotel.name" class="w-100 h-100 object-fit-cover" style="min-height:200px;">
              </div>
              <div class="col-md-8 p-4 d-flex flex-column flex-md-row justify-content-between">
                <div>
                  <h3 class="h5 fw-bold mb-1">{{hotel.name}}</h3>
                  <div class="mb-2">
                    <ng-container *ngFor="let _ of [].constructor(hotel.rating)">
                      <span class="text-warning">&#9733;</span>
                    </ng-container>
                    <ng-container *ngFor="let _ of [].constructor(5-hotel.rating)">
                      <span class="text-secondary">&#9733;</span>
                    </ng-container>
                    <span class="text-muted small ms-2">({{hotel.reviewCount}} reviews)</span>
                  </div>
                  <div class="text-secondary small mb-2">{{hotel.type}} • {{hotel.location}}</div>
                  <div class="d-flex flex-wrap gap-2 mt-2">
                    <span *ngFor="let feature of hotel.features" class="badge bg-light text-dark border">{{feature}}</span>
                  </div>
                </div>
                <div class="text-end mt-3 mt-md-0">
                  <div class="h4 text-primary">{{hotel.price}}</div>
                  <div class="small text-muted">per night</div>
                  <button class="btn btn-primary btn-sm mt-2">View Deal</button>
                </div>
              </div>
            </div>
          </div>
          <nav class="d-flex justify-content-center mt-4">
            <ul class="pagination">
              <li class="page-item" [class.disabled]="currentPage === 1"><a class="page-link" (click)="goToPage(currentPage-1)">Previous</a></li>
              <li class="page-item" *ngFor="let page of totalPagesArray(); let i = index" [class.active]="currentPage === (i+1)"><a class="page-link" (click)="goToPage(i+1)">{{i+1}}</a></li>
              <li class="page-item" [class.disabled]="currentPage === totalPages"><a class="page-link" (click)="goToPage(currentPage+1)">Next</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  `
})
export class HotelsComponent {
  priceMin = 50;
  priceMax = 400;
  sortBy = 'recommended';
  facilities = [
    'Free WiFi', 'Pool', 'Spa', 'Gym', 'Restaurant', 'Parking', 'Airport Shuttle', 'Pet Friendly'
  ];
  propertyTypes = [
    'Hotel', 'Resort', 'Apartment', 'Villa', 'Hostel', 'Guest House'
  ];
  starFilter: { [key: number]: boolean } = { 5: false, 4: false, 3: false, 2: false, 1: false };
  facilitiesFilter: { [key: string]: boolean } = {};
  propertyTypeFilter: { [key: string]: boolean } = {};
  hotels: Hotel[] = [
    {
      name: 'Luxury Plaza Hotel',
      image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&q=80',
      rating: 5,
      reviewCount: 1245,
      type: 'Luxury Hotel',
      location: 'Central Manhattan',
      features: ['Free WiFi', 'Spa', 'Pool', 'Restaurant'],
      price: '$299'
    },
    {
      name: 'Downtown Suites',
      image: 'https://images.unsplash.com/photo-1466721591366-2d5fba72006d?auto=format&fit=crop&q=80',
      rating: 4,
      reviewCount: 863,
      type: 'Boutique Hotel',
      location: 'Downtown',
      features: ['Free WiFi', 'Parking', 'Breakfast Included'],
      price: '$189'
    },
    {
      name: 'Skyline View Apartments',
      image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&q=80',
      rating: 4,
      reviewCount: 521,
      type: 'Apartment',
      location: 'Upper East Side',
      features: ['Kitchen', 'Washing Machine', 'City View'],
      price: '$159'
    },
    {
      name: 'Metropolitan Inn',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80',
      rating: 3,
      reviewCount: 375,
      type: 'Budget Hotel',
      location: 'Queens',
      features: ['Free WiFi', '24/7 Reception'],
      price: '$119'
    },
    {
      name: 'Central Park Resort',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80',
      rating: 5,
      reviewCount: 980,
      type: 'Resort',
      location: 'Central Park',
      features: ['Pool', 'Spa', 'Free WiFi', 'Restaurant'],
      price: '$349'
    },
    {
      name: 'City Hostel',
      image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80',
      rating: 2,
      reviewCount: 210,
      type: 'Hostel',
      location: 'Brooklyn',
      features: ['Free WiFi', 'Shared Kitchen'],
      price: '$59'
    },
    {
      name: 'Riverside Guest House',
      image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&q=80',
      rating: 3,
      reviewCount: 312,
      type: 'Guest House',
      location: 'Harlem',
      features: ['Free WiFi', 'Breakfast Included'],
      price: '$99'
    },
    {
      name: 'Uptown Villa',
      image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&q=80',
      rating: 4,
      reviewCount: 410,
      type: 'Villa',
      location: 'Uptown',
      features: ['Pool', 'Kitchen', 'Pet Friendly'],
      price: '$249'
    },
    {
      name: 'Harborfront Apartments',
      image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&q=80',
      rating: 3,
      reviewCount: 198,
      type: 'Apartment',
      location: 'Harbor',
      features: ['Free WiFi', 'City View', 'Parking'],
      price: '$139'
    },
    {
      name: 'The Grand Resort',
      image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&q=80',
      rating: 5,
      reviewCount: 1500,
      type: 'Resort',
      location: 'Central Manhattan',
      features: ['Spa', 'Pool', 'Restaurant', 'Gym'],
      price: '$399'
    },
    {
      name: 'Budget Stay',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80',
      rating: 2,
      reviewCount: 95,
      type: 'Budget Hotel',
      location: 'Bronx',
      features: ['Free WiFi'],
      price: '$69'
    },
    {
      name: 'Family Guest House',
      image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80',
      rating: 3,
      reviewCount: 180,
      type: 'Guest House',
      location: 'Queens',
      features: ['Free WiFi', 'Breakfast Included', 'Pet Friendly'],
      price: '$109'
    },
    {
      name: 'Modern City Hotel',
      image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3fdc?auto=format&fit=crop&q=80',
      rating: 4,
      reviewCount: 670,
      type: 'Hotel',
      location: 'Midtown',
      features: ['Free WiFi', 'Gym', 'Restaurant'],
      price: '$179'
    },
    {
      name: 'Penthouse Villa',
      image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80',
      rating: 5,
      reviewCount: 320,
      type: 'Villa',
      location: 'Upper West Side',
      features: ['Pool', 'Kitchen', 'City View'],
      price: '$399'
    },
    {
      name: 'Harlem Boutique',
      image: 'https://images.unsplash.com/photo-1511746315387-c4a76980c9a2?auto=format&fit=crop&q=80',
      rating: 4,
      reviewCount: 245,
      type: 'Boutique Hotel',
      location: 'Harlem',
      features: ['Free WiFi', 'Restaurant', 'Pet Friendly'],
      price: '$159'
    }
  ];
  filteredHotels: Hotel[] = [];
  pageSize = 4;
  currentPage = 1;

  constructor() {
    this.facilities.forEach(f => this.facilitiesFilter[f] = false);
    this.propertyTypes.forEach(t => this.propertyTypeFilter[t] = false);
    this.filteredHotels = [...this.hotels];
  }

  get totalPages() {
    return Math.ceil(this.filteredHotels.length / this.pageSize) || 1;
  }

  pagedHotels() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredHotels.slice(start, start + this.pageSize);
  }

  totalPagesArray() {
    return Array(this.totalPages).fill(0);
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  applyFilters() {
    this.filteredHotels = this.hotels.filter(hotel => {
      // Price filter
      const price = Number(hotel.price.replace(/[^0-9]/g, ''));
      if (price < this.priceMin || price > this.priceMax) return false;
      // Star filter
      const selectedStars = Object.keys(this.starFilter).filter(s => this.starFilter[+s]);
      if (selectedStars.length && !selectedStars.includes(hotel.rating.toString())) return false;
      // Facilities filter
      const selectedFacilities = Object.keys(this.facilitiesFilter).filter(f => this.facilitiesFilter[f]);
      if (selectedFacilities.length && !selectedFacilities.every(fac => hotel.features.includes(fac))) return false;
      // Property type filter
      const selectedTypes = Object.keys(this.propertyTypeFilter).filter(t => this.propertyTypeFilter[t]);
      if (selectedTypes.length && !selectedTypes.includes(hotel.type)) return false;
      return true;
    });
    this.currentPage = 1;
    this.applySort();
  }

  applySort() {
    switch (this.sortBy) {
      case 'price-low-high':
        this.filteredHotels.sort((a, b) => Number(a.price.replace(/[^0-9]/g, '')) - Number(b.price.replace(/[^0-9]/g, '')));
        break;
      case 'price-high-low':
        this.filteredHotels.sort((a, b) => Number(b.price.replace(/[^0-9]/g, '')) - Number(a.price.replace(/[^0-9]/g, '')));
        break;
      case 'rating':
        this.filteredHotels.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
  }
}
