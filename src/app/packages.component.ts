import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar.component';

interface Package {
  title: string;
  image: string;
  destination: string;
  duration: string;
  rating: number;
  ratingCount: number;
  price: string;
  includesAirfare: boolean;
  perPerson: boolean;
  description?: string;
  highlights?: string[];
}

@Component({
  selector: 'app-packages',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  template: `
    <app-navbar></app-navbar>
    <div class="container py-5">
      <h2 class="h2 fw-bold mb-4">Vacation Packages</h2>
      <div class="row">
        <div class="col-12">
          <div class="bg-white rounded shadow p-3 mb-4">
            <h5 class="fw-semibold mb-3">Featured Packages</h5>
            <div class="row g-4 mb-4">
              <div class="col-md-4" *ngFor="let pkg of featuredPackages">
                <div class="card h-100 shadow-sm">
                  <img [src]="pkg.image" [alt]="pkg.title" class="card-img-top" style="height:180px; object-fit:cover;">
                  <div class="card-body">
                    <h5 class="card-title fw-bold">{{pkg.title}}</h5>
                    <div class="mb-2 text-secondary small"><i class="bi bi-geo-alt"></i> {{pkg.destination}}</div>
                    <div class="d-flex justify-content-between mb-2">
                      <span><i class="bi bi-clock"></i> {{pkg.duration}}</span>
                      <span>
                        <ng-container *ngFor="let _ of [].constructor(pkg.rating)"><span class="text-warning">&#9733;</span></ng-container>
                        <span class="text-muted small ms-1">({{pkg.ratingCount}})</span>
                      </span>
                    </div>
                    <div class="d-flex justify-content-between align-items-center pt-2 border-top">
                      <div>
                        <span class="fw-bold text-primary">{{pkg.price}}</span>
                        <span class="small text-muted">{{pkg.perPerson ? 'per person' : 'per package'}}</span>
                      </div>
                      <button class="btn btn-outline-primary btn-sm">View Details</button>
                    </div>
                  </div>
                  <div *ngIf="pkg.includesAirfare" class="card-footer bg-success text-white text-center small">Includes airfare</div>
                </div>
              </div>
            </div>
            <h5 class="fw-semibold mb-3">All Packages</h5>
            <div class="mb-3">
              <span class="me-2 small">Filter:</span>
              <button class="btn btn-outline-secondary btn-sm me-1" (click)="filterPackages('All')">All</button>
              <button class="btn btn-outline-secondary btn-sm me-1" (click)="filterPackages('Beach')">Beach</button>
              <button class="btn btn-outline-secondary btn-sm me-1" (click)="filterPackages('Mountain')">Mountain</button>
              <button class="btn btn-outline-secondary btn-sm" (click)="filterPackages('City')">City</button>
            </div>
            <div class="mb-4">
              <div class="card mb-3" *ngFor="let pkg of filteredPackages">
                <div class="row g-0">
                  <div class="col-md-4">
                    <img [src]="pkg.image" [alt]="pkg.title" class="w-100 h-100 object-fit-cover" style="min-height:180px;">
                  </div>
                  <div class="col-md-8 p-3 d-flex flex-column flex-md-row justify-content-between">
                    <div>
                      <h5 class="fw-bold mb-1">{{pkg.title}}</h5>
                      <div class="mb-2 text-secondary small"><i class="bi bi-geo-alt"></i> {{pkg.destination}}</div>
                      <div class="d-flex gap-3 mb-2">
                        <span><i class="bi bi-clock"></i> {{pkg.duration}}</span>
                        <span>
                          <ng-container *ngFor="let _ of [].constructor(pkg.rating)"><span class="text-warning">&#9733;</span></ng-container>
                          <span class="text-muted small ms-1">({{pkg.ratingCount}})</span>
                        </span>
                        <span><i class="bi bi-people"></i> 2 adults</span>
                      </div>
                      <div class="mb-2 text-secondary small">{{pkg.description}}</div>
                      <div *ngIf="pkg.highlights">
                        <span *ngFor="let highlight of pkg.highlights" class="badge bg-light text-dark border me-1">{{highlight}}</span>
                      </div>
                    </div>
                    <div class="text-end mt-3 mt-md-0">
                      <div class="h4 text-primary">{{pkg.price}}</div>
                      <div class="small text-muted">{{pkg.perPerson ? 'per person' : 'per package'}}</div>
                      <div *ngIf="pkg.includesAirfare" class="text-success small">Includes airfare</div>
                      <button class="btn btn-primary btn-sm mt-2">View Details</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="text-center">
              <button class="btn btn-outline-primary btn-lg">Load More Packages</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class PackagesComponent {
  featuredPackages: Package[] = [
    {
      title: 'Bali Paradise Escape',
      image: 'https://images.unsplash.com/photo-1518877593221-1f28583780b4?auto=format&fit=crop&q=80',
      destination: 'Bali, Indonesia',
      duration: '7 days',
      rating: 5,
      ratingCount: 485,
      price: '$999',
      includesAirfare: true,
      perPerson: true
    },
    {
      title: 'European Adventure',
      image: 'https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?auto=format&fit=crop&q=80',
      destination: 'Multiple Cities, Europe',
      duration: '14 days',
      rating: 4,
      ratingCount: 327,
      price: '$1,999',
      includesAirfare: true,
      perPerson: true
    },
    {
      title: 'Caribbean Cruise',
      image: 'https://images.unsplash.com/photo-1439886183900-e79ec0057170?auto=format&fit=crop&q=80',
      destination: 'Caribbean Islands',
      duration: '10 days',
      rating: 5,
      ratingCount: 521,
      price: '$1,499',
      includesAirfare: false,
      perPerson: true
    }
  ];
  allPackages: Package[] = [
    {
      title: 'Thailand Explorer',
      image: 'https://images.unsplash.com/photo-1469041797191-50ace28483c3?auto=format&fit=crop&q=80',
      destination: 'Bangkok & Phuket, Thailand',
      duration: '10 days',
      rating: 4,
      ratingCount: 412,
      price: '$1,199',
      includesAirfare: true,
      perPerson: true,
      description: 'Experience the best of Thailand with this 10-day adventure through bustling Bangkok and relaxing Phuket beaches.',
      highlights: ['Temple Tours', 'Island Hopping', 'Thai Cooking Class', 'Beachfront Stay']
    },
    {
      title: 'Japan Essentials',
      image: 'https://images.unsplash.com/photo-1493962853295-0fd70327578a?auto=format&fit=crop&q=80',
      destination: 'Tokyo, Kyoto & Osaka, Japan',
      duration: '12 days',
      rating: 5,
      ratingCount: 348,
      price: '$2,499',
      includesAirfare: true,
      perPerson: true,
      description: "Discover the perfect blend of tradition and modernity with this comprehensive tour of Japan's most iconic cities.",
      highlights: ['Cherry Blossom Tours', 'Mt. Fuji Visit', 'Robot Restaurant', 'Bullet Train Experience']
    },
    {
      title: 'Greek Island Hopping',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80',
      destination: 'Athens, Mykonos & Santorini, Greece',
      duration: '9 days',
      rating: 5,
      ratingCount: 587,
      price: '$1,899',
      includesAirfare: true,
      perPerson: true,
      description: "Experience the whitewashed beauty and crystal-clear waters of the Greek islands with this unforgettable Mediterranean adventure.",
      highlights: ['Acropolis Tour', 'Sunset in Santorini', 'Beach Parties', 'Ferry Transportation']
    },
    {
      title: 'African Safari Adventure',
      image: 'https://images.unsplash.com/photo-1452960962994-acf4fd70b632?auto=format&fit=crop&q=80',
      destination: 'Kenya & Tanzania',
      duration: '8 days',
      rating: 5,
      ratingCount: 293,
      price: '$3,299',
      includesAirfare: false,
      perPerson: true,
      description: "Witness the 'Big Five' and the Great Migration on this once-in-a-lifetime safari adventure through East Africa's most stunning wildlife reserves.",
      highlights: ['Serengeti National Park', 'Maasai Mara', 'Luxury Lodges', 'Guided Safari Tours']
    }
  ];
  filteredPackages: Package[] = [];
  filterType: string = 'All';
  sortBy: string = 'recommended';

  constructor() {
    this.filteredPackages = [...this.allPackages];
  }

  filterPackages(type: string) {
    this.filterType = type;
    if (type === 'All') {
      this.filteredPackages = [...this.allPackages];
    } else {
      this.filteredPackages = this.allPackages.filter(pkg => {
        if (type === 'Beach') return pkg.highlights?.some(h => h.toLowerCase().includes('beach'));
        if (type === 'Mountain') return pkg.highlights?.some(h => h.toLowerCase().includes('mountain'));
        if (type === 'City') return pkg.destination.toLowerCase().includes('city') || pkg.highlights?.some(h => h.toLowerCase().includes('city'));
        return true;
      });
    }
    this.applySort();
  }

  applySort() {
    switch (this.sortBy) {
      case 'price-low-high':
        this.filteredPackages.sort((a, b) => Number(a.price.replace(/[^0-9]/g, '')) - Number(b.price.replace(/[^0-9]/g, '')));
        break;
      case 'price-high-low':
        this.filteredPackages.sort((a, b) => Number(b.price.replace(/[^0-9]/g, '')) - Number(a.price.replace(/[^0-9]/g, '')));
        break;
      case 'rating':
        this.filteredPackages.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
  }
}
