
import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Calendar, Clock, Star, Users } from "lucide-react";

const PackagesPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Panel */}
      <section className="bg-primary-600 pt-8 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-6">Vacation Packages</h1>
          <SearchBar />
        </div>
      </section>
      
      <div className="container mx-auto px-4 py-10">
        {/* Featured Packages */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Featured Packages</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPackages.map((pkg, index) => (
              <FeaturedPackageCard key={index} package={pkg} />
            ))}
          </div>
        </section>
        
        {/* All Packages */}
        <section>
          <div className="flex flex-wrap items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">All Packages</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm">Filter:</span>
              <Button variant="outline" size="sm">All</Button>
              <Button variant="outline" size="sm">Beach</Button>
              <Button variant="outline" size="sm">Mountain</Button>
              <Button variant="outline" size="sm">City</Button>
            </div>
          </div>
          
          <div className="space-y-6">
            {allPackages.map((pkg, index) => (
              <PackageCard key={index} package={pkg} />
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <Button variant="outline" size="lg">
              Load More Packages
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

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

const FeaturedPackageCard = ({ package: pkg }: { package: Package }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group">
      <div className="relative h-48">
        <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute top-0 right-0 bg-secondary text-white px-3 py-1 rounded-bl-lg font-medium text-sm">
          Featured
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{pkg.title}</h3>
        
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <MapPin size={14} className="mr-1" />
          {pkg.destination}
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <Clock size={14} className="mr-1 text-gray-500" />
            <span className="text-sm text-gray-600">{pkg.duration}</span>
          </div>
          <div className="flex items-center">
            {Array(pkg.rating).fill(0).map((_, i) => (
              <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
            ))}
            <span className="text-xs text-gray-500 ml-1">({pkg.ratingCount})</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div>
            <p className="text-lg font-bold text-primary">{pkg.price}</p>
            <p className="text-xs text-gray-500">
              {pkg.perPerson ? 'per person' : 'per package'}
            </p>
          </div>
          <Button size="sm">View Details</Button>
        </div>
      </div>
    </div>
  );
};

const PackageCard = ({ package: pkg }: { package: Package }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="flex flex-col md:flex-row h-full">
        {/* Package Image */}
        <div className="md:w-1/3 h-56 md:h-auto">
          <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
        </div>
        
        {/* Package Details */}
        <div className="p-6 flex flex-col md:flex-row justify-between flex-grow">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold mb-2">{pkg.title}</h3>
            <div className="flex items-center mb-3">
              <MapPin size={16} className="text-gray-500 mr-1" />
              <span className="text-gray-600">{pkg.destination}</span>
            </div>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center">
                <Clock size={16} className="text-gray-500 mr-1" />
                <span className="text-gray-600">{pkg.duration}</span>
              </div>
              <div className="flex items-center">
                {Array(pkg.rating).fill(0).map((_, i) => (
                  <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-sm text-gray-500 ml-1">({pkg.ratingCount})</span>
              </div>
              <div className="flex items-center">
                <Users size={16} className="text-gray-500 mr-1" />
                <span className="text-gray-600">2 adults</span>
              </div>
            </div>
            
            <p className="text-gray-600 text-sm mb-4">{pkg.description}</p>
            
            {pkg.highlights && (
              <div className="space-x-2">
                {pkg.highlights.map((highlight, index) => (
                  <span 
                    key={index} 
                    className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs font-medium text-gray-800 mb-1"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            )}
          </div>
          
          {/* Price and CTA */}
          <div className="flex flex-col items-end justify-between">
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">{pkg.price}</p>
              <p className="text-sm text-gray-500">
                {pkg.perPerson ? 'per person' : 'per package'}
              </p>
              {pkg.includesAirfare && (
                <p className="text-xs text-green-600 font-medium">Includes airfare</p>
              )}
            </div>
            <Button className="mt-4 flex items-center">
              View Details <ArrowRight size={16} className="ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const featuredPackages: Package[] = [
  {
    title: "Bali Paradise Escape",
    image: "https://images.unsplash.com/photo-1518877593221-1f28583780b4?auto=format&fit=crop&q=80",
    destination: "Bali, Indonesia",
    duration: "7 days",
    rating: 5,
    ratingCount: 485,
    price: "$999",
    includesAirfare: true,
    perPerson: true
  },
  {
    title: "European Adventure",
    image: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?auto=format&fit=crop&q=80",
    destination: "Multiple Cities, Europe",
    duration: "14 days",
    rating: 4,
    ratingCount: 327,
    price: "$1,999",
    includesAirfare: true,
    perPerson: true
  },
  {
    title: "Caribbean Cruise",
    image: "https://images.unsplash.com/photo-1439886183900-e79ec0057170?auto=format&fit=crop&q=80",
    destination: "Caribbean Islands",
    duration: "10 days",
    rating: 5,
    ratingCount: 521,
    price: "$1,499",
    includesAirfare: false,
    perPerson: true
  }
];

const allPackages: Package[] = [
  {
    title: "Thailand Explorer",
    image: "https://images.unsplash.com/photo-1469041797191-50ace28483c3?auto=format&fit=crop&q=80",
    destination: "Bangkok & Phuket, Thailand",
    duration: "10 days",
    rating: 4,
    ratingCount: 412,
    price: "$1,199",
    includesAirfare: true,
    perPerson: true,
    description: "Experience the best of Thailand with this 10-day adventure through bustling Bangkok and relaxing Phuket beaches.",
    highlights: ["Temple Tours", "Island Hopping", "Thai Cooking Class", "Beachfront Stay"]
  },
  {
    title: "Japan Essentials",
    image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a?auto=format&fit=crop&q=80",
    destination: "Tokyo, Kyoto & Osaka, Japan",
    duration: "12 days",
    rating: 5,
    ratingCount: 348,
    price: "$2,499",
    includesAirfare: true,
    perPerson: true,
    description: "Discover the perfect blend of tradition and modernity with this comprehensive tour of Japan's most iconic cities.",
    highlights: ["Cherry Blossom Tours", "Mt. Fuji Visit", "Robot Restaurant", "Bullet Train Experience"]
  },
  {
    title: "Greek Island Hopping",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80",
    destination: "Athens, Mykonos & Santorini, Greece",
    duration: "9 days",
    rating: 5,
    ratingCount: 587,
    price: "$1,899",
    includesAirfare: true,
    perPerson: true,
    description: "Experience the whitewashed beauty and crystal-clear waters of the Greek islands with this unforgettable Mediterranean adventure.",
    highlights: ["Acropolis Tour", "Sunset in Santorini", "Beach Parties", "Ferry Transportation"]
  },
  {
    title: "African Safari Adventure",
    image: "https://images.unsplash.com/photo-1452960962994-acf4fd70b632?auto=format&fit=crop&q=80",
    destination: "Kenya & Tanzania",
    duration: "8 days",
    rating: 5,
    ratingCount: 293,
    price: "$3,299",
    includesAirfare: false,
    perPerson: true,
    description: "Witness the 'Big Five' and the Great Migration on this once-in-a-lifetime safari adventure through East Africa's most stunning wildlife reserves.",
    highlights: ["Serengeti National Park", "Maasai Mara", "Luxury Lodges", "Guided Safari Tours"]
  }
];

export default PackagesPage;
