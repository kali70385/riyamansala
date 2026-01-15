import { Link, useNavigate } from "react-router-dom";
import { User, PlusCircle, LogIn, LogOut, UserPlus, Settings, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { categories } from "@/data/mockData";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import riyamansalaLogo from "@/assets/riyamansala-logo.png";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const Header = () => {
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      if (session?.user) {
        checkAdminRole(session.user.id);
      }
    };

    checkSession();

    const {
      data: {
        subscription
      }
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        checkAdminRole(session.user.id);
      } else {
        setIsAdmin(false);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const checkAdminRole = async (userId: string) => {
    const { data } = await supabase.rpc('has_role', { _user_id: userId, _role: 'admin' });
    setIsAdmin(data === true);
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Error logging out");
    } else {
      toast.success("Logged out successfully");
      navigate("/");
    }
  };

  return <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
      {/* Top Bar with Logo */}
      <div className="bg-primary text-primary-foreground py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Logo and Tagline */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <img src={riyamansalaLogo} alt="Riyamansala Logo" className="h-10 md:h-12 w-auto rounded-md object-contain" />
            <span className="text-xs sm:text-sm md:text-base font-medium text-primary-foreground">
              <span className="sm:hidden text-lg">Riyamansala</span>
              <span className="hidden sm:inline">Riyamansala - Sri Lanka's Trusted Vehicle Marketplace</span>
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

            {/* User Dropdown Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/10">
                  <User className="w-4 h-4 md:mr-2" />
                  <span className="hidden md:inline">{user ? "Account" : "Menu"}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {user ? (
                  <>
                    {isAdmin && (
                      <>
                        <DropdownMenuItem asChild>
                          <Link to="/admin" className="flex items-center gap-2 cursor-pointer text-primary">
                            <Shield className="w-4 h-4" />
                            Admin Dashboard
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                      </>
                    )}
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="flex items-center gap-2 cursor-pointer">
                        <Settings className="w-4 h-4" />
                        My Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/sell-vehicle" className="flex items-center gap-2 cursor-pointer">
                        <PlusCircle className="w-4 h-4" />
                        Post New Ad
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 cursor-pointer text-destructive focus:text-destructive">
                      <LogOut className="w-4 h-4" />
                      Logout
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                      <Link to="/auth" className="flex items-center gap-2 cursor-pointer">
                        <LogIn className="w-4 h-4" />
                        Login
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/auth?tab=register" className="flex items-center gap-2 cursor-pointer">
                        <UserPlus className="w-4 h-4" />
                        Register
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/sell-vehicle" className="flex items-center gap-2 cursor-pointer">
                        <PlusCircle className="w-4 h-4" />
                        Post Ad
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Categories Navigation - Responsive */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-2">
          <ScrollArea className="w-full">
            <div className="flex gap-2 pb-1">
              {categories.map(category => <Button key={category} variant="outline" size="sm" asChild className="hover:bg-primary hover:text-primary-foreground whitespace-nowrap shrink-0">
                  <Link to={`/category/${category.toLowerCase().replace(" ", "-")}`}>
                    {category}
                  </Link>
                </Button>)}
            </div>
            <ScrollBar orientation="horizontal" className="h-2" />
          </ScrollArea>
        </div>
      </div>
    </header>;
};
export default Header;