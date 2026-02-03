import { useState, useMemo, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { vehicleModelsData } from "@/data/vehicleModels";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModelAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  selectedType?: string;
  selectedMake?: string;
  selectedCategory?: string; // URL category like "cars", "suvs", etc.
  placeholder?: string;
  className?: string;
  minChars?: number;
}

const ModelAutocomplete = ({
  value,
  onChange,
  selectedType,
  selectedMake,
  selectedCategory,
  placeholder = "Type model name (min 2 letters for suggestions)...",
  className,
  minChars = 2,
}: ModelAutocompleteProps) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Map URL category to vehicleModels key
  const urlCategoryToModelsKey: Record<string, string> = {
    "cars": "Cars",
    "suvs": "SUVs",
    "vans": "Vans",
    "motorbikes": "Motorbikes",
    "three-wheel": "Three Wheel",
    "pickups": "Pickups",
    "lorries": "Lorries",
    "heavy-duty": "Heavy-Duty",
    "spare-parts": "Spare Parts",
    "atvs": "ATVs",
    "side-by-sides": "Side-by-Sides",
    "taxis": "Taxis",
    "military": "Military",
  };

  // Map type to vehicleModels key
  const typeToModelsKey: Record<string, string> = {
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

  // Get available models based on selected category, type, and make
  const availableModels = useMemo(() => {
    // Determine which category to filter by (URL category takes precedence)
    const modelsCategory = selectedCategory 
      ? urlCategoryToModelsKey[selectedCategory.toLowerCase()] 
      : selectedType 
        ? typeToModelsKey[selectedType] 
        : null;

    // If we have a category and make, filter by both
    if (modelsCategory && selectedMake) {
      if (!vehicleModelsData[modelsCategory]) return [];
      return vehicleModelsData[modelsCategory][selectedMake] || [];
    }

    // If only category is selected, get all models for that category
    if (modelsCategory) {
      if (!vehicleModelsData[modelsCategory]) return [];
      const allModels: string[] = [];
      Object.values(vehicleModelsData[modelsCategory]).forEach((models) => {
        allModels.push(...models);
      });
      return [...new Set(allModels)].sort();
    }
    
    // If only make is selected, get all models for that make across categories
    if (selectedMake) {
      const allModels: string[] = [];
      Object.values(vehicleModelsData).forEach((category) => {
        if (category[selectedMake]) {
          allModels.push(...category[selectedMake]);
        }
      });
      return [...new Set(allModels)].sort();
    }
    
    // Otherwise, return all models from all categories, sorted alphabetically
    const allModels: string[] = [];
    Object.values(vehicleModelsData).forEach((category) => {
      Object.values(category).forEach((models) => {
        allModels.push(...models);
      });
    });
    
    // Remove duplicates and sort
    return [...new Set(allModels)].sort();
  }, [selectedType, selectedMake, selectedCategory]);

  const filteredModels = useMemo(() => {
    if (value.length < minChars) return [];
    return availableModels.filter((model) =>
      model.toLowerCase().includes(value.toLowerCase())
    );
  }, [value, availableModels, minChars]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    setShowSuggestions(newValue.length >= minChars && filteredModels.length > 0);
  };

  const handleFocus = () => {
    if (value.length >= minChars && filteredModels.length > 0) {
      setShowSuggestions(true);
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update suggestions visibility when filtered models change
  useEffect(() => {
    if (value.length >= minChars && filteredModels.length > 0) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [filteredModels, value, minChars]);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <Input
        value={value}
        onChange={handleInputChange}
        onFocus={handleFocus}
        placeholder={placeholder}
        className="w-full"
      />
      {showSuggestions && filteredModels.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-popover border border-border rounded-md shadow-lg max-h-[300px] overflow-auto">
          <Command className="bg-popover">
            <CommandList>
              <CommandGroup>
                {filteredModels.slice(0, 50).map((model) => (
                  <CommandItem
                    key={model}
                    value={model}
                    onSelect={(selectedValue) => {
                      onChange(selectedValue);
                      setShowSuggestions(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === model ? "opacity-100" : "opacity-0"
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
  );
};

export default ModelAutocomplete;
