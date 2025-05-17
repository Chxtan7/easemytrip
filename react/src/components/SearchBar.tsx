
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plane, Hotel, Calendar, MapPin, Search, Users } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const SearchBar = () => {
  const [selectedTab, setSelectedTab] = useState("flights");
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 -mt-10 relative z-10 w-full max-w-5xl mx-auto">
      <Tabs defaultValue="flights" value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="flights" className="flex items-center gap-2">
            <Plane size={18} />
            <span>Flights</span>
          </TabsTrigger>
          <TabsTrigger value="hotels" className="flex items-center gap-2">
            <Hotel size={18} />
            <span>Hotels</span>
          </TabsTrigger>
          <TabsTrigger value="packages" className="flex items-center gap-2">
            <Users size={18} />
            <span>Packages</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="flights" className="mt-0">
          <FlightSearch />
        </TabsContent>
        
        <TabsContent value="hotels" className="mt-0">
          <HotelSearch />
        </TabsContent>
        
        <TabsContent value="packages" className="mt-0">
          <PackageSearch />
        </TabsContent>
      </Tabs>
    </div>
  );
};

const FlightSearch = () => {
  const [tripType, setTripType] = useState("roundTrip");
  
  return (
    <div className="space-y-6">
      <div className="flex gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <input 
            type="radio" 
            id="roundTrip" 
            name="tripType" 
            value="roundTrip"
            checked={tripType === "roundTrip"}
            onChange={() => setTripType("roundTrip")}
            className="text-primary focus:ring-primary"
          />
          <label htmlFor="roundTrip">Round Trip</label>
        </div>
        <div className="flex items-center gap-2">
          <input 
            type="radio" 
            id="oneWay" 
            name="tripType" 
            value="oneWay"
            checked={tripType === "oneWay"}
            onChange={() => setTripType("oneWay")}
            className="text-primary focus:ring-primary"
          />
          <label htmlFor="oneWay">One Way</label>
        </div>
        <div className="flex items-center gap-2">
          <input 
            type="radio" 
            id="multiCity" 
            name="tripType" 
            value="multiCity"
            checked={tripType === "multiCity"}
            onChange={() => setTripType("multiCity")}
            className="text-primary focus:ring-primary"
          />
          <label htmlFor="multiCity">Multi-City</label>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <LocationSelector label="From" placeholder="Enter city or airport" />
        <LocationSelector label="To" placeholder="Enter city or airport" />
        
        <DateSelector label="Departure" />
        {tripType === "roundTrip" && <DateSelector label="Return" />}
        
        {tripType !== "roundTrip" && (
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1.5">Travelers & Class</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="justify-start h-12 text-left font-normal">
                  <Users size={16} className="mr-2 text-gray-500" />
                  <span>1 Adult, Economy</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-4">
                  <h4 className="font-medium">Travelers</h4>
                  <TravelerSelector type="Adults" subtitle="12+ years" />
                  <TravelerSelector type="Children" subtitle="2-11 years" />
                  <TravelerSelector type="Infants" subtitle="0-2 years" />
                  
                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-2">Class</h4>
                    <div className="space-y-2">
                      {["Economy", "Premium Economy", "Business", "First"].map((cls) => (
                        <div key={cls} className="flex items-center">
                          <input
                            type="radio"
                            id={cls}
                            name="cabinClass"
                            value={cls}
                            defaultChecked={cls === "Economy"}
                            className="text-primary focus:ring-primary"
                          />
                          <label htmlFor={cls} className="ml-2">
                            {cls}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        )}
      </div>
      
      <Button className="w-full md:w-auto px-8 h-12" size="lg">
        <Search size={18} className="mr-2" />
        Search Flights
      </Button>
    </div>
  );
};

const HotelSearch = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <LocationSelector label="City" placeholder="Where are you going?" />
        <DateSelector label="Check-in" />
        <DateSelector label="Check-out" />
        
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1.5">Guests & Rooms</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="justify-start h-12 text-left font-normal">
                <Users size={16} className="mr-2 text-gray-500" />
                <span>2 Guests, 1 Room</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <TravelerSelector type="Adults" subtitle="18+ years" />
                <TravelerSelector type="Children" subtitle="0-17 years" />
                <TravelerSelector type="Rooms" subtitle="" />
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      <Button className="w-full md:w-auto px-8 h-12" size="lg">
        <Search size={18} className="mr-2" />
        Search Hotels
      </Button>
    </div>
  );
};

const PackageSearch = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <LocationSelector label="From" placeholder="Enter your city" />
        <LocationSelector label="To" placeholder="Where to?" />
        <DateSelector label="Departure" />
        <DateSelector label="Return" />
      </div>
      
      <Button className="w-full md:w-auto px-8 h-12" size="lg">
        <Search size={18} className="mr-2" />
        Search Packages
      </Button>
    </div>
  );
};

const LocationSelector = ({ label, placeholder }: { label: string; placeholder: string }) => {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium mb-1.5">{label}</label>
      <div className="relative">
        <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder={placeholder}
          className="pl-10 h-12 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>
    </div>
  );
};

const DateSelector = ({ label }: { label: string }) => {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium mb-1.5">{label}</label>
      <div className="relative">
        <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          type="date"
          className="pl-10 h-12 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>
    </div>
  );
};

const TravelerSelector = ({ type, subtitle }: { type: string; subtitle: string }) => {
  const [count, setCount] = useState(type === "Adults" ? 1 : 0);
  
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="font-medium">{type}</p>
        {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setCount(Math.max(0, count - 1))}
          disabled={type === "Adults" && count <= 1}
          className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 disabled:opacity-50"
        >
          -
        </button>
        <span className="w-6 text-center">{count}</span>
        <button
          type="button"
          onClick={() => setCount(count + 1)}
          className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
