
import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FlightsPage = () => {
  const [priceRange, setPriceRange] = useState<number[]>([100, 1000]);
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Panel */}
      <section className="bg-primary-600 pt-8 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-6">Search Flights</h1>
          <SearchBar />
        </div>
      </section>
      
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6">Filters</h2>
              
              {/* Price Filter */}
              <div className="mb-8">
                <h3 className="font-medium mb-4">Price Range</h3>
                <Slider
                  value={priceRange}
                  min={0}
                  max={2000}
                  step={10}
                  onValueChange={(value) => setPriceRange(value as number[])}
                  className="mb-2"
                />
                <div className="flex justify-between items-center text-sm">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
              
              {/* Stops Filter */}
              <div className="mb-8">
                <h3 className="font-medium mb-3">Stops</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="direct" />
                    <label htmlFor="direct" className="text-sm font-medium">Direct</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="1-stop" />
                    <label htmlFor="1-stop" className="text-sm font-medium">1 Stop</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="2-stops" />
                    <label htmlFor="2-stops" className="text-sm font-medium">2+ Stops</label>
                  </div>
                </div>
              </div>
              
              {/* Airlines Filter */}
              <div className="mb-8">
                <h3 className="font-medium mb-3">Airlines</h3>
                <div className="space-y-2">
                  {["Delta Air Lines", "American Airlines", "United Airlines", "Emirates", "Qatar Airways"].map((airline) => (
                    <div key={airline} className="flex items-center space-x-2">
                      <Checkbox id={airline.toLowerCase().replace(/\s+/g, '-')} />
                      <label htmlFor={airline.toLowerCase().replace(/\s+/g, '-')} className="text-sm font-medium">{airline}</label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Departure Time Filter */}
              <div>
                <h3 className="font-medium mb-3">Departure Time</h3>
                <div className="space-y-2">
                  {["Morning (6AM - 12PM)", "Afternoon (12PM - 6PM)", "Evening (6PM - 12AM)", "Night (12AM - 6AM)"].map((time) => (
                    <div key={time} className="flex items-center space-x-2">
                      <Checkbox id={time.toLowerCase().replace(/\s+/g, '-')} />
                      <label htmlFor={time.toLowerCase().replace(/\s+/g, '-')} className="text-sm font-medium">{time}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Results */}
          <div className="lg:col-span-3">
            {/* Sorting and Results Count */}
            <div className="flex flex-wrap justify-between items-center mb-6">
              <p className="text-gray-600 mb-3 md:mb-0">Showing 243 flight results</p>
              <div className="flex items-center">
                <span className="text-sm mr-2">Sort by:</span>
                <Select defaultValue="price-low-high">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                    <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                    <SelectItem value="duration">Duration</SelectItem>
                    <SelectItem value="departure">Departure Time</SelectItem>
                    <SelectItem value="arrival">Arrival Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Flight Results */}
            <div className="space-y-4">
              {mockFlights.map((flight, index) => (
                <FlightCard key={index} flight={flight} />
              ))}
            </div>
            
            {/* Pagination */}
            <div className="flex justify-center mt-10">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>Previous</Button>
                <Button variant="outline" size="sm" className="bg-primary text-white">1</Button>
                <Button variant="outline" size="sm">2</Button>
                <Button variant="outline" size="sm">3</Button>
                <Button variant="outline" size="sm">Next</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

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

const FlightCard = ({ flight }: { flight: Flight }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        {/* Airline Info */}
        <div className="flex items-center gap-3">
          <img src={flight.airlineLogo} alt={flight.airline} className="w-8 h-8 object-contain" />
          <span className="font-medium">{flight.airline}</span>
        </div>
        
        {/* Flight Details */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
          {/* Departure */}
          <div className="text-center">
            <p className="text-lg font-bold">{flight.departureTime}</p>
            <p className="text-sm">{flight.departureCode}</p>
          </div>
          
          {/* Duration/Stops */}
          <div className="flex flex-col items-center">
            <p className="text-xs text-gray-500">{flight.duration}</p>
            <div className="w-32 h-px bg-gray-300 my-1 relative">
              {flight.stops > 0 && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gray-500 rounded-full"></div>
              )}
            </div>
            <p className="text-xs text-gray-500">
              {flight.stops === 0 ? "Direct" : `${flight.stops} Stop${flight.stops > 1 ? "s" : ""}`}
            </p>
          </div>
          
          {/* Arrival */}
          <div className="text-center">
            <p className="text-lg font-bold">{flight.arrivalTime}</p>
            <p className="text-sm">{flight.arrivalCode}</p>
          </div>
        </div>
        
        {/* Price and CTA */}
        <div className="flex flex-col items-end">
          <p className="text-2xl font-bold text-primary">{flight.price}</p>
          <Button className="mt-2" size="sm">Select</Button>
        </div>
      </div>
    </div>
  );
};

const mockFlights: Flight[] = [
  {
    airline: "Delta Airlines",
    airlineLogo: "https://via.placeholder.com/50",
    departureCity: "New York",
    departureCode: "JFK",
    departureTime: "08:30 AM",
    arrivalCity: "Los Angeles",
    arrivalCode: "LAX",
    arrivalTime: "11:45 AM",
    duration: "6h 15m",
    stops: 0,
    price: "$349"
  },
  {
    airline: "American Airlines",
    airlineLogo: "https://via.placeholder.com/50",
    departureCity: "New York",
    departureCode: "JFK",
    departureTime: "10:15 AM",
    arrivalCity: "Los Angeles",
    arrivalCode: "LAX",
    arrivalTime: "02:20 PM",
    duration: "7h 05m",
    stops: 1,
    price: "$299"
  },
  {
    airline: "United Airlines",
    airlineLogo: "https://via.placeholder.com/50",
    departureCity: "New York",
    departureCode: "JFK",
    departureTime: "01:30 PM",
    arrivalCity: "Los Angeles",
    arrivalCode: "LAX",
    arrivalTime: "05:15 PM",
    duration: "6h 45m",
    stops: 0,
    price: "$379"
  },
  {
    airline: "JetBlue",
    airlineLogo: "https://via.placeholder.com/50",
    departureCity: "New York",
    departureCode: "JFK",
    departureTime: "04:45 PM",
    arrivalCity: "Los Angeles",
    arrivalCode: "LAX",
    arrivalTime: "09:10 PM",
    duration: "7h 25m",
    stops: 1,
    price: "$289"
  }
];

export default FlightsPage;
