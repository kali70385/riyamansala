import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Loader2, Plus, Trash2, Search, Edit2, Check, X, Upload } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Categories available in the system
const CATEGORIES = [
  "Cars",
  "SUVs",
  "Vans",
  "Motorbikes",
  "Three-Wheelers",
  "Trucks",
  "Buses",
  "Lorries",
  "Pickups",
  "Tractors",
  "Heavy-Duty",
  "ATVs",
  "Side-by-Sides",
  "Taxis",
  "Military",
  "Spare Parts",
];

interface VehicleMake {
  id: string;
  category: string;
  make: string;
  created_at: string;
}

const MakesManagement = () => {
  const [makes, setMakes] = useState<VehicleMake[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  
  // Add make form state
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [newMake, setNewMake] = useState("");
  const [adding, setAdding] = useState(false);
  
  // Edit state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editMake, setEditMake] = useState("");
  
  // Bulk import state
  const [bulkDialogOpen, setBulkDialogOpen] = useState(false);
  const [bulkCategory, setBulkCategory] = useState("");
  const [bulkMakes, setBulkMakes] = useState("");
  const [importing, setImporting] = useState(false);

  useEffect(() => {
    fetchMakes();
  }, []);

  const fetchMakes = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("vehicle_makes")
      .select("*")
      .order("category", { ascending: true })
      .order("make", { ascending: true });

    if (error) {
      console.error("Error fetching makes:", error);
      toast.error("Failed to fetch vehicle makes");
    } else {
      setMakes(data || []);
    }
    setLoading(false);
  };

  const addMake = async () => {
    if (!newCategory || !newMake) {
      toast.error("Please fill in all fields");
      return;
    }

    setAdding(true);
    const { error } = await supabase
      .from("vehicle_makes")
      .insert({
        category: newCategory,
        make: newMake.trim(),
      });

    if (error) {
      if (error.code === "23505") {
        toast.error("This make already exists for this category");
      } else {
        toast.error("Failed to add make");
        console.error(error);
      }
    } else {
      toast.success("Make added successfully");
      setNewCategory("");
      setNewMake("");
      setAddDialogOpen(false);
      fetchMakes();
    }
    setAdding(false);
  };

  const updateMake = async (id: string) => {
    if (!editMake.trim()) {
      toast.error("Make name cannot be empty");
      return;
    }

    const { error } = await supabase
      .from("vehicle_makes")
      .update({ make: editMake.trim() })
      .eq("id", id);

    if (error) {
      toast.error("Failed to update make");
      console.error(error);
    } else {
      toast.success("Make updated successfully");
      setEditingId(null);
      fetchMakes();
    }
  };

  const deleteMake = async (id: string) => {
    const { error } = await supabase
      .from("vehicle_makes")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error("Failed to delete make");
      console.error(error);
    } else {
      toast.success("Make deleted successfully");
      fetchMakes();
    }
  };

  const bulkImportMakes = async () => {
    if (!bulkCategory || !bulkMakes.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    const makesList = bulkMakes
      .split("\n")
      .map((m) => m.trim())
      .filter((m) => m.length > 0);

    if (makesList.length === 0) {
      toast.error("No valid makes to import");
      return;
    }

    setImporting(true);
    const makesToInsert = makesList.map((make) => ({
      category: bulkCategory,
      make,
    }));

    const { error, data } = await supabase
      .from("vehicle_makes")
      .insert(makesToInsert)
      .select();

    if (error) {
      if (error.code === "23505") {
        toast.error("Some makes already exist. Try adding them individually.");
      } else {
        toast.error("Failed to import makes");
        console.error(error);
      }
    } else {
      toast.success(`Successfully imported ${data?.length || 0} makes`);
      setBulkCategory("");
      setBulkMakes("");
      setBulkDialogOpen(false);
      fetchMakes();
    }
    setImporting(false);
  };

  // Filter makes
  const filteredMakes = makes.filter((make) => {
    const matchesSearch = make.make.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || make.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Group makes by category for stats
  const makesByCategory = makes.reduce((acc, make) => {
    acc[make.category] = (acc[make.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Actions Bar */}
      <Card>
        <CardHeader>
          <CardTitle>Vehicle Makes Management</CardTitle>
          <CardDescription>
            Manage vehicle makes for all categories. Total: {makes.length} makes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search makes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Add Make Button */}
            <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Make
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Vehicle Make</DialogTitle>
                  <DialogDescription>
                    Add a new vehicle make to a category.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select value={newCategory} onValueChange={setNewCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Make</Label>
                    <Input
                      placeholder="e.g., Toyota, Honda, Suzuki"
                      value={newMake}
                      onChange={(e) => setNewMake(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={addMake} disabled={adding}>
                    {adding && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    Add Make
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Bulk Import Button */}
            <Dialog open={bulkDialogOpen} onOpenChange={setBulkDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Upload className="w-4 h-4" />
                  Bulk Import
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Bulk Import Makes</DialogTitle>
                  <DialogDescription>
                    Import multiple makes for a single category at once.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select value={bulkCategory} onValueChange={setBulkCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Makes (one per line)</Label>
                    <textarea
                      className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Toyota&#10;Honda&#10;Suzuki&#10;Nissan"
                      value={bulkMakes}
                      onChange={(e) => setBulkMakes(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setBulkDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={bulkImportMakes} disabled={importing}>
                    {importing && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    Import Makes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Makes Table */}
      <Card>
        <CardContent className="pt-6">
          {filteredMakes.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              {makes.length === 0
                ? "No vehicle makes in database. Start by adding some!"
                : "No makes found matching your filters"}
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead>Make</TableHead>
                    <TableHead className="hidden md:table-cell">Added</TableHead>
                    <TableHead className="w-24">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMakes.map((make) => (
                    <TableRow key={make.id}>
                      <TableCell>
                        <Badge variant="outline">{make.category}</Badge>
                      </TableCell>
                      <TableCell className="font-medium">
                        {editingId === make.id ? (
                          <div className="flex items-center gap-2">
                            <Input
                              value={editMake}
                              onChange={(e) => setEditMake(e.target.value)}
                              className="h-8 w-40"
                            />
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8"
                              onClick={() => updateMake(make.id)}
                            >
                              <Check className="w-4 h-4 text-green-500" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8"
                              onClick={() => setEditingId(null)}
                            >
                              <X className="w-4 h-4 text-destructive" />
                            </Button>
                          </div>
                        ) : (
                          make.make
                        )}
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-muted-foreground text-sm">
                        {new Date(make.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {editingId !== make.id && (
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setEditingId(make.id);
                                setEditMake(make.make);
                              }}
                              title="Edit"
                            >
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="icon" title="Delete">
                                  <Trash2 className="w-4 h-4 text-destructive" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Make</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete "{make.make}" from {make.category}?
                                    This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => deleteMake(make.id)}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Category Summary */}
      {makes.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Makes per Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {Object.entries(makesByCategory)
                .sort((a, b) => b[1] - a[1])
                .map(([category, count]) => (
                  <Badge key={category} variant="secondary" className="text-sm">
                    {category}: {count}
                  </Badge>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MakesManagement;
