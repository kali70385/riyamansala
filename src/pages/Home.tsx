import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import FilterSidebar, { FilterValues } from "@/components/FilterSidebar";
import VehicleCard from "@/components/VehicleCard";
import AdSpace from "@/components/AdSpace";
import { mockVehicles, priceRanges, Vehicle } from "@/data/mockData";
import { useState, useMemo, Fragment } from "react";
import { resetInlineAdCounter } from "@/hooks/useAdSettings";

const Home = () => {
  const [filters, setFilters] = useState<FilterValues | null>(null);

  // Reset inline ad counter on mount
  useEffect(() => {
    resetInlineAdCounter();
  }, []);

  const filteredVehicles = useMemo(() => {
    if (!filters) return mockVehicles;

    return mockVehicles.filter((vehicle: Vehicle) => {
      // Filter by Model (case-insensitive partial match)
      if (filters.model && !vehicle.model.toLowerCase().includes(filters.model.toLowerCase())) {
        return false;
      }

      // Filter by Make (exact match)
      if (filters.make && vehicle.make !== filters.make) {
        return false;
      }

      // Filter by Type (exact match)
      if (filters.type && vehicle.type !== filters.type) {
        return false;
      }

      // Filter by Condition (exact match)
      if (filters.condition && vehicle.condition !== filters.condition) {
        return false;
      }

      // Filter by Price Range
      if (filters.priceRange) {
        const selectedRange = priceRanges.find(r => r.label === filters.priceRange);
        if (selectedRange) {
          if (vehicle.price < selectedRange.min || vehicle.price > selectedRange.max) {
            return false;
          }
        }
      }

      // Filter by District (exact match)
      if (filters.district && vehicle.district !== filters.district) {
        return false;
      }

      // Filter by Year Range
      if (vehicle.year < filters.yearMin || vehicle.year > filters.yearMax) {
        return false;
      }

      // Filter by Transmission (exact match)
      if (filters.transmission && vehicle.transmission !== filters.transmission) {
        return false;
      }

      // Filter by Fuel Type (exact match)
      if (filters.fuelType && vehicle.fuelType !== filters.fuelType) {
        return false;
      }

      return true;
    });
  }, [filters]);

  const handleSearch = (newFilters: FilterValues) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      {/* Top Leaderboard Ad */}
      <AdSpace variant="leaderboard" className="bg-background border-b border-border" />

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
            <FilterSidebar onSearch={handleSearch} />
          </aside>

          {/* Listings */}
          <main className="flex-1">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {filters ? "Search Results" : "Latest Listings"}
              </h2>
              <p className="text-muted-foreground">
                {filteredVehicles.length} vehicle{filteredVehicles.length !== 1 ? 's' : ''} available
              </p>
            </div>

            {filteredVehicles.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">No vehicles found matching your criteria.</p>
                <p className="text-sm text-muted-foreground mt-2">Try adjusting your filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredVehicles.map((vehicle, index) => (
                  <Fragment key={vehicle.id}>
                    <VehicleCard vehicle={vehicle} />
                    {/* Insert ad after every 4 cards */}
                    {(index + 1) % 4 === 0 && index < filteredVehicles.length - 1 && (
                      <div className="col-span-1 md:col-span-2 xl:col-span-3">
                        <AdSpace variant="inline" />
                      </div>
                    )}
                  </Fragment>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Home;
