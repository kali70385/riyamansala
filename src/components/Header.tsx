import { Link } from "react-router-dom";
import { Car, User, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { categories } from "@/data/mockData";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const Header = () => {
  return (
    <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <span>Sri Lanka's #1 Vehicle Marketplace</span>
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
          <Link to="/" className="flex items-center gap-2 text-xl lg:text-2xl font-bold text-primary shrink-0">
            <Car className="w-6 h-6 lg:w-8 lg:h-8" />
            <span className="hidden sm:inline">AutoMarket</span>
          </Link>

          {/* Post Ad Button - Desktop */}
          <Button className="hidden lg:flex bg-accent hover:bg-accent/90 text-accent-foreground shrink-0">
            <PlusCircle className="w-4 h-4 mr-2" />
            Post Ad
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
