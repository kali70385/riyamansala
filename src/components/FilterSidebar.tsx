import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { makes, types, conditions, priceRanges, districts } from "@/data/mockData";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const FilterSidebar = () => {
  const [expandedSections, setExpandedSections] = useState({
    make: true,
    type: true,
    condition: true,
    price: true,
    location: false,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-sm p-4">
      <h3 className="font-semibold text-lg mb-4">Filters</h3>

      {/* Make */}
      <div className="mb-4">
        <button
          onClick={() => toggleSection("make")}
          className="flex items-center justify-between w-full mb-2 font-medium text-sm"
        >
          Make
          {expandedSections.make ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
        {expandedSections.make && (
          <ScrollArea className="h-48">
            <div className="space-y-2">
              {makes.map((make) => (
                <div key={make} className="flex items-center space-x-2">
                  <Checkbox id={`make-${make}`} />
                  <Label
                    htmlFor={`make-${make}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {make}
                  </Label>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </div>

      <Separator className="my-4" />

      {/* Type */}
      <div className="mb-4">
        <button
          onClick={() => toggleSection("type")}
          className="flex items-center justify-between w-full mb-2 font-medium text-sm"
        >
          Type
          {expandedSections.type ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
        {expandedSections.type && (
          <div className="space-y-2">
            {types.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox id={`type-${type}`} />
                <Label
                  htmlFor={`type-${type}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {type}
                </Label>
              </div>
            ))}
          </div>
        )}
      </div>

      <Separator className="my-4" />

      {/* Condition */}
      <div className="mb-4">
        <button
          onClick={() => toggleSection("condition")}
          className="flex items-center justify-between w-full mb-2 font-medium text-sm"
        >
          Condition
          {expandedSections.condition ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
        {expandedSections.condition && (
          <div className="space-y-2">
            {conditions.map((condition) => (
              <div key={condition} className="flex items-center space-x-2">
                <Checkbox id={`condition-${condition}`} />
                <Label
                  htmlFor={`condition-${condition}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {condition}
                </Label>
              </div>
            ))}
          </div>
        )}
      </div>

      <Separator className="my-4" />

      {/* Price Range */}
      <div className="mb-4">
        <button
          onClick={() => toggleSection("price")}
          className="flex items-center justify-between w-full mb-2 font-medium text-sm"
        >
          Price Range
          {expandedSections.price ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
        {expandedSections.price && (
          <ScrollArea className="h-48">
            <div className="space-y-2">
              {priceRanges.map((range) => (
                <div key={range.label} className="flex items-center space-x-2">
                  <Checkbox id={`price-${range.label}`} />
                  <Label
                    htmlFor={`price-${range.label}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {range.label}
                  </Label>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </div>

      <Separator className="my-4" />

      {/* Location */}
      <div className="mb-4">
        <button
          onClick={() => toggleSection("location")}
          className="flex items-center justify-between w-full mb-2 font-medium text-sm"
        >
          District
          {expandedSections.location ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
        {expandedSections.location && (
          <ScrollArea className="h-48">
            <div className="space-y-2">
              {districts.map((district) => (
                <div key={district.name} className="flex items-center space-x-2">
                  <Checkbox id={`district-${district.name}`} />
                  <Label
                    htmlFor={`district-${district.name}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {district.name}
                  </Label>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </div>
    </div>
  );
};

export default FilterSidebar;
