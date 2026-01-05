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
import { ChevronDown, ChevronUp, Filter } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface FilterSidebarProps {
  category?: string;
}

const FilterSidebar = ({ category }: FilterSidebarProps) => {
  const [yearMin, setYearMin] = useState([1979]);
  const [yearMax, setYearMax] = useState([2025]);
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedMake, setSelectedMake] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

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
              <Select onValueChange={setSelectedMake}>
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
                <Select onValueChange={setSelectedType}>
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
              <Select>
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
              <Select>
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
              <Select>
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
              <Select>
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
              <Select>
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

          {/* Type - Hidden when on a category page */}
          {!category && (
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
          )}

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
    </div>
  );
};

export default FilterSidebar;
