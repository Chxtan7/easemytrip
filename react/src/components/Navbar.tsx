
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User, Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-gray-900 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="relative w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl">
            T
            <span className="absolute -right-1 -top-1 text-xs bg-secondary text-white rounded-full w-4 h-4 flex items-center justify-center">
              E
            </span>
          </div>
          <span className="font-bold text-xl text-gray-800 dark:text-white">TripEase</span>
        </Link>
        
        <div className="flex items-center gap-3">
          <ThemeToggle />
          
          {isMobile ? (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMenu} 
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          ) : (
            <nav className="flex items-center gap-6">
              <NavLinks />
              <AuthButtons navigate={navigate} />
            </nav>
          )}
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobile && isMenuOpen && (
        <div className="fixed inset-0 top-16 bg-white dark:bg-gray-900 z-40 animate-fade-in">
          <div className="container p-4 flex flex-col gap-4">
            <NavLinks isMobile />
            <div className="mt-4">
              <AuthButtons navigate={navigate} isMobile />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

const NavLinks = ({ isMobile = false }: { isMobile?: boolean }) => {
  const navItems = [
    { name: "Flights", path: "/flights" },
    { name: "Hotels", path: "/hotels" },
    { name: "Packages", path: "/packages" },
    { name: "Offers", path: "/offers" }
  ];
  
  return (
    <div className={`${isMobile ? 'flex flex-col gap-4' : 'flex items-center gap-6'}`}>
      {navItems.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          className={`font-medium hover:text-primary transition-colors dark:text-gray-200 ${
            isMobile ? 'text-lg py-2 border-b border-gray-100 dark:border-gray-700' : ''
          }`}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};

const AuthButtons = ({ isMobile = false, navigate }: { isMobile?: boolean, navigate: any }) => {
  return (
    <div className={`${isMobile ? 'flex flex-col gap-3 w-full' : 'flex items-center gap-3'}`}>
      <Button 
        variant="outline" 
        className={`${isMobile ? 'w-full' : ''}`}
        onClick={() => navigate("/auth")}
      >
        <User size={16} className="mr-2" />
        Login
      </Button>
      <Button 
        className={`${isMobile ? 'w-full' : ''}`}
        onClick={() => navigate("/auth?tab=signup")}
      >
        Sign Up
      </Button>
    </div>
  );
};

export default Navbar;
