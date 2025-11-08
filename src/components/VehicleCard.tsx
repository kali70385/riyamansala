import { Link } from "react-router-dom";
import { Vehicle } from "@/data/mockData";
import { MapPin, Calendar, Gauge } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface VehicleCardProps {
  vehicle: Vehicle;
}

const VehicleCard = ({ vehicle }: VehicleCardProps) => {
  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `Rs. ${(price / 1000000).toFixed(2)}M`;
    }
    return `Rs. ${(price / 1000).toFixed(0)}k`;
  };

  return (
    <Link to={`/vehicle/${vehicle.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-1 border border-border bg-card">
        <div className="relative aspect-video overflow-hidden bg-muted">
          <img
            src={vehicle.images[0]}
            alt={vehicle.title}
            className="w-full h-full object-cover"
          />
          <Badge className="absolute top-2 right-2 bg-accent text-accent-foreground">
            {vehicle.condition}
          </Badge>
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-1 text-foreground">
            {vehicle.title}
          </h3>
          <p className="text-2xl font-bold text-primary mb-3">
            {formatPrice(vehicle.price)}
          </p>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{vehicle.year}</span>
              <span className="mx-2">•</span>
              <Gauge className="w-4 h-4" />
              <span>{vehicle.mileage}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>
                {vehicle.city}, {vehicle.district}
              </span>
            </div>
            <div className="flex gap-2 mt-2">
              <Badge variant="secondary" className="text-xs">
                {vehicle.transmission}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {vehicle.fuelType}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default VehicleCard;
