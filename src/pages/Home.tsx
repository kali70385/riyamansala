import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import FilterSidebar from "@/components/FilterSidebar";
import VehicleCard from "@/components/VehicleCard";
import { mockVehicles } from "@/data/mockData";

const Home = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Find Your Perfect Vehicle
          </h1>
          <p className="text-lg text-center mb-8 text-primary-foreground/90">
            Browse thousands of vehicles from trusted sellers across Sri Lanka
          </p>
          <SearchBar />
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <FilterSidebar />
          </aside>

          {/* Listings */}
          <main className="flex-1">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">Latest Listings</h2>
              <p className="text-muted-foreground">
                {mockVehicles.length} vehicles available
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {mockVehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          </main>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Home;
