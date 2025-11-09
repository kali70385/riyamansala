import { Link } from "react-router-dom";
import { User, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { categories } from "@/data/mockData";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import riyamansalaLogo from "@/assets/riyamansala-logo.png";

const Header = () => {
  return (
    <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <span>Riyamansala - Sri Lanka's Trusted Vehicle Marketplace</span>
          <div className="flex gap-4">
            <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/10">
              <User className="w-4 h-4 mr-2" />
              Login
            </Button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <img src={riyamansalaLogo} alt="Riyamansala Logo" className="h-10 lg:h-12" />
          </Link>

          {/* Post Ad Button - Desktop */}
          <Button asChild className="hidden lg:flex bg-accent hover:bg-accent/90 text-accent-foreground shrink-0">
            <Link to="/sell-vehicle">
              <PlusCircle className="w-4 h-4 mr-2" />
              Post Ad
            </Link>
          </Button>
        </div>
      </div>

      {/* Categories Navigation - Responsive */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-3">
          <ScrollArea className="w-full">
            <div className="flex gap-2 pb-2">
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
