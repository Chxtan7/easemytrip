import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  // Search state for each tab
  flightSearch = { from: '', to: '', departure: '', return: '' };
  hotelSearch = { city: '', checkin: '', checkout: '' };
  packageSearch = { from: '', to: '', departure: '' };

  searchFlights() {
    // Implement search logic or navigation
    alert(`Searching flights from ${this.flightSearch.from} to ${this.flightSearch.to} on ${this.flightSearch.departure}`);
  }
  searchHotels() {
    alert(`Searching hotels in ${this.hotelSearch.city} from ${this.hotelSearch.checkin} to ${this.hotelSearch.checkout}`);
  }
  searchPackages() {
    alert(`Searching packages from ${this.packageSearch.from} to ${this.packageSearch.to} on ${this.packageSearch.departure}`);
  }
}
