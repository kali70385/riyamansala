import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { makes, types, conditions, priceRanges, districts, transmissions, fuelTypes } from "@/data/mockData";
import { useState } from "react";
import ModelAutocomplete from "@/components/ModelAutocomplete";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Filter, Search, X } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export interface FilterValues {
  model: string;
  make: string;
  type: string;
  condition: string;
  priceRange: string;
  district: string;
  yearMin: number;
  yearMax: number;
  transmission: string;
  fuelType: string;
}

interface FilterSidebarProps {
  category?: string;
  onSearch?: (filters: FilterValues) => void;
}

const FilterSidebar = ({ category, onSearch }: FilterSidebarProps) => {
  const [yearMin, setYearMin] = useState([1979]);
  const [yearMax, setYearMax] = useState([2025]);
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedMake, setSelectedMake] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");

  // Clear model when make changes (since models are make-specific)
  const handleMakeChange = (newMake: string) => {
    setSelectedMake(newMake);
    setSelectedModel(""); // Clear model when make changes
  };

  // Clear model when type changes (since models are category-specific)
  const handleTypeChange = (newType: string) => {
    setSelectedType(newType);
    setSelectedModel(""); // Clear model when type changes
  };
  const [selectedCondition, setSelectedCondition] = useState<string>("");
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedTransmission, setSelectedTransmission] = useState<string>("");
  const [selectedFuelType, setSelectedFuelType] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSearch = () => {
    const filters: FilterValues = {
      model: selectedModel,
      make: selectedMake,
      type: selectedType,
      condition: selectedCondition,
      priceRange: selectedPriceRange,
      district: selectedDistrict,
      yearMin: yearMin[0],
      yearMax: yearMax[0],
      transmission: selectedTransmission,
      fuelType: selectedFuelType,
    };
    onSearch?.(filters);
    setIsOpen(false); // Close mobile filter on search
  };

  const handleClearFilters = () => {
    setSelectedModel("");
    setSelectedMake("");
    setSelectedType("");
    setSelectedCondition("");
    setSelectedPriceRange("");
    setSelectedDistrict("");
    setYearMin([1979]);
    setYearMax([2025]);
    setSelectedTransmission("");
    setSelectedFuelType("");
    
    // Also trigger search with cleared values
    const clearedFilters: FilterValues = {
      model: "",
      make: "",
      type: "",
      condition: "",
      priceRange: "",
      district: "",
      yearMin: 1979,
      yearMax: 2025,
      transmission: "",
      fuelType: "",
    };
    onSearch?.(clearedFilters);
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-sm p-3 md:p-4">
      {/* Mobile: Collapsible header */}
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="md:hidden">
        <CollapsibleTrigger asChild>
          <Button 
            variant="ghost" 
            className="w-full flex items-center justify-between p-0 h-auto hover:bg-transparent"
          >
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span className="font-semibold text-base">Filters</span>
            </div>
            {isOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </CollapsibleTrigger>
        
        <CollapsibleContent className="mt-3">
          <div className="grid grid-cols-2 gap-2">
            {/* Model - Full width on mobile */}
            <div className="col-span-2 space-y-1">
              <Label className="text-xs font-medium">Model</Label>
              <ModelAutocomplete
                value={selectedModel}
                onChange={setSelectedModel}
                selectedType={selectedType}
                selectedMake={selectedMake}
                selectedCategory={category}
                placeholder="Type model..."
              />
            </div>

            {/* Make */}
            <div className="space-y-1">
              <Label className="text-xs font-medium">Make</Label>
              <Select value={selectedMake} onValueChange={handleMakeChange}>
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue placeholder="Make" />
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

            {/* Type - Hidden when on a category page */}
            {!category && (
              <div className="space-y-1">
                <Label className="text-xs font-medium">Type</Label>
                <Select value={selectedType} onValueChange={handleTypeChange}>
                  <SelectTrigger className="h-9 text-sm">
                    <SelectValue placeholder="Type" />
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
            )}

            {/* Condition */}
            <div className="space-y-1">
              <Label className="text-xs font-medium">Condition</Label>
              <Select value={selectedCondition} onValueChange={setSelectedCondition}>
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue placeholder="Condition" />
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
            <div className="space-y-1">
              <Label className="text-xs font-medium">Price</Label>
              <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue placeholder="Price" />
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
            <div className="space-y-1">
              <Label className="text-xs font-medium">District</Label>
              <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue placeholder="District" />
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
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <Label className="text-xs font-medium">Year Min</Label>
                <span className="text-xs text-muted-foreground">{yearMin[0]}</span>
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
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <Label className="text-xs font-medium">Year Max</Label>
                <span className="text-xs text-muted-foreground">{yearMax[0]}</span>
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
            <div className="space-y-1">
              <Label className="text-xs font-medium">Gear</Label>
              <Select value={selectedTransmission} onValueChange={setSelectedTransmission}>
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue placeholder="Gear" />
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
            <div className="space-y-1">
              <Label className="text-xs font-medium">Fuel</Label>
              <Select value={selectedFuelType} onValueChange={setSelectedFuelType}>
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue placeholder="Fuel" />
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

            {/* Search Button - Mobile */}
            <div className="col-span-2 flex gap-2 mt-2">
              <Button 
                onClick={handleClearFilters} 
                variant="outline" 
                className="flex-1"
              >
                <X className="h-4 w-4 mr-1" />
                Clear
              </Button>
              <Button 
                onClick={handleSearch} 
                className="flex-1"
              >
                <Search className="h-4 w-4 mr-1" />
                Search
              </Button>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Desktop: Always visible */}
      <div className="hidden md:block">
        <h3 className="font-semibold text-lg mb-4">Filters</h3>
        
        <div className="grid grid-cols-2 gap-4">
          {/* Model - FIRST FILTER */}
          <div className="space-y-2 col-span-2">
            <Label className="text-sm font-medium">Model</Label>
            <ModelAutocomplete
              value={selectedModel}
              onChange={setSelectedModel}
              selectedType={selectedType}
              selectedMake={selectedMake}
              selectedCategory={category}
              placeholder="Type model name (min 2 letters)..."
            />
          </div>

          {/* Make */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Make</Label>
            <Select value={selectedMake} onValueChange={handleMakeChange}>
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

          {/* Type - Hidden when on a category page */}
          {!category && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">Type</Label>
              <Select value={selectedType} onValueChange={handleTypeChange}>
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
          )}

          {/* Condition */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Condition</Label>
            <Select value={selectedCondition} onValueChange={setSelectedCondition}>
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
            <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
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
            <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
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
            <Select value={selectedTransmission} onValueChange={setSelectedTransmission}>
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
            <Select value={selectedFuelType} onValueChange={setSelectedFuelType}>
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

          {/* Search Button - Desktop */}
          <div className="col-span-2 flex gap-2 mt-2">
            <Button 
              onClick={handleClearFilters} 
              variant="outline" 
              className="flex-1"
            >
              <X className="h-4 w-4 mr-1" />
              Clear Filters
            </Button>
            <Button 
              onClick={handleSearch} 
              className="flex-1"
            >
              <Search className="h-4 w-4 mr-1" />
              Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
