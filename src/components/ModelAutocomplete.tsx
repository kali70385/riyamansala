import { useState, useMemo, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { vehicleModels } from "@/data/mockData";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModelAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  selectedType?: string;
  selectedMake?: string;
  placeholder?: string;
  className?: string;
  minChars?: number;
}

const ModelAutocomplete = ({
  value,
  onChange,
  selectedType,
  selectedMake,
  placeholder = "Type model name (min 4 letters for suggestions)...",
  className,
  minChars = 4,
}: ModelAutocompleteProps) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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
    
    // If only make is selected, get all models for that make across categories
    if (selectedMake) {
      const allModels: string[] = [];
      Object.values(vehicleModels).forEach((category) => {
        if (category[selectedMake]) {
          allModels.push(...category[selectedMake]);
        }
      });
      return [...new Set(allModels)].sort();
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
