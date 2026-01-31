import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdSpace from "@/components/AdSpace";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { types, makes, conditions, districts, transmissions, fuelTypes } from "@/data/mockData";
import { Loader2, Upload, X } from "lucide-react";
import ModelAutocomplete from "@/components/ModelAutocomplete";

const SellVehicle = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [images, setImages] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    category: "",
    make: "",
    model: "",
    year: "",
    mileage: "",
    price: "",
    fuel: "",
    transmission: "",
    condition: "",
    description: "",
    name: "",
    phone: "",
    email: "",
    location: "",
  });

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      toast({
        title: "Authentication Required",
        description: "Please login to post an ad",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    setUser(session.user);
    
    // Fetch profile data
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", session.user.id)
      .single();

    if (profile) {
      setFormData(prev => ({
        ...prev,
        name: profile.full_name || "",
        phone: profile.phone || "",
        email: session.user.email || "",
      }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    if (images.length + files.length > 5) {
      toast({
        title: "Too Many Images",
        description: "You can only upload up to 5 images per listing",
        variant: "destructive",
      });
      return;
    }

    setImages([...images, ...files]);
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const uploadImages = async (listingId: string) => {
    const uploadedUrls: string[] = [];

    for (let i = 0; i < images.length; i++) {
      const file = images[i];
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${listingId}/${Date.now()}_${i}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('listing-images')
        .upload(fileName, file);

      if (uploadError) {
        console.error('Error uploading image:', uploadError);
        continue;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('listing-images')
        .getPublicUrl(fileName);

      uploadedUrls.push(publicUrl);

      // Insert into listing_images table
      await supabase.from('listing_images').insert({
        listing_id: listingId,
        image_url: publicUrl,
        position: i,
      });
    }

    return uploadedUrls;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please login to post an ad",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    if (images.length === 0) {
      toast({
        title: "Images Required",
        description: "Please upload at least one image",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Create listing
      const { data: listing, error: listingError } = await supabase
        .from('listings')
        .insert({
          user_id: user.id,
          title: `${formData.year} ${formData.make} ${formData.model}`,
          category: formData.category,
          make: formData.make,
          model: formData.model,
          year: parseInt(formData.year),
          mileage: parseInt(formData.mileage),
          price: parseFloat(formData.price),
          fuel_type: formData.fuel,
          transmission: formData.transmission,
          condition: formData.condition,
          description: formData.description,
          location: formData.location,
          contact_phone: formData.phone,
          contact_email: formData.email,
          status: 'active',
        })
        .select()
        .single();

      if (listingError) throw listingError;

      // Upload images
      await uploadImages(listing.id);

      toast({
        title: "Listing Posted!",
        description: "Your vehicle listing has been published successfully.",
      });

      navigate("/profile");
    } catch (error: any) {
      console.error('Error creating listing:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to create listing. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Leaderboard Ad */}
      <AdSpace variant="leaderboard" />
      
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Sell Your Vehicle</h1>
            <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
              List your vehicle and reach thousands of potential buyers across Sri Lanka
            </p>
          </div>
        </section>

        {/* Form Section */}
        <section className="container mx-auto px-4 py-16">
          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle>Vehicle Details</CardTitle>
              <CardDescription>
                Provide accurate information to attract serious buyers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Basic Information</h3>
                  
                  <div>
                    <Label htmlFor="images">Images * (Max 5)</Label>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center">
                      <Input
                        id="images"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        className="hidden"
                      />
                      <label htmlFor="images" className="cursor-pointer">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          Click to upload images ({images.length}/5)
                        </p>
                      </label>
                    </div>
                    {images.length > 0 && (
                      <div className="grid grid-cols-3 gap-2 mt-4">
                        {images.map((image, index) => (
                          <div key={index} className="relative">
                            <img
                              src={URL.createObjectURL(image)}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-24 object-cover rounded"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category">Category *</Label>
                      <Select 
                        required 
                        value={formData.category}
                        onValueChange={(value) => setFormData({...formData, category: value, make: "", model: ""})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {types.map((type) => (
                            <SelectItem key={type} value={type.toLowerCase()}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="make">Make *</Label>
                      <Select 
                        required 
                        value={formData.make}
                        onValueChange={(value) => setFormData({...formData, make: value, model: ""})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select make" />
                        </SelectTrigger>
                        <SelectContent>
                          {makes.map((make) => (
                            <SelectItem key={make} value={make}>
                              {make}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="model">Model *</Label>
                      <ModelAutocomplete
                        value={formData.model}
                        onChange={(value) => setFormData({...formData, model: value})}
                        selectedType=""
                        selectedMake={formData.make}
                        selectedCategory={formData.category}
                        placeholder="Type model name (min 2 letters)..."
                        minChars={2}
                      />
                    </div>

                    <div>
                      <Label htmlFor="year">Year *</Label>
                      <Input 
                        id="year" 
                        type="number" 
                        placeholder="e.g., 2020" 
                        required 
                        value={formData.year}
                        onChange={(e) => setFormData({...formData, year: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="mileage">Mileage (km) *</Label>
                      <Input 
                        id="mileage" 
                        type="number" 
                        placeholder="e.g., 45000" 
                        required 
                        value={formData.mileage}
                        onChange={(e) => setFormData({...formData, mileage: e.target.value})}
                      />
                    </div>

                    <div>
                      <Label htmlFor="price">Price (LKR) *</Label>
                      <Input 
                        id="price" 
                        type="number" 
                        placeholder="e.g., 5500000" 
                        required 
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                {/* Vehicle Specifications */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Vehicle Specifications</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="fuel">Fuel Type *</Label>
                      <Select 
                        required 
                        value={formData.fuel}
                        onValueChange={(value) => setFormData({...formData, fuel: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select fuel type" />
                        </SelectTrigger>
                        <SelectContent>
                          {fuelTypes.map((fuel) => (
                            <SelectItem key={fuel} value={fuel}>
                              {fuel}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="transmission">Transmission *</Label>
                      <Select 
                        required 
                        value={formData.transmission}
                        onValueChange={(value) => setFormData({...formData, transmission: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select transmission" />
                        </SelectTrigger>
                        <SelectContent>
                          {transmissions.map((transmission) => (
                            <SelectItem key={transmission} value={transmission}>
                              {transmission}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="condition">Condition *</Label>
                      <Select 
                        required 
                        value={formData.condition}
                        onValueChange={(value) => setFormData({...formData, condition: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                        <SelectContent>
                          {conditions.map((condition) => (
                            <SelectItem key={condition} value={condition}>
                              {condition}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Description *</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Describe your vehicle's features, condition, and any additional information..."
                      className="min-h-[120px]"
                      required 
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                    />
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Contact Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Your Name *</Label>
                      <Input 
                        id="name" 
                        placeholder="Full name" 
                        required 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input 
                        id="phone" 
                        type="tel" 
                        placeholder="+94 XX XXX XXXX" 
                        required 
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="your@email.com" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>

                    <div>
                      <Label htmlFor="location">District *</Label>
                      <Select 
                        required 
                        value={formData.location}
                        onValueChange={(value) => setFormData({...formData, location: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select district" />
                        </SelectTrigger>
                        <SelectContent>
                          {districts.map((district) => (
                            <SelectItem key={district.name} value={district.name}>
                              {district.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end gap-4 pt-4">
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Posting...
                      </>
                    ) : (
                      "Post Listing"
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Ad Space - Above Footer */}
      <AdSpace variant="leaderboard" />
      
      <Footer />
    </div>
  );
};

export default SellVehicle;
