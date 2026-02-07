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

interface VehicleModel {
  id: string;
  category: string;
  make: string;
  model: string;
  created_at: string;
}

const ModelsManagement = () => {
  const [models, setModels] = useState<VehicleModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [makeFilter, setMakeFilter] = useState("all");
  
  // Add model form state
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [newMake, setNewMake] = useState("");
  const [newModel, setNewModel] = useState("");
  const [adding, setAdding] = useState(false);
  
  // Edit state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editModel, setEditModel] = useState("");
  
  // Bulk import state
  const [bulkDialogOpen, setBulkDialogOpen] = useState(false);
  const [bulkCategory, setBulkCategory] = useState("");
  const [bulkMake, setBulkMake] = useState("");
  const [bulkModels, setBulkModels] = useState("");
  const [importing, setImporting] = useState(false);

  useEffect(() => {
    fetchModels();
  }, []);

  const fetchModels = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("vehicle_models")
      .select("*")
      .order("category", { ascending: true })
      .order("make", { ascending: true })
      .order("model", { ascending: true });

    if (error) {
      console.error("Error fetching models:", error);
      toast.error("Failed to fetch vehicle models");
    } else {
      setModels(data || []);
    }
    setLoading(false);
  };

  const addModel = async () => {
    if (!newCategory || !newMake || !newModel) {
      toast.error("Please fill in all fields");
      return;
    }

    setAdding(true);
    const { error } = await supabase
      .from("vehicle_models")
      .insert({
        category: newCategory,
        make: newMake.trim(),
        model: newModel.trim(),
      });

    if (error) {
      if (error.code === "23505") {
        toast.error("This model already exists");
      } else {
        toast.error("Failed to add model");
        console.error(error);
      }
    } else {
      toast.success("Model added successfully");
      setNewCategory("");
      setNewMake("");
      setNewModel("");
      setAddDialogOpen(false);
      fetchModels();
    }
    setAdding(false);
  };

  const updateModel = async (id: string) => {
    if (!editModel.trim()) {
      toast.error("Model name cannot be empty");
      return;
    }

    const { error } = await supabase
      .from("vehicle_models")
      .update({ model: editModel.trim() })
      .eq("id", id);

    if (error) {
      toast.error("Failed to update model");
      console.error(error);
    } else {
      toast.success("Model updated successfully");
      setEditingId(null);
      fetchModels();
    }
  };

  const deleteModel = async (id: string) => {
    const { error } = await supabase
      .from("vehicle_models")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error("Failed to delete model");
      console.error(error);
    } else {
      toast.success("Model deleted successfully");
      fetchModels();
    }
  };

  const bulkImportModels = async () => {
    if (!bulkCategory || !bulkMake || !bulkModels.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    const modelsList = bulkModels
      .split("\n")
      .map((m) => m.trim())
      .filter((m) => m.length > 0);

    if (modelsList.length === 0) {
      toast.error("No valid models to import");
      return;
    }

    setImporting(true);
    const modelsToInsert = modelsList.map((model) => ({
      category: bulkCategory,
      make: bulkMake.trim(),
      model,
    }));

    const { error, data } = await supabase
      .from("vehicle_models")
      .insert(modelsToInsert)
      .select();

    if (error) {
      if (error.code === "23505") {
        toast.error("Some models already exist. Try adding them individually.");
      } else {
        toast.error("Failed to import models");
        console.error(error);
      }
    } else {
      toast.success(`Successfully imported ${data?.length || 0} models`);
      setBulkCategory("");
      setBulkMake("");
      setBulkModels("");
      setBulkDialogOpen(false);
      fetchModels();
    }
    setImporting(false);
  };

  // Get unique makes from current models for filter
  const uniqueMakes = [...new Set(models.map((m) => m.make))].sort();

  // Filter models
  const filteredModels = models.filter((model) => {
    const matchesSearch =
      model.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      model.make.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || model.category === categoryFilter;
    const matchesMake = makeFilter === "all" || model.make === makeFilter;
    return matchesSearch && matchesCategory && matchesMake;
  });

  // Group models by category and make for display
  const groupedModels = filteredModels.reduce((acc, model) => {
    const key = `${model.category}|${model.make}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(model);
    return acc;
  }, {} as Record<string, VehicleModel[]>);

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
          <CardTitle>Vehicle Models Management</CardTitle>
          <CardDescription>
            Manage vehicle models for all categories. Total: {models.length} models
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search models..."
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

            {/* Make Filter */}
            <Select value={makeFilter} onValueChange={setMakeFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Make" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Makes</SelectItem>
                {uniqueMakes.map((make) => (
                  <SelectItem key={make} value={make}>
                    {make}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Add Model Button */}
            <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Model
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Vehicle Model</DialogTitle>
                  <DialogDescription>
                    Add a new vehicle model to the database.
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
                  <div className="space-y-2">
                    <Label>Model</Label>
                    <Input
                      placeholder="e.g., Corolla, Civic, Swift"
                      value={newModel}
                      onChange={(e) => setNewModel(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={addModel} disabled={adding}>
                    {adding && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    Add Model
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
                  <DialogTitle>Bulk Import Models</DialogTitle>
                  <DialogDescription>
                    Import multiple models for a single make at once.
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
                    <Label>Make</Label>
                    <Input
                      placeholder="e.g., Toyota"
                      value={bulkMake}
                      onChange={(e) => setBulkMake(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Models (one per line)</Label>
                    <textarea
                      className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Corolla&#10;Camry&#10;Prius&#10;Yaris"
                      value={bulkModels}
                      onChange={(e) => setBulkModels(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setBulkDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={bulkImportModels} disabled={importing}>
                    {importing && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    Import Models
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Models Table */}
      <Card>
        <CardContent className="pt-6">
          {filteredModels.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              {models.length === 0
                ? "No vehicle models in database. Start by adding some!"
                : "No models found matching your filters"}
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead>Make</TableHead>
                    <TableHead>Model</TableHead>
                    <TableHead className="hidden md:table-cell">Added</TableHead>
                    <TableHead className="w-24">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredModels.map((model) => (
                    <TableRow key={model.id}>
                      <TableCell>
                        <Badge variant="outline">{model.category}</Badge>
                      </TableCell>
                      <TableCell className="font-medium">{model.make}</TableCell>
                      <TableCell>
                        {editingId === model.id ? (
                          <div className="flex items-center gap-2">
                            <Input
                              value={editModel}
                              onChange={(e) => setEditModel(e.target.value)}
                              className="h-8 w-40"
                            />
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8"
                              onClick={() => updateModel(model.id)}
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
                          model.model
                        )}
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-muted-foreground text-sm">
                        {new Date(model.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {editingId !== model.id && (
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setEditingId(model.id);
                                setEditModel(model.model);
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
                                  <AlertDialogTitle>Delete Model?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This will permanently delete "{model.make} {model.model}" from {model.category}.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => deleteModel(model.id)}
                                    className="bg-destructive text-destructive-foreground"
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
          
          {filteredModels.length > 0 && (
            <p className="text-sm text-muted-foreground mt-4 text-center">
              Showing {filteredModels.length} of {models.length} models
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ModelsManagement;
