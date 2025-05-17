
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface OfferCardProps {
  title: string;
  description: string;
  imageUrl: string;
  discount: string;
  link: string;
}

const OfferCard = ({ title, description, imageUrl, discount, link }: OfferCardProps) => {
  return (
    <div className="group relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex h-[200px]">
      <img
        src={imageUrl}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-all duration-300" />
      
      <div className="relative h-full w-full p-6 flex flex-col justify-between text-white z-10">
        <div>
          <div className="inline-block px-3 py-1 mb-3 bg-secondary rounded-md text-sm font-bold">
            {discount}
          </div>
          <h3 className="text-xl font-bold mb-1">{title}</h3>
          <p className="text-sm text-white/80">{description}</p>
        </div>
        
        <Link 
          to={link} 
          className="flex items-center text-sm font-medium text-white hover:text-secondary transition-colors"
        >
          Book Now <ArrowRight size={16} className="ml-1" />
        </Link>
      </div>
    </div>
  );
};

export default OfferCard;
