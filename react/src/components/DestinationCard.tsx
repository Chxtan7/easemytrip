
import { Link } from "react-router-dom";

interface DestinationCardProps {
  city: string;
  country: string;
  imageUrl: string;
  price: string;
  link: string;
}

const DestinationCard = ({ city, country, imageUrl, price, link }: DestinationCardProps) => {
  return (
    <Link to={link} className="group block">
      <div className="relative rounded-lg overflow-hidden shadow-md h-[280px]">
        <img
          src={imageUrl}
          alt={`${city}, ${country}`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-4 text-white">
          <h3 className="text-xl font-bold">{city}</h3>
          <div className="flex justify-between items-center mt-1">
            <p className="text-sm text-white/80">{country}</p>
            <p className="font-bold text-white">
              From <span className="text-secondary">{price}</span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DestinationCard;
