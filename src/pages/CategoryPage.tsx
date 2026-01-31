import { useParams, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FilterSidebar, { FilterValues } from "@/components/FilterSidebar";
import VehicleCard from "@/components/VehicleCard";
import { mockVehicles, priceRanges } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const CategoryPage = () => {
  const { category } = useParams();
  const categoryName = category?.replace("-", " ").toUpperCase() || "";
  const listingsRef = useRef<HTMLDivElement>(null);
  const [appliedFilters, setAppliedFilters] = useState<FilterValues | null>(null);

  // Scroll to listings when category changes
  useEffect(() => {
    if (listingsRef.current) {
      listingsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [category]);

  const handleSearch = (filters: FilterValues) => {
    setAppliedFilters(filters);
  };

  // Get price range bounds from label
  const getPriceRangeBounds = (label: string): { min: number; max: number } | null => {
    const range = priceRanges.find(r => r.label === label);
    if (!range) return null;
    return { min: range.min, max: range.max };
  };

  // Filter vehicles based on category and applied filters
  const filteredVehicles = mockVehicles.filter((vehicle) => {
    const vehicleCategory = vehicle.type.toLowerCase();
    const urlCategory = category?.toLowerCase() || "";
    
    // Map URL categories to vehicle types
    let categoryMatch = true;
    if (urlCategory === "cars") categoryMatch = vehicleCategory === "car";
    else if (urlCategory === "suvs") categoryMatch = vehicleCategory === "suv/jeep";
    else if (urlCategory === "vans") categoryMatch = vehicleCategory === "van";
    else if (urlCategory === "motorbikes") categoryMatch = vehicleCategory === "motorcycle";
    else if (urlCategory === "three-wheel") categoryMatch = vehicleCategory === "three wheel";
    else if (urlCategory === "pickups") categoryMatch = vehicleCategory.includes("pickup");
    
    if (!categoryMatch) return false;

    // Apply additional filters if set
    if (appliedFilters) {
      // Model filter
      if (appliedFilters.model && !vehicle.model.toLowerCase().includes(appliedFilters.model.toLowerCase())) {
        return false;
      }
      
      // Make filter
      if (appliedFilters.make && vehicle.make.toLowerCase() !== appliedFilters.make.toLowerCase()) {
        return false;
      }
      
      // Type filter (only when not on category page)
      if (appliedFilters.type && !category) {
        if (vehicle.type.toLowerCase() !== appliedFilters.type.toLowerCase()) {
          return false;
        }
      }
      
      // Condition filter
      if (appliedFilters.condition && vehicle.condition.toLowerCase() !== appliedFilters.condition.toLowerCase()) {
        return false;
      }
      
      // Price range filter
      if (appliedFilters.priceRange) {
        const bounds = getPriceRangeBounds(appliedFilters.priceRange);
        if (bounds) {
          if (vehicle.price < bounds.min || vehicle.price > bounds.max) {
            return false;
          }
        }
      }
      
      // District filter
      if (appliedFilters.district && vehicle.district.toLowerCase() !== appliedFilters.district.toLowerCase()) {
        return false;
      }
      
      // Year range filter
      if (vehicle.year < appliedFilters.yearMin || vehicle.year > appliedFilters.yearMax) {
        return false;
      }
      
      // Transmission filter
      if (appliedFilters.transmission && vehicle.transmission.toLowerCase() !== appliedFilters.transmission.toLowerCase()) {
        return false;
      }
      
      // Fuel type filter
      if (appliedFilters.fuelType && vehicle.fuelType.toLowerCase() !== appliedFilters.fuelType.toLowerCase()) {
        return false;
      }
    }
    
    return true;
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Leaderboard Ad */}
      <AdSpace variant="leaderboard" />
      
      <Header />

      {/* Category Header */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-8">
        <div className="container mx-auto px-4">
          <Link to="/">
            <Button
              variant="ghost"
              className="mb-4 text-primary-foreground hover:bg-primary-foreground/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold">
            {categoryName}
          </h1>
          <p className="text-primary-foreground/90 mt-2">
            Browse {filteredVehicles.length} available listings
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div ref={listingsRef} className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <FilterSidebar category={category} onSearch={handleSearch} />
          </aside>

          {/* Listings */}
          <main className="flex-1">
            {filteredVehicles.length > 0 ? (
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
            ) : (
              <div className="text-center py-16">
                <p className="text-xl text-muted-foreground">
                  No vehicles found matching your filters
                </p>
                <Link to="/">
                  <Button className="mt-4">View All Listings</Button>
                </Link>
              </div>
            )}
          </main>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CategoryPage;
