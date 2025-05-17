import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar.component';
import { RouterModule } from '@angular/router';

interface Flight {
  airline: string;
  airlineLogo: string;
  departureCity: string;
  departureCode: string;
  departureTime: string;
  arrivalCity: string;
  arrivalCode: string;
  arrivalTime: string;
  duration: string;
  stops: number;
  price: string;
}

@Component({
  selector: 'app-flights',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, RouterModule],
  template: `
    <app-navbar></app-navbar>
    <div class="container py-5">
      <h2 class="h2 fw-bold mb-4">Search Flights</h2>
      <div class="row">
        <div class="col-lg-3 mb-4">
          <div class="bg-white rounded shadow p-3 mb-4">
            <h5 class="fw-semibold mb-3">Filters</h5>
            <div class="mb-4">
              <label class="form-label">Price Range</label>
              <input type="range" class="form-range" min="100" max="1000" [(ngModel)]="priceMin" (change)="applyFilters()">
              <input type="range" class="form-range" min="100" max="1000" [(ngModel)]="priceMax" (change)="applyFilters()">
              <div class="d-flex justify-content-between small">
                <span>&dollar;{{ priceMin }}</span>
                <span>&dollar;{{ priceMax }}</span>
              </div>
            </div>
            <div class="mb-4">
              <label class="form-label">Stops</label>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="direct" [(ngModel)]="stopsFilter.direct" (change)="applyFilters()">
                <label class="form-check-label" for="direct">Direct</label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="1stop" [(ngModel)]="stopsFilter.oneStop" (change)="applyFilters()">
                <label class="form-check-label" for="1stop">1 Stop</label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="2stops" [(ngModel)]="stopsFilter.twoPlus" (change)="applyFilters()">
                <label class="form-check-label" for="2stops">2+ Stops</label>
              </div>
            </div>
            <div class="mb-4">
              <label class="form-label">Airlines</label>
              <div *ngFor="let airline of airlines" class="form-check">
                <input class="form-check-input" type="checkbox" [id]="airline" [(ngModel)]="airlinesFilter[airline]" (change)="applyFilters()">
                <label class="form-check-label" [for]="airline">{{airline}}</label>
              </div>
            </div>
            <div>
              <label class="form-label">Departure Time</label>
              <div *ngFor="let time of departureTimes" class="form-check">
                <input class="form-check-input" type="checkbox" [id]="time" [(ngModel)]="departureTimeFilter[time]" (change)="applyFilters()">
                <label class="form-check-label" [for]="time">{{time}}</label>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-9">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <span class="text-secondary">Showing {{filteredFlights.length}} flight results</span>
            <div class="d-flex align-items-center">
              <span class="me-2 small">Sort by:</span>
              <select class="form-select form-select-sm w-auto" [(ngModel)]="sortBy" (change)="applySort()">
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="duration">Duration</option>
                <option value="departure">Departure Time</option>
                <option value="arrival">Arrival Time</option>
              </select>
            </div>
          </div>
          <div *ngFor="let flight of pagedFlights()" class="flight-card bg-white rounded shadow-lg p-4 mb-4 animate__animated animate__fadeInUp animate__faster position-relative overflow-hidden">
            <div class="row align-items-center">
              <div class="col-md-2 d-flex align-items-center gap-2 justify-content-center">
                <div class="flight-logo-bg d-flex align-items-center justify-content-center rounded-circle shadow-sm me-2">
                  <img [src]="flight.airlineLogo" [alt]="flight.airline" width="48" height="48" style="object-fit:contain;" />
                </div>
                <span class="fw-medium">{{flight.airline}}</span>
              </div>
              <div class="col-md-3 text-center">
                <div class="fw-bold fs-4 text-primary">{{flight.departureTime}}</div>
                <div class="small text-secondary">{{flight.departureCode}}</div>
              </div>
              <div class="col-md-2 text-center">
                <div class="small text-secondary">{{flight.duration}}</div>
                <div class="small text-secondary">{{flight.stops === 0 ? 'Direct' : (flight.stops + ' Stop' + (flight.stops > 1 ? 's' : ''))}}</div>
              </div>
              <div class="col-md-3 text-center">
                <div class="fw-bold fs-4 text-primary">{{flight.arrivalTime}}</div>
                <div class="small text-secondary">{{flight.arrivalCode}}</div>
              </div>
              <div class="col-md-2 text-end">
                <div class="h4 text-success fw-bold">{{flight.price}}</div>
                <a [routerLink]="['/flights', flight.departureCode, flight.arrivalCode]" class="btn btn-gradient btn-sm mt-2 w-100 animate__animated animate__pulse animate__infinite">View Details</a>
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
export class FlightsComponent {
  priceMin = 100;
  priceMax = 1000;
  sortBy = 'price-low-high';
  airlines = [
    'Delta Air Lines',
    'American Airlines',
    'United Airlines',
    'Emirates',
    'Qatar Airways'
  ];
  departureTimes = [
    'Morning (6AM - 12PM)',
    'Afternoon (12PM - 6PM)',
    'Evening (6PM - 12AM)',
    'Night (12AM - 6AM)'
  ];
  stopsFilter = { direct: false, oneStop: false, twoPlus: false };
  airlinesFilter: { [key: string]: boolean } = {};
  departureTimeFilter: { [key: string]: boolean } = {};
  flights: Flight[] = [
    {
      airline: 'Delta',
      airlineLogo: 'https://img.freepik.com/free-vector/airplane-cartoon-sticker-white-background_1308-76926.jpg?semt=ais_hybrid&w=740',
      departureCity: 'New York',
      departureCode: 'JFK',
      departureTime: '08:00',
      arrivalCity: 'Los Angeles',
      arrivalCode: 'LAX',
      arrivalTime: '11:00',
      duration: '6h',
      stops: 0,
      price: '$350'
    },
    {
      airline: 'United',
      airlineLogo: 'https://www.svgrepo.com/show/153434/airplane.svg',
      departureCity: 'Chicago',
      departureCode: 'ORD',
      departureTime: '09:30',
      arrivalCity: 'San Francisco',
      arrivalCode: 'SFO',
      arrivalTime: '12:30',
      duration: '5h',
      stops: 1,
      price: '$280'
    },
    {
      airline: 'Emirates',
      airlineLogo: 'https://img.freepik.com/free-vector/airplane-cartoon-sticker-white-background_1308-76926.jpg?semt=ais_hybrid&w=740',
      departureCity: 'Dubai',
      departureCode: 'DXB',
      departureTime: '09:00 AM',
      arrivalCity: 'London',
      arrivalCode: 'LHR',
      arrivalTime: '01:30 PM',
      duration: '7h 30m',
      stops: 0,
      price: '$599'
    },
    {
      airline: 'Qatar Airways',
      airlineLogo: 'https://www.svgrepo.com/show/153434/airplane.svg',
      departureCity: 'Doha',
      departureCode: 'DOH',
      departureTime: '11:00 AM',
      arrivalCity: 'Paris',
      arrivalCode: 'CDG',
      arrivalTime: '04:45 PM',
      duration: '7h 45m',
      stops: 1,
      price: '$649'
    },
    {
      airline: 'Lufthansa',
      airlineLogo: 'https://img.freepik.com/free-vector/airplane-cartoon-sticker-white-background_1308-76926.jpg?semt=ais_hybrid&w=740',
      departureCity: 'Frankfurt',
      departureCode: 'FRA',
      departureTime: '07:15 AM',
      arrivalCity: 'Rome',
      arrivalCode: 'FCO',
      arrivalTime: '09:30 AM',
      duration: '2h 15m',
      stops: 0,
      price: '$199'
    },
    {
      airline: 'Air France',
      airlineLogo: 'https://www.svgrepo.com/show/153434/airplane.svg',
      departureCity: 'Paris',
      departureCode: 'CDG',
      departureTime: '03:00 PM',
      arrivalCity: 'New York',
      arrivalCode: 'JFK',
      arrivalTime: '05:45 PM',
      duration: '8h 45m',
      stops: 1,
      price: '$799'
    },
    {
      airline: 'Southwest',
      airlineLogo: 'https://img.freepik.com/free-vector/airplane-cartoon-sticker-white-background_1308-76926.jpg?semt=ais_hybrid&w=740',
      departureCity: 'Houston',
      departureCode: 'HOU',
      departureTime: '12:00',
      arrivalCity: 'Denver',
      arrivalCode: 'DEN',
      arrivalTime: '14:30',
      duration: '2h 30m',
      stops: 0,
      price: '$210'
    },
    {
      airline: 'Spirit',
      airlineLogo: 'https://www.svgrepo.com/show/153434/airplane.svg',
      departureCity: 'Las Vegas',
      departureCode: 'LAS',
      departureTime: '15:00',
      arrivalCity: 'Seattle',
      arrivalCode: 'SEA',
      arrivalTime: '18:30',
      duration: '3h 30m',
      stops: 1,
      price: '$170'
    },
    {
      airline: 'Alaska Airlines',
      airlineLogo: 'https://img.freepik.com/free-vector/airplane-cartoon-sticker-white-background_1308-76926.jpg?semt=ais_hybrid&w=740',
      departureCity: 'San Diego',
      departureCode: 'SAN',
      departureTime: '11:00',
      arrivalCity: 'Portland',
      arrivalCode: 'PDX',
      arrivalTime: '13:00',
      duration: '2h',
      stops: 0,
      price: '$190'
    },
    {
      airline: 'Frontier',
      airlineLogo: 'https://www.svgrepo.com/show/153434/airplane.svg',
      departureCity: 'Atlanta',
      departureCode: 'ATL',
      departureTime: '16:00',
      arrivalCity: 'Charlotte',
      arrivalCode: 'CLT',
      arrivalTime: '17:30',
      duration: '1h 30m',
      stops: 0,
      price: '$120'
    }
  ];
  filteredFlights: Flight[] = [];
  pageSize = 4;
  currentPage = 1;

  constructor() {
    this.airlines.forEach(a => this.airlinesFilter[a] = false);
    this.departureTimes.forEach(t => this.departureTimeFilter[t] = false);
    this.filteredFlights = [...this.flights];
  }

  get totalPages() {
    return Math.ceil(this.filteredFlights.length / this.pageSize) || 1;
  }

  pagedFlights() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredFlights.slice(start, start + this.pageSize);
  }

  totalPagesArray() {
    return Array(this.totalPages).fill(0);
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  applyFilters() {
    this.filteredFlights = this.flights.filter(flight => {
      // Price filter
      const price = Number(flight.price.replace(/[^0-9]/g, ''));
      if (price < this.priceMin || price > this.priceMax) return false;
      // Stops filter
      if (this.stopsFilter.direct && flight.stops !== 0) return false;
      if (this.stopsFilter.oneStop && flight.stops !== 1) return false;
      if (this.stopsFilter.twoPlus && flight.stops < 2) return false;
      // Airlines filter
      const selectedAirlines = Object.keys(this.airlinesFilter).filter(a => this.airlinesFilter[a]);
      if (selectedAirlines.length && !selectedAirlines.includes(flight.airline)) return false;
      // Departure time filter (simple demo logic)
      const depHour = this.parseHour(flight.departureTime);
      if (this.departureTimeFilter['Morning (6AM - 12PM)'] && (depHour < 6 || depHour >= 12)) return false;
      if (this.departureTimeFilter['Afternoon (12PM - 6PM)'] && (depHour < 12 || depHour >= 18)) return false;
      if (this.departureTimeFilter['Evening (6PM - 12AM)'] && (depHour < 18 || depHour >= 24)) return false;
      if (this.departureTimeFilter['Night (12AM - 6AM)'] && (depHour >= 6 && depHour < 24)) return false;
      return true;
    });
    this.currentPage = 1;
    this.applySort();
  }

  applySort() {
    this.filteredFlights.sort((a, b) => {
      const priceA = Number(a.price.replace(/[^0-9]/g, ''));
      const priceB = Number(b.price.replace(/[^0-9]/g, ''));
      switch (this.sortBy) {
        case 'price-low-high':
          return priceA - priceB;
        case 'price-high-low':
          return priceB - priceA;
        case 'duration':
          return this.parseDuration(a.duration) - this.parseDuration(b.duration);
        case 'departure':
          return this.parseHour(a.departureTime) - this.parseHour(b.departureTime);
        case 'arrival':
          return this.parseHour(a.arrivalTime) - this.parseHour(b.arrivalTime);
        default:
          return 0;
      }
    });
  }

  parseHour(time: string): number {
    // Expects format like '08:30 AM' or '02:20 PM'
    const [t, ampm] = time.split(' ');
    let [h, m] = t.split(':').map(Number);
    if (ampm === 'PM' && h !== 12) h += 12;
    if (ampm === 'AM' && h === 12) h = 0;
    return h;
  }

  parseDuration(duration: string): number {
    // Expects format like '6h 15m'
    const match = duration.match(/(\d+)h\s*(\d+)m/);
    if (!match) return 0;
    return Number(match[1]) * 60 + Number(match[2]);
  }
}
