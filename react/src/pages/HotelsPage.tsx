
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
import { Star } from "lucide-react";

const HotelsPage = () => {
  const [priceRange, setPriceRange] = useState<number[]>([50, 400]);
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Panel */}
      <section className="bg-primary-600 pt-8 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-6">Search Hotels</h1>
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
                <h3 className="font-medium mb-4">Price Per Night</h3>
                <Slider
                  value={priceRange}
                  min={0}
                  max={1000}
                  step={10}
                  onValueChange={(value) => setPriceRange(value as number[])}
                  className="mb-2"
                />
                <div className="flex justify-between items-center text-sm">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
              
              {/* Star Rating Filter */}
              <div className="mb-8">
                <h3 className="font-medium mb-3">Star Rating</h3>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center space-x-2">
                      <Checkbox id={`star-${rating}`} />
                      <label htmlFor={`star-${rating}`} className="text-sm font-medium flex items-center">
                        {Array(rating).fill(0).map((_, i) => (
                          <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                        ))}
                        {rating < 5 && Array(5-rating).fill(0).map((_, i) => (
                          <Star key={i} size={16} className="text-gray-300" />
                        ))}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Hotel Facilities Filter */}
              <div className="mb-8">
                <h3 className="font-medium mb-3">Hotel Facilities</h3>
                <div className="space-y-2">
                  {["Free WiFi", "Pool", "Spa", "Gym", "Restaurant", "Parking", "Airport Shuttle", "Pet Friendly"].map((facility) => (
                    <div key={facility} className="flex items-center space-x-2">
                      <Checkbox id={facility.toLowerCase().replace(/\s+/g, '-')} />
                      <label htmlFor={facility.toLowerCase().replace(/\s+/g, '-')} className="text-sm font-medium">{facility}</label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Property Type Filter */}
              <div>
                <h3 className="font-medium mb-3">Property Type</h3>
                <div className="space-y-2">
                  {["Hotel", "Resort", "Apartment", "Villa", "Hostel", "Guest House"].map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox id={type.toLowerCase().replace(/\s+/g, '-')} />
                      <label htmlFor={type.toLowerCase().replace(/\s+/g, '-')} className="text-sm font-medium">{type}</label>
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
              <p className="text-gray-600 mb-3 md:mb-0">Showing 157 hotels in New York</p>
              <div className="flex items-center">
                <span className="text-sm mr-2">Sort by:</span>
                <Select defaultValue="recommended">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recommended">Recommended</SelectItem>
                    <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                    <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                    <SelectItem value="distance">Distance from Center</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Hotel Results */}
            <div className="space-y-6">
              {mockHotels.map((hotel, index) => (
                <HotelCard key={index} hotel={hotel} />
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

const HotelCard = ({ hotel }: { hotel: Hotel }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="flex flex-col md:flex-row h-full">
        {/* Hotel Image */}
        <div className="md:w-1/3 h-56 md:h-auto">
          <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
        </div>
        
        {/* Hotel Details */}
        <div className="p-6 flex flex-col md:flex-row justify-between flex-grow">
          <div className="mb-4 md:mb-0">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold mb-1">{hotel.name}</h3>
                <div className="flex items-center mb-2">
                  {Array(hotel.rating).fill(0).map((_, i) => (
                    <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                  ))}
                  {hotel.rating < 5 && Array(5-hotel.rating).fill(0).map((_, i) => (
                    <Star key={i} size={16} className="text-gray-300" />
                  ))}
                  <span className="text-sm text-gray-600 ml-1">({hotel.reviewCount} reviews)</span>
                </div>
              </div>
            </div>
            
            <p className="text-gray-600 text-sm mb-2">{hotel.type} • {hotel.location}</p>
            
            <div className="flex flex-wrap gap-2 mt-3">
              {hotel.features.map((feature, index) => (
                <span 
                  key={index} 
                  className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs font-medium text-gray-800"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
          
          {/* Price and CTA */}
          <div className="flex flex-col items-end justify-between mt-4 md:mt-0">
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">{hotel.price}</p>
              <p className="text-sm text-gray-500">per night</p>
            </div>
            <Button className="mt-4">View Deal</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mockHotels: Hotel[] = [
  {
    name: "Luxury Plaza Hotel",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&q=80",
    rating: 5,
    reviewCount: 1245,
    type: "Luxury Hotel",
    location: "Central Manhattan",
    features: ["Free WiFi", "Spa", "Pool", "Restaurant"],
    price: "$299"
  },
  {
    name: "Downtown Suites",
    image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?auto=format&fit=crop&q=80",
    rating: 4,
    reviewCount: 863,
    type: "Boutique Hotel",
    location: "Downtown",
    features: ["Free WiFi", "Parking", "Breakfast Included"],
    price: "$189"
  },
  {
    name: "Skyline View Apartments",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&q=80",
    rating: 4,
    reviewCount: 521,
    type: "Apartment",
    location: "Upper East Side",
    features: ["Kitchen", "Washing Machine", "City View"],
    price: "$159"
  },
  {
    name: "Metropolitan Inn",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80",
    rating: 3,
    reviewCount: 375,
    type: "Budget Hotel",
    location: "Queens",
    features: ["Free WiFi", "24/7 Reception"],
    price: "$119"
  }
];

export default HotelsPage;
