import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdSpace from "@/components/AdSpace";
import VehicleCard from "@/components/VehicleCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Phone, User, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { mockVehicles } from "@/data/mockData";

interface SellerProfile {
  full_name: string;
  phone: string;
  created_at: string;
}

interface Listing {
  id: string;
  title: string;
  price: number;
  year: number;
  mileage: number;
  transmission: string;
  fuel_type: string;
  condition: string;
  make: string;
  model: string;
  category: string;
  location: string;
  created_at: string;
}

interface ListingImage {
  listing_id: string;
  image_url: string;
  position: number;
}

const SellerProfile = () => {
  const { sellerId } = useParams();
  const [profile, setProfile] = useState<SellerProfile | null>(null);
  const [listings, setListings] = useState<Listing[]>([]);
  const [listingImages, setListingImages] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(true);
  const [isMockSeller, setIsMockSeller] = useState(false);

  useEffect(() => {
    if (sellerId) {
      // Check if it's a mock seller (starts with "mock-")
      if (sellerId.startsWith("mock-")) {
        loadMockSellerData(sellerId);
      } else {
        fetchSellerData(sellerId);
      }
    }
  }, [sellerId]);

  const loadMockSellerData = (mockSellerId: string) => {
    // Extract seller name from mock ID
    const sellerName = mockSellerId.replace("mock-", "").replace(/-/g, " ");
    
    // Find all vehicles from this seller
    const sellerVehicles = mockVehicles.filter(
      (v) => v.sellerName.toLowerCase().replace(/\s+/g, "-") === mockSellerId.replace("mock-", "")
    );

    if (sellerVehicles.length > 0) {
      setProfile({
        full_name: sellerVehicles[0].sellerName,
        phone: sellerVehicles[0].sellerPhone,
        created_at: sellerVehicles[0].postedDate,
      });
      setIsMockSeller(true);
    }
    
    setLoading(false);
  };

  const fetchSellerData = async (userId: string) => {
    try {
      // Fetch seller profile
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("full_name, phone, created_at")
        .eq("user_id", userId)
        .single();

      if (profileError) {
        console.error("Error fetching profile:", profileError);
      } else {
        setProfile(profileData);
      }

      // Fetch seller's active listings
      const { data: listingsData, error: listingsError } = await supabase
        .from("listings")
        .select("*")
        .eq("user_id", userId)
        .eq("status", "active")
        .order("created_at", { ascending: false });

      if (listingsError) {
        console.error("Error fetching listings:", listingsError);
      } else {
        setListings(listingsData || []);

        // Fetch images for all listings
        if (listingsData && listingsData.length > 0) {
          const listingIds = listingsData.map((l) => l.id);
          const { data: imagesData } = await supabase
            .from("listing_images")
            .select("listing_id, image_url, position")
            .in("listing_id", listingIds)
            .order("position", { ascending: true });

          if (imagesData) {
            const imagesByListing: Record<string, string[]> = {};
            imagesData.forEach((img: ListingImage) => {
              if (!imagesByListing[img.listing_id]) {
                imagesByListing[img.listing_id] = [];
              }
              imagesByListing[img.listing_id].push(img.image_url);
            });
            setListingImages(imagesByListing);
          }
        }
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Convert database listing to VehicleCard format
  const convertToVehicleFormat = (listing: Listing) => ({
    id: listing.id,
    title: listing.title,
    price: listing.price,
    year: listing.year,
    mileage: `${listing.mileage.toLocaleString()} km`,
    transmission: listing.transmission,
    fuelType: listing.fuel_type,
    condition: listing.condition,
    make: listing.make,
    model: listing.model,
    type: listing.category,
    district: listing.location.split(",")[1]?.trim() || listing.location,
    city: listing.location.split(",")[0]?.trim() || listing.location,
    images: listingImages[listing.id] || ["/placeholder.svg"],
    description: "",
    sellerName: profile?.full_name || "",
    sellerPhone: profile?.phone || "",
    postedDate: listing.created_at,
  });

  // Get mock vehicles for this seller
  const getMockSellerVehicles = () => {
    if (!sellerId) return [];
    const sellerKey = sellerId.replace("mock-", "");
    return mockVehicles.filter(
      (v) => v.sellerName.toLowerCase().replace(/\s+/g, "-") === sellerKey
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-8 w-48 mb-6" />
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <Skeleton className="h-64" />
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <Skeleton className="h-64" />
              <Skeleton className="h-64" />
              <Skeleton className="h-64" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold mb-4 text-foreground">Seller not found</h2>
          <Link to="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const displayListings = isMockSeller ? getMockSellerVehicles() : listings.map(convertToVehicleFormat);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Leaderboard Ad */}
      <AdSpace variant="leaderboard" />
      
      <Header />

      {/* Seller Header */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-8">
        <div className="container mx-auto px-4">
          <Link to="/">
            <Button
              variant="ghost"
              className="mb-4 text-primary-foreground hover:bg-primary-foreground/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold">Seller Profile</h1>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Seller Info Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-lg text-foreground">{profile.full_name}</h2>
                    <p className="text-sm text-muted-foreground">Verified Seller</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <a
                    href={`tel:${profile.phone}`}
                    className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    <span>{profile.phone}</span>
                  </a>

                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Calendar className="w-5 h-5" />
                    <span>
                      Member since{" "}
                      {new Date(profile.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                      })}
                    </span>
                  </div>
                </div>

                <Button
                  className="w-full mt-6"
                  onClick={() => (window.location.href = `tel:${profile.phone}`)}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Contact Seller
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Seller Listings */}
          <div className="lg:col-span-3">
            <h3 className="text-xl font-semibold mb-4 text-foreground">
              Listings by {profile.full_name} ({displayListings.length})
            </h3>

            {displayListings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {displayListings.map((vehicle) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground">
                    This seller has no active listings at the moment.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Ad Space - Above Footer */}
      <AdSpace variant="leaderboard" />
      
      <Footer />
    </div>
  );
};

export default SellerProfile;