
import HomeHero from "@/components/HomeHero";
import SearchBar from "@/components/SearchBar";
import OfferCard from "@/components/OfferCard";
import DestinationCard from "@/components/DestinationCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, ShieldCheck, HeadphonesIcon } from "lucide-react";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <HomeHero />
      
      {/* Search Container */}
      <div className="container mx-auto px-4 mb-16">
        <SearchBar />
      </div>
      
      {/* Offers Section */}
      <section className="container mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold mb-2">Special Offers</h2>
        <p className="text-gray-600 mb-8">Incredible deals for your next adventure</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer, index) => (
            <OfferCard key={index} {...offer} />
          ))}
        </div>
      </section>
      
      {/* Popular Destinations */}
      <section className="container mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold mb-2">Popular Destinations</h2>
        <p className="text-gray-600 mb-8">Explore our most sought-after vacation spots</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((destination, index) => (
            <DestinationCard key={index} {...destination} />
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <Button variant="outline" size="lg" className="gap-2">
            View All Destinations
            <ArrowRight size={16} />
          </Button>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="bg-gray-50 py-16 mt-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Book with TripEase</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="text-primary w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Best Value Deals</h3>
              <p className="text-gray-600">Find the best deals across flights, hotels, and vacation packages.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="text-primary w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Booking</h3>
              <p className="text-gray-600">Your security is our priority with industry-standard encryption for all transactions.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <HeadphonesIcon className="text-primary w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Our customer support team is available around the clock to assist you.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-primary-50 rounded-lg p-8 md:p-12">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-gray-700 mb-6">Stay updated with the latest travel deals and offers</p>
            
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow h-12 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button className="h-12 px-6">Subscribe</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const offers = [
  {
    title: "Summer Beach Getaways",
    description: "Book now and save on beach resorts worldwide",
    imageUrl: "https://images.unsplash.com/photo-1452960962994-acf4fd70b632?auto=format&fit=crop&q=80",
    discount: "Up to 30% OFF",
    link: "/offers/beach-getaways"
  },
  {
    title: "City Break Deals",
    description: "Explore the world's most exciting cities for less",
    imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80",
    discount: "Up to 25% OFF",
    link: "/offers/city-breaks"
  },
  {
    title: "Flight Sale",
    description: "Grab the best deals on domestic and international flights",
    imageUrl: "https://images.unsplash.com/photo-1493962853295-0fd70327578a?auto=format&fit=crop&q=80",
    discount: "Up to 40% OFF",
    link: "/offers/flight-sale"
  }
];

const destinations = [
  {
    city: "Paris",
    country: "France",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80",
    price: "$499",
    link: "/destinations/paris"
  },
  {
    city: "Bali",
    country: "Indonesia",
    imageUrl: "https://images.unsplash.com/photo-1518877593221-1f28583780b4?auto=format&fit=crop&q=80",
    price: "$799",
    link: "/destinations/bali"
  },
  {
    city: "New York",
    country: "United States",
    imageUrl: "https://images.unsplash.com/photo-1439886183900-e79ec0057170?auto=format&fit=crop&q=80",
    price: "$599",
    link: "/destinations/new-york"
  },
  {
    city: "Tokyo",
    country: "Japan",
    imageUrl: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?auto=format&fit=crop&q=80",
    price: "$899",
    link: "/destinations/tokyo"
  }
];

export default HomePage;
