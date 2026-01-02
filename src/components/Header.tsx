import { Link } from "react-router-dom";
import { User, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { categories } from "@/data/mockData";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import riyamansalaLogo from "@/assets/riyamansala-logo.png";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const Header = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
      {/* Top Bar with Logo */}
      <div className="bg-primary text-primary-foreground py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Logo and Tagline */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <img 
              src={riyamansalaLogo} 
              alt="Riyamansala Logo" 
              className="h-10 md:h-12 w-auto rounded-md object-contain" 
            />
            <span className="hidden sm:inline text-sm md:text-base font-medium text-primary-foreground">
              Riyamansala - Sri Lanka's Trusted Vehicle Marketplace
            </span>
          </Link>

          {/* Right side actions */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Post Ad Button */}
            <Button asChild size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link to="/sell-vehicle">
                <PlusCircle className="w-4 h-4 mr-1 md:mr-2" />
                <span className="hidden sm:inline">Post Ad</span>
              </Link>
            </Button>

            {user ? (
              <Button asChild variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/10">
                <Link to="/profile">
                  <User className="w-4 h-4 md:mr-2" />
                  <span className="hidden md:inline">Profile</span>
                </Link>
              </Button>
            ) : (
              <Button asChild variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/10">
                <Link to="/auth">
                  <User className="w-4 h-4 md:mr-2" />
                  <span className="hidden md:inline">Login</span>
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Categories Navigation - Responsive */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-2">
          <ScrollArea className="w-full">
            <div className="flex gap-2 pb-1">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant="outline"
                  size="sm"
                  asChild
                  className="hover:bg-primary hover:text-primary-foreground whitespace-nowrap shrink-0"
                >
                  <Link to={`/category/${category.toLowerCase().replace(" ", "-")}`}>
                    {category}
                  </Link>
                </Button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="h-2" />
          </ScrollArea>
        </div>
      </div>
    </header>
  );
};

export default Header;
