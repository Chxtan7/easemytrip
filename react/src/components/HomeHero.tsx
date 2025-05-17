
const HomeHero = () => {
  return (
    <div className="relative">
      {/* Hero Background */}
      <div 
        className="bg-gradient-to-r from-primary-600 to-primary-400 h-[500px] md:h-[400px]"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1469041797191-50ace28483c3?auto=format&fit=crop&w=2000&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative container mx-auto px-4 h-full flex flex-col items-center justify-center text-center z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fade-in">
            Discover the World with TripEase
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-8 animate-fade-in">
            Find and book the best deals on flights, hotels, and vacation packages
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeHero;
