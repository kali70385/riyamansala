import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { makes, types, conditions, priceRanges, districts, transmissions, fuelTypes, vehicleModels, categories } from "@/data/mockData";
import { useState, useMemo } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const FilterSidebar = () => {
  const [yearMin, setYearMin] = useState([1979]);
  const [yearMax, setYearMax] = useState([2025]);
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedMake, setSelectedMake] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  // Get available models based on selected type and make
  const availableModels = useMemo(() => {
    // If both type and make are selected, filter by them
    if (selectedType && selectedMake) {
      const categoryMap: Record<string, string> = {
        "Car": "Cars",
        "Van": "Vans",
        "SUV/Jeep": "SUVs",
        "Three Wheel": "Three Wheel",
        "Pickup/Double Cab": "Pickups",
        "Crew Cab": "Pickups",
        "Lorry/Tipper": "Lorries",
        "Heavy-Duty": "Heavy-Duty",
        "Motorcycle": "Motorbikes",
        "Bus": "Vans",
      };
      
      const category = categoryMap[selectedType];
      if (!category || !vehicleModels[category]) return [];
      
      return vehicleModels[category][selectedMake] || [];
    }
    
    // Otherwise, return all models from all categories, sorted alphabetically
    const allModels: string[] = [];
    Object.values(vehicleModels).forEach((category) => {
      Object.values(category).forEach((models) => {
        allModels.push(...models);
      });
    });
    
    // Remove duplicates and sort
    return [...new Set(allModels)].sort();
  }, [selectedType, selectedMake]);

  return (
    <div className="bg-card rounded-lg border border-border shadow-sm p-4">
      <h3 className="font-semibold text-lg mb-4">Filters</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Model - FIRST FILTER */}
        <div className="space-y-2 md:col-span-2">
          <Label className="text-sm font-medium">Model</Label>
          <div className="relative">
            <Input
              value={selectedModel}
              onChange={(e) => {
                setSelectedModel(e.target.value);
                // Show suggestions if 4+ characters typed and matches found
                setShowSuggestions(
                  e.target.value.length >= 4 && 
                  availableModels.filter((model) => 
                    model.toLowerCase().includes(e.target.value.toLowerCase())
                  ).length > 0
                );
              }}
              onFocus={() => {
                // Show suggestions on focus if criteria met
                if (selectedModel.length >= 4 && availableModels.filter((model) => 
                  model.toLowerCase().includes(selectedModel.toLowerCase())
                ).length > 0) {
                  setShowSuggestions(true);
                }
              }}
              onBlur={() => {
                // Delay to allow click on suggestion
                setTimeout(() => setShowSuggestions(false), 200);
              }}
              placeholder="Type model name (min 4 letters for suggestions)..."
              className="w-full"
            />
            {showSuggestions && selectedModel.length >= 4 && (
              <div className="absolute z-50 w-full mt-1 bg-popover border border-border rounded-md shadow-lg max-h-[300px] overflow-auto">
                <Command className="bg-popover">
                  <CommandList>
                    <CommandGroup>
                      {availableModels
                        .filter((model) => 
                          model.toLowerCase().includes(selectedModel.toLowerCase())
                        )
                        .slice(0, 50)
                        .map((model) => (
                          <CommandItem
                            key={model}
                            value={model}
                            onSelect={(value) => {
                              setSelectedModel(value);
                              setShowSuggestions(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                selectedModel === model ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {model}
                          </CommandItem>
                        ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </div>
            )}
          </div>
        </div>

        {/* Make */}
        <div className="space-y-2">
        <Label className="text-sm font-medium">Make</Label>
        <Select onValueChange={setSelectedMake}>
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

        {/* Type */}
        <div className="space-y-2">
        <Label className="text-sm font-medium">Type</Label>
        <Select onValueChange={setSelectedType}>
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            {types.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        </div>

        {/* Condition */}
        <div className="space-y-2">
        <Label className="text-sm font-medium">Condition</Label>
        <Select>
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

        {/* Price Range */}
        <div className="space-y-2">
        <Label className="text-sm font-medium">Price Range</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select price range" />
          </SelectTrigger>
          <SelectContent>
            {priceRanges.map((range) => (
              <SelectItem key={range.label} value={range.label}>
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        </div>

        {/* District */}
        <div className="space-y-2">
        <Label className="text-sm font-medium">District</Label>
        <Select>
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

        {/* Year Min */}
        <div className="space-y-3">
        <div className="flex justify-between items-center">
          <Label className="text-sm font-medium">Year (Min)</Label>
          <span className="text-sm text-muted-foreground">{yearMin[0]}</span>
        </div>
        <Slider
          value={yearMin}
          onValueChange={setYearMin}
          min={1979}
          max={2025}
          step={1}
          className="w-full"
        />
        </div>

        {/* Year Max */}
        <div className="space-y-3">
        <div className="flex justify-between items-center">
          <Label className="text-sm font-medium">Year (Max)</Label>
          <span className="text-sm text-muted-foreground">{yearMax[0]}</span>
        </div>
        <Slider
          value={yearMax}
          onValueChange={setYearMax}
          min={1979}
          max={2025}
          step={1}
          className="w-full"
        />
        </div>

        {/* Transmission */}
        <div className="space-y-2">
        <Label className="text-sm font-medium">Gear</Label>
        <Select>
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

        {/* Fuel Type */}
        <div className="space-y-2">
        <Label className="text-sm font-medium">Fuel</Label>
        <Select>
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
      </div>
    </div>
  );
};

export default FilterSidebar;
