import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdSpace from "@/components/AdSpace";
import { mockVehicles } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Calendar,
  Gauge,
  Fuel,
  Settings,
  Phone,
  ArrowLeft,
  Share2,
  Heart,
} from "lucide-react";
import { useState } from "react";

const VehicleDetail = () => {
  const { id } = useParams();
  const vehicle = mockVehicles.find((v) => v.id === id);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Vehicle not found</h2>
          <Link to="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Leaderboard Ad */}
      <AdSpace variant="leaderboard" />
      
      <Header />

      <div className="container mx-auto px-4 py-8">
        <Link to="/">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Listings
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Image */}
            <Card className="overflow-hidden">
              <div className="aspect-video bg-muted">
                <img
                  src={vehicle.images[selectedImage]}
                  alt={vehicle.title}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Image Thumbnails */}
              <CardContent className="p-4">
                <div className="grid grid-cols-4 gap-2">
                  {vehicle.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-video rounded overflow-hidden border-2 transition-colors ${
                        selectedImage === index
                          ? "border-primary"
                          : "border-transparent hover:border-border"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${vehicle.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Ad Space - Between Image and Details */}
            <AdSpace variant="inline" />

            {/* Vehicle Details */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-foreground">
                  Vehicle Details
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Make</p>
                    <p className="font-semibold text-foreground">{vehicle.make}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Model</p>
                    <p className="font-semibold text-foreground">{vehicle.model}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Year</p>
                    <p className="font-semibold text-foreground">{vehicle.year}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Mileage</p>
                    <p className="font-semibold text-foreground">{vehicle.mileage}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Transmission</p>
                    <p className="font-semibold text-foreground">
                      {vehicle.transmission}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Fuel Type</p>
                    <p className="font-semibold text-foreground">{vehicle.fuelType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Condition</p>
                    <Badge variant="secondary">{vehicle.condition}</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Type</p>
                    <p className="font-semibold text-foreground">{vehicle.type}</p>
                  </div>
                </div>

                <Separator className="my-6" />

                <div>
                  <h3 className="font-semibold mb-2 text-foreground">Description</h3>
                  <p className="text-muted-foreground">{vehicle.description}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Price and Contact */}
          <div className="space-y-6">
            {/* Ad Space - Between Details and Price (Mobile only, shows on lg:hidden) */}
            <div className="lg:hidden">
              <AdSpace variant="inline" />
            </div>
            
            {/* Price Card */}
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-2">Price</p>
                <p className="text-3xl font-bold text-primary mb-4">
                  {formatPrice(vehicle.price)}
                </p>

                <div className="flex gap-2 mb-4">
                  <Button className="flex-1 bg-accent hover:bg-accent/90">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Seller
                  </Button>
                  <Button variant="outline" size="icon">
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>

                <Separator className="my-4" />

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground">
                      {vehicle.city}, {vehicle.district}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground">
                      Posted on{" "}
                      {new Date(vehicle.postedDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Seller Card */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 text-foreground">Seller Information</h3>
                <div className="space-y-3">
                  <p className="font-medium text-foreground">{vehicle.sellerName}</p>
                  <a 
                    href={`tel:${vehicle.sellerPhone}`}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    {vehicle.sellerPhone}
                  </a>
                  <Button 
                    variant="outline" 
                    className="w-full mt-2"
                    onClick={() => window.location.href = `tel:${vehicle.sellerPhone}`}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Contact Seller
                  </Button>
                  <Link to={`/seller/mock-${vehicle.sellerName.toLowerCase().replace(/\s+/g, "-")}`}>
                    <Button variant="ghost" className="w-full">
                      View Seller Profile
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 text-foreground">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Gauge className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">Mileage</span>
                    </div>
                    <span className="font-medium text-foreground">{vehicle.mileage}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Fuel className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">Fuel</span>
                    </div>
                    <span className="font-medium text-foreground">{vehicle.fuelType}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Settings className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">Transmission</span>
                    </div>
                    <span className="font-medium text-foreground">
                      {vehicle.transmission}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default VehicleDetail;
