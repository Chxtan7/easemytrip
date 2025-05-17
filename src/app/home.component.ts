import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FooterComponent } from './footer.component';
import { NavbarComponent } from './navbar.component';
import { OfferCardComponent } from './offer-card.component';
import { DestinationCardComponent } from './destination-card.component';
import { HomeHeroComponent } from './home-hero.component';
import { SearchBarComponent } from './search-bar.component';
import { AlertComponent } from './alert.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FooterComponent, NavbarComponent, OfferCardComponent, DestinationCardComponent, HomeHeroComponent, SearchBarComponent, AlertComponent],
  templateUrl: './home.component.html',
  styleUrls: []
})
export class HomeComponent {
  offers = [
    {
      title: 'Summer Beach Getaways',
      description: 'Book now and save on beach resorts worldwide',
      imageUrl: 'https://images.unsplash.com/photo-1452960962994-acf4fd70b632?auto=format&fit=crop&q=80',
      discount: 'Up to 30% OFF',
      link: '/offers/beach-getaways'
    },
    {
      title: 'City Break Deals',
      description: 'Explore the world\'s most exciting cities for less',
      imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80',
      discount: 'Up to 25% OFF',
      link: '/offers/city-breaks'
    },
    {
      title: 'Flight Sale',
      description: 'Grab the best deals on domestic and international flights',
      imageUrl: 'https://images.unsplash.com/photo-1493962853295-0fd70327578a?auto=format&fit=crop&q=80',
      discount: 'Up to 40% OFF',
      link: '/offers/flight-sale'
    }
  ];

  destinations = [
    {
      city: 'Paris',
      country: 'France',
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80',
      price: '$499',
      link: '/destinations/paris'
    },
    {
      city: 'Bali',
      country: 'Indonesia',
      imageUrl: 'https://images.unsplash.com/photo-1518877593221-1f28583780b4?auto=format&fit=crop&q=80',
      price: '$799',
      link: '/destinations/bali'
    },
    {
      city: 'New York',
      country: 'United States',
      imageUrl: 'https://images.unsplash.com/photo-1439886183900-e79ec0057170?auto=format&fit=crop&q=80',
      price: '$599',
      link: '/destinations/new-york'
    },
    {
      city: 'Tokyo',
      country: 'Japan',
      imageUrl: 'https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?auto=format&fit=crop&q=80',
      price: '$899',
      link: '/destinations/tokyo'
    }
  ];

  newsletterSuccess: string | null = null;
  newsletterError: string | null = null;

  constructor(private router: Router) {}

  subscribeNewsletter(email: string) {
    this.newsletterSuccess = null;
    this.newsletterError = null;
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      this.newsletterError = 'Please enter a valid email address.';
      return;
    }
    // Simulate async API call
    setTimeout(() => {
      this.newsletterSuccess = 'You have been subscribed to our newsletter!';
    }, 800);
  }

  viewAllDestinations() {
    this.router.navigate(['/destinations']);
  }

  goToLogin() {
    window.location.href = '/login';
  }
  goToSignup() {
    window.location.href = '/signup';
  }
}
