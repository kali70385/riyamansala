import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FilterSidebar from "@/components/FilterSidebar";
import VehicleCard from "@/components/VehicleCard";
import { mockVehicles } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const CategoryPage = () => {
  const { category } = useParams();
  const categoryName = category?.replace("-", " ").toUpperCase() || "";

  // Filter vehicles based on category
  const filteredVehicles = mockVehicles.filter((vehicle) => {
    const vehicleCategory = vehicle.type.toLowerCase();
    const urlCategory = category?.toLowerCase() || "";
    
    // Map URL categories to vehicle types
    if (urlCategory === "cars") return vehicleCategory === "car";
    if (urlCategory === "suvs") return vehicleCategory === "suv/jeep";
    if (urlCategory === "vans") return vehicleCategory === "van";
    if (urlCategory === "motorbikes") return vehicleCategory === "motorcycle";
    if (urlCategory === "three-wheel") return vehicleCategory === "three wheel";
    if (urlCategory === "pickups") return vehicleCategory.includes("pickup");
    
    return true;
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
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
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <FilterSidebar />
          </aside>

          {/* Listings */}
          <main className="flex-1">
            {filteredVehicles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredVehicles.map((vehicle) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-xl text-muted-foreground">
                  No vehicles found in this category
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
