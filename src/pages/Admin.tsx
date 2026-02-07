import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdSpace from "@/components/AdSpace";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Loader2, Search, Trash2, Eye, Ban, CheckCircle, Users, Car, BarChart3, Shield, Megaphone, Save, Code, Tag, Wrench, Factory } from "lucide-react";
import { AdSettings } from "@/hooks/useAdSettings";
import ModelsManagement from "@/components/admin/ModelsManagement";
import MakesManagement from "@/components/admin/MakesManagement";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Listing {
  id: string;
  title: string;
  make: string;
  model: string;
  year: number;
  price: number;
  status: string;
  created_at: string;
  user_id: string;
  category: string;
}

interface Profile {
  id: string;
  user_id: string;
  full_name: string;
  phone: string;
  created_at: string;
}

interface UserRole {
  id: string;
  user_id: string;
  role: 'admin' | 'moderator' | 'user';
  created_at: string;
}


const Admin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [listings, setListings] = useState<Listing[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [userRoles, setUserRoles] = useState<UserRole[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [stats, setStats] = useState({
    totalListings: 0,
    activeListings: 0,
    totalUsers: 0,
    totalAdmins: 0,
  });
  
  // Ad Management State
  const [adSettings, setAdSettings] = useState<AdSettings>({
    metaTags: '',
    leaderboardAdCode: '',
    inlineAdCodes: ['', '', '', '', '', ''],
    detailPageAdCodes: {
      afterImage: '',
      afterDetails: '',
      aboveFooter: '',
    },
  });
  const [savingAds, setSavingAds] = useState(false);

  // Load ad settings from localStorage on mount
  useEffect(() => {
    const savedAdSettings = localStorage.getItem('adSettings');
    if (savedAdSettings) {
      try {
        setAdSettings(JSON.parse(savedAdSettings));
      } catch (e) {
        console.error('Failed to parse ad settings:', e);
      }
    }
  }, []);

  const saveAdSettings = () => {
    setSavingAds(true);
    try {
      localStorage.setItem('adSettings', JSON.stringify(adSettings));
      toast.success('Ad settings saved successfully!');
    } catch (e) {
      toast.error('Failed to save ad settings');
    } finally {
      setSavingAds(false);
    }
  };

  const updateInlineAdCode = (index: number, value: string) => {
    setAdSettings(prev => ({
      ...prev,
      inlineAdCodes: prev.inlineAdCodes.map((code, i) => i === index ? value : code),
    }));
  };

  const updateDetailPageAdCode = (field: keyof AdSettings['detailPageAdCodes'], value: string) => {
    setAdSettings(prev => ({
      ...prev,
      detailPageAdCodes: {
        ...prev.detailPageAdCodes,
        [field]: value,
      },
    }));
  };

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast.error("Please login to access admin panel");
        navigate("/auth");
        return;
      }

      // Check if user has admin role using the has_role function
      const { data: hasAdminRole, error } = await supabase
        .rpc('has_role', { _user_id: session.user.id, _role: 'admin' });

      if (error) {
        console.error("Error checking admin role:", error);
        toast.error("Error verifying admin access");
        navigate("/");
        return;
      }

      if (!hasAdminRole) {
        toast.error("Access denied. Admin privileges required.");
        navigate("/");
        return;
      }

      setIsAdmin(true);
      await fetchAllData();
    } catch (error) {
      console.error("Admin access check failed:", error);
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const fetchAllData = async () => {
    await Promise.all([
      fetchListings(),
      fetchProfiles(),
      fetchUserRoles(),
    ]);
    await fetchStats();
  };

  const fetchListings = async () => {
    // Admins can see all listings including non-active ones via service role
    const { data, error } = await supabase
      .from("listings")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching listings:", error);
    } else {
      setListings(data || []);
    }
  };

  const fetchProfiles = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching profiles:", error);
    } else {
      setProfiles(data || []);
    }
  };

  const fetchUserRoles = async () => {
    const { data, error } = await supabase
      .from("user_roles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching user roles:", error);
    } else {
      setUserRoles((data || []) as UserRole[]);
    }
  };

  const fetchStats = async () => {
    const totalListings = listings.length;
    const activeListings = listings.filter(l => l.status === 'active').length;
    const totalUsers = profiles.length;
    const totalAdmins = userRoles.filter(r => r.role === 'admin').length;

    setStats({
      totalListings,
      activeListings,
      totalUsers,
      totalAdmins,
    });
  };

  useEffect(() => {
    if (listings.length || profiles.length || userRoles.length) {
      fetchStats();
    }
  }, [listings, profiles, userRoles]);

  const updateListingStatus = async (listingId: string, newStatus: string) => {
    const { error } = await supabase
      .from("listings")
      .update({ status: newStatus })
      .eq("id", listingId);

    if (error) {
      toast.error("Failed to update listing status");
    } else {
      toast.success(`Listing ${newStatus === 'active' ? 'activated' : 'suspended'}`);
      fetchListings();
    }
  };

  const deleteListing = async (listingId: string) => {
    const { error } = await supabase
      .from("listings")
      .delete()
      .eq("id", listingId);

    if (error) {
      toast.error("Failed to delete listing");
    } else {
      toast.success("Listing deleted successfully");
      fetchListings();
    }
  };

  const addUserRole = async (userId: string, role: 'admin' | 'moderator' | 'user') => {
    const { error } = await supabase
      .from("user_roles")
      .insert({ user_id: userId, role });

    if (error) {
      if (error.code === '23505') {
        toast.error("User already has this role");
      } else {
        toast.error("Failed to add role");
      }
    } else {
      toast.success(`Role ${role} added successfully`);
      fetchUserRoles();
    }
  };

  const removeUserRole = async (roleId: string) => {
    const { error } = await supabase
      .from("user_roles")
      .delete()
      .eq("id", roleId);

    if (error) {
      toast.error("Failed to remove role");
    } else {
      toast.success("Role removed successfully");
      fetchUserRoles();
    }
  };

  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.model.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || listing.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Leaderboard Ad */}
      <AdSpace variant="leaderboard" />
      
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-2">
            <Shield className="w-6 h-6 md:w-8 md:h-8 text-primary" />
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">Manage listings, users, and site settings</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <Car className="w-4 h-4" />
                Total Listings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl md:text-3xl font-bold">{stats.totalListings}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Active Listings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl md:text-3xl font-bold text-green-600">{stats.activeListings}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Total Users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl md:text-3xl font-bold">{stats.totalUsers}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                Admins
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl md:text-3xl font-bold text-primary">{stats.totalAdmins}</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for different sections */}
        <Tabs defaultValue="listings" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-flex">
            <TabsTrigger value="listings" className="flex items-center gap-2">
              <Car className="w-4 h-4" />
              <span className="hidden sm:inline">Listings</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Users</span>
            </TabsTrigger>
            <TabsTrigger value="roles" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span className="hidden sm:inline">Roles</span>
            </TabsTrigger>
            <TabsTrigger value="models" className="flex items-center gap-2">
              <Wrench className="w-4 h-4" />
              <span className="hidden sm:inline">Models</span>
            </TabsTrigger>
            <TabsTrigger value="ads" className="flex items-center gap-2">
              <Megaphone className="w-4 h-4" />
              <span className="hidden sm:inline">Ads</span>
            </TabsTrigger>
          </TabsList>

          {/* Listings Tab */}
          <TabsContent value="listings">
            <Card>
              <CardHeader>
                <CardTitle>Manage Listings</CardTitle>
                <CardDescription>View, edit, and moderate all vehicle listings</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search listings..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-40">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                      <SelectItem value="sold">Sold</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Listings Table */}
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead className="hidden md:table-cell">Category</TableHead>
                        <TableHead className="hidden sm:table-cell">Price</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="hidden lg:table-cell">Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredListings.map((listing) => (
                        <TableRow key={listing.id}>
                          <TableCell className="font-medium">
                            <div>
                              <p className="truncate max-w-[150px] sm:max-w-none">{listing.title}</p>
                              <p className="text-xs text-muted-foreground md:hidden">{listing.category}</p>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">{listing.category}</TableCell>
                          <TableCell className="hidden sm:table-cell">Rs. {listing.price.toLocaleString()}</TableCell>
                          <TableCell>
                            <Badge variant={listing.status === 'active' ? 'default' : listing.status === 'sold' ? 'secondary' : 'destructive'}>
                              {listing.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">
                            {new Date(listing.created_at).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => navigate(`/vehicle/${listing.id}`)}
                                title="View"
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              {listing.status === 'active' ? (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => updateListingStatus(listing.id, 'suspended')}
                                  title="Suspend"
                                >
                                  <Ban className="w-4 h-4 text-orange-500" />
                                </Button>
                              ) : (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => updateListingStatus(listing.id, 'active')}
                                  title="Activate"
                                >
                                  <CheckCircle className="w-4 h-4 text-green-500" />
                                </Button>
                              )}
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="icon" title="Delete">
                                    <Trash2 className="w-4 h-4 text-destructive" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Delete Listing?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This will permanently delete this listing. This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => deleteListing(listing.id)} className="bg-destructive text-destructive-foreground">
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {filteredListings.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">No listings found</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Manage Users</CardTitle>
                <CardDescription>View all registered users and their profiles</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead className="hidden sm:table-cell">Phone</TableHead>
                        <TableHead className="hidden md:table-cell">User ID</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {profiles.map((profile) => (
                        <TableRow key={profile.id}>
                          <TableCell className="font-medium">{profile.full_name || "N/A"}</TableCell>
                          <TableCell className="hidden sm:table-cell">{profile.phone || "N/A"}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            <code className="text-xs bg-muted px-1 py-0.5 rounded">
                              {profile.user_id.slice(0, 8)}...
                            </code>
                          </TableCell>
                          <TableCell>
                            {new Date(profile.created_at).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => navigate(`/seller/${profile.user_id}`)}
                                title="View Profile"
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Select onValueChange={(role) => addUserRole(profile.user_id, role as 'admin' | 'moderator' | 'user')}>
                                <SelectTrigger className="w-24 h-8">
                                  <SelectValue placeholder="Add Role" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="admin">Admin</SelectItem>
                                  <SelectItem value="moderator">Moderator</SelectItem>
                                  <SelectItem value="user">User</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {profiles.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">No users found</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Roles Tab */}
          <TabsContent value="roles">
            <Card>
              <CardHeader>
                <CardTitle>User Roles</CardTitle>
                <CardDescription>Manage user permissions and roles</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User ID</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead className="hidden sm:table-cell">Assigned</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {userRoles.map((userRole) => (
                        <TableRow key={userRole.id}>
                          <TableCell>
                            <code className="text-xs bg-muted px-1 py-0.5 rounded">
                              {userRole.user_id.slice(0, 8)}...
                            </code>
                          </TableCell>
                          <TableCell>
                            <Badge variant={userRole.role === 'admin' ? 'default' : userRole.role === 'moderator' ? 'secondary' : 'outline'}>
                              {userRole.role}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            {new Date(userRole.created_at).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="icon" title="Remove Role">
                                  <Trash2 className="w-4 h-4 text-destructive" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Remove Role?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This will remove the {userRole.role} role from this user.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => removeUserRole(userRole.id)} className="bg-destructive text-destructive-foreground">
                                    Remove
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {userRoles.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">No roles assigned yet</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Models Management Tab */}
          <TabsContent value="models">
            <ModelsManagement />
          </TabsContent>

          {/* Ads Management Tab */}
          <TabsContent value="ads">
            <div className="space-y-6">
              {/* Meta Tags Configuration */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Tag className="w-5 h-5" />
                    Ad Network Meta Tags
                  </CardTitle>
                  <CardDescription>
                    Add meta tags for ad network verification (Google AdSense, etc.)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Label htmlFor="metaTags">Meta Tags (paste in &lt;head&gt; section)</Label>
                    <Textarea
                      id="metaTags"
                      placeholder='<meta name="google-adsense-account" content="ca-pub-XXXXXXXXXXXXXXXX">'
                      value={adSettings.metaTags}
                      onChange={(e) => setAdSettings(prev => ({ ...prev, metaTags: e.target.value }))}
                      className="font-mono text-sm min-h-[100px]"
                    />
                    <p className="text-xs text-muted-foreground">
                      Add your ad network verification meta tags here. They will be injected into the page head.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Leaderboard Ad Code */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="w-5 h-5" />
                    Leaderboard Ad Code
                  </CardTitle>
                  <CardDescription>
                    Ad code for top leaderboard ads (320x50 mobile / 728x90 desktop)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Label htmlFor="leaderboardAd">Leaderboard Ad Script</Label>
                    <Textarea
                      id="leaderboardAd"
                      placeholder='<script async src="https://pagead2.googlesyndication.com/..."></script>
<ins class="adsbygoogle" data-ad-client="..." data-ad-slot="..."></ins>'
                      value={adSettings.leaderboardAdCode}
                      onChange={(e) => setAdSettings(prev => ({ ...prev, leaderboardAdCode: e.target.value }))}
                      className="font-mono text-sm min-h-[120px]"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Inline/Rotating Ad Codes */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Megaphone className="w-5 h-5" />
                    Listing Page Inline Ads (Rotating)
                  </CardTitle>
                  <CardDescription>
                    6 ad codes that rotate between vehicle listing cards (300x250 medium rectangle)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    {adSettings.inlineAdCodes.map((code, index) => (
                      <div key={index} className="space-y-2">
                        <Label htmlFor={`inlineAd${index + 1}`}>
                          Ad Slot {index + 1}
                        </Label>
                        <Textarea
                          id={`inlineAd${index + 1}`}
                          placeholder={`<ins class="adsbygoogle" data-ad-slot="slot-${index + 1}"></ins>`}
                          value={code}
                          onChange={(e) => updateInlineAdCode(index, e.target.value)}
                          className="font-mono text-xs min-h-[80px]"
                        />
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-4">
                    These ads will rotate in sequence after every 4 vehicle cards on listing pages.
                  </p>
                </CardContent>
              </Card>

              {/* Vehicle Detail Page Ads */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Car className="w-5 h-5" />
                    Vehicle Detail Page Ads
                  </CardTitle>
                  <CardDescription>
                    Ad codes for specific positions on vehicle detail pages
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="afterImageAd">After Image Section</Label>
                      <Textarea
                        id="afterImageAd"
                        placeholder="Ad code to display between image gallery and vehicle details..."
                        value={adSettings.detailPageAdCodes.afterImage}
                        onChange={(e) => updateDetailPageAdCode('afterImage', e.target.value)}
                        className="font-mono text-sm min-h-[80px]"
                      />
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <Label htmlFor="afterDetailsAd">After Details Section</Label>
                      <Textarea
                        id="afterDetailsAd"
                        placeholder="Ad code to display between vehicle details and price section..."
                        value={adSettings.detailPageAdCodes.afterDetails}
                        onChange={(e) => updateDetailPageAdCode('afterDetails', e.target.value)}
                        className="font-mono text-sm min-h-[80px]"
                      />
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <Label htmlFor="aboveFooterAd">Above Footer</Label>
                      <Textarea
                        id="aboveFooterAd"
                        placeholder="Ad code to display just above the footer section..."
                        value={adSettings.detailPageAdCodes.aboveFooter}
                        onChange={(e) => updateDetailPageAdCode('aboveFooter', e.target.value)}
                        className="font-mono text-sm min-h-[80px]"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Save Button */}
              <div className="flex justify-end">
                <Button onClick={saveAdSettings} disabled={savingAds} size="lg">
                  {savingAds ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  Save Ad Settings
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default Admin;
