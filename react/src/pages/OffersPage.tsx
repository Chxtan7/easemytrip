
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, ArrowRight, Tag } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const OffersPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <section className="relative h-[300px] flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80')`
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl font-bold mb-4">Special Offers & Deals</h1>
          <p className="text-xl max-w-3xl mx-auto">Discover our best promotions and save big on your next trip</p>
        </div>
      </section>
      
      {/* Offer Categories */}
      <div className="container mx-auto px-4 py-10">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-4 mb-10">
            <TabsTrigger value="all">All Offers</TabsTrigger>
            <TabsTrigger value="flights">Flight Deals</TabsTrigger>
            <TabsTrigger value="hotels">Hotel Deals</TabsTrigger>
            <TabsTrigger value="packages">Package Deals</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <OfferGrid offers={[...flightOffers, ...hotelOffers, ...packageOffers]} />
          </TabsContent>
          
          <TabsContent value="flights">
            <OfferGrid offers={flightOffers} />
          </TabsContent>
          
          <TabsContent value="hotels">
            <OfferGrid offers={hotelOffers} />
          </TabsContent>
          
          <TabsContent value="packages">
            <OfferGrid offers={packageOffers} />
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Newsletter Section */}
      <section className="bg-primary-50 py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Get the Latest Deals Straight to Your Inbox</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter and be the first to know about exclusive offers, flash sales, and travel inspirations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button>Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

interface Offer {
  id: string;
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

const OfferCard = ({ offer }: { offer: Offer }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
      {/* Image Section */}
      <div className="relative h-48">
        <img 
          src={offer.image} 
          alt={offer.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 right-0 bg-secondary text-white px-3 py-1 rounded-bl-lg font-medium">
          {offer.discount}
        </div>
      </div>
      
      {/* Content Section */}
      <div className="p-5">
        <div className="flex items-center mb-3">
          <span className="px-2 py-1 bg-primary-50 text-primary text-xs font-medium rounded">
            {offer.type.charAt(0).toUpperCase() + offer.type.slice(1)} Deal
          </span>
          {offer.promoCode && (
            <span className="ml-2 px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded flex items-center">
              <Tag size={12} className="mr-1" />
              {offer.promoCode}
            </span>
          )}
        </div>
        
        <h3 className="font-bold text-lg mb-2">{offer.title}</h3>
        
        {offer.destination && (
          <div className="flex items-center text-gray-600 mb-1">
            <MapPin size={16} className="mr-1" />
            <span className="text-sm">{offer.destination}</span>
          </div>
        )}
        
        {offer.duration && (
          <div className="flex items-center text-gray-600 mb-1">
            <Clock size={16} className="mr-1" />
            <span className="text-sm">{offer.duration}</span>
          </div>
        )}
        
        <div className="flex items-center text-gray-600 mb-3">
          <Calendar size={16} className="mr-1" />
          <span className="text-sm">Valid until {offer.validUntil}</span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4">{offer.description}</p>
        
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div>
            <p className="text-xl font-bold text-primary">{offer.price}</p>
            {offer.oldPrice && (
              <p className="text-sm text-gray-500 line-through">{offer.oldPrice}</p>
            )}
          </div>
          <Button className="flex items-center gap-1">
            Book Now <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

const OfferGrid = ({ offers }: { offers: Offer[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {offers.map((offer) => (
        <OfferCard key={offer.id} offer={offer} />
      ))}
    </div>
  );
};

const flightOffers: Offer[] = [
  {
    id: "f1",
    title: "Fly to Europe for Less",
    type: "flight",
    image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a?auto=format&fit=crop&q=80",
    discount: "Up to 30% OFF",
    destination: "Multiple European Destinations",
    validUntil: "Dec 31, 2025",
    price: "$499",
    oldPrice: "$699",
    promoCode: "EUROPE30",
    description: "Explore Europe with our special discounted fares to multiple destinations. Book by December for travel through March 2026."
  },
  {
    id: "f2",
    title: "Summer Flight Sale",
    type: "flight",
    image: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?auto=format&fit=crop&q=80",
    discount: "25% OFF",
    destination: "Domestic Routes",
    validUntil: "Aug 31, 2025",
    price: "$149",
    oldPrice: "$199",
    promoCode: "SUMMER25",
    description: "Enjoy discounted fares on all domestic routes this summer. Perfect for your family vacation or weekend getaways."
  }
];

const hotelOffers: Offer[] = [
  {
    id: "h1",
    title: "5-Star Luxury Resort",
    type: "hotel",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&q=80",
    discount: "40% OFF",
    destination: "Maldives",
    duration: "7 nights",
    validUntil: "Oct 15, 2025",
    price: "$1,199",
    oldPrice: "$1,999",
    description: "Enjoy a luxurious stay at a 5-star overwater villa with private pool. Includes breakfast and dinner daily."
  },
  {
    id: "h2",
    title: "City Break Special",
    type: "hotel",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&q=80",
    discount: "20% OFF",
    destination: "New York, Paris, London",
    duration: "3-5 nights",
    validUntil: "Nov 30, 2025",
    price: "$299",
    oldPrice: "$379",
    promoCode: "CITY20",
    description: "Book your urban escape and enjoy complimentary breakfast and late check-out at select city center hotels."
  }
];

const packageOffers: Offer[] = [
  {
    id: "p1",
    title: "All-Inclusive Caribbean",
    type: "package",
    image: "https://images.unsplash.com/photo-1439886183900-e79ec0057170?auto=format&fit=crop&q=80",
    discount: "35% OFF",
    destination: "Cancun, Mexico",
    duration: "5 nights",
    validUntil: "Sep 30, 2025",
    price: "$899",
    oldPrice: "$1,399",
    promoCode: "BEACH35",
    description: "All-inclusive beach resort package with flights, transfers, meals, and drinks included. Perfect for couples and families."
  },
  {
    id: "p2",
    title: "Southeast Asia Tour",
    type: "package",
    image: "https://images.unsplash.com/photo-1469041797191-50ace28483c3?auto=format&fit=crop&q=80",
    discount: "25% OFF",
    destination: "Thailand, Vietnam & Cambodia",
    duration: "12 nights",
    validUntil: "Dec 15, 2025",
    price: "$1,699",
    oldPrice: "$2,299",
    description: "Experience the beauty and culture of Southeast Asia with this comprehensive tour package including flights, hotels, and guided tours."
  }
];

export default OffersPage;
