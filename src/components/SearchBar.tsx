import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { makes, types, conditions } from "@/data/mockData";

const SearchBar = () => {
  return (
    <div className="bg-card p-6 rounded-lg shadow-lg border border-border">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Input
          placeholder="Search by keyword..."
          className="lg:col-span-2"
        />
        
        <Select>
          <SelectTrigger className="bg-background">
            <SelectValue placeholder="Make" />
          </SelectTrigger>
          <SelectContent className="bg-popover max-h-[300px]">
            {makes.map((make) => (
              <SelectItem key={make} value={make.toLowerCase()}>
                {make}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="bg-background">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent className="bg-popover max-h-[300px]">
            {types.map((type) => (
              <SelectItem key={type} value={type.toLowerCase()}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button className="bg-primary hover:bg-primary/90">
          <Search className="w-4 h-4 mr-2" />
          Search
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <Select>
          <SelectTrigger className="bg-background">
            <SelectValue placeholder="Condition" />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            {conditions.map((condition) => (
              <SelectItem key={condition} value={condition.toLowerCase()}>
                {condition}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input type="number" placeholder="Min Price (LKR)" />
        <Input type="number" placeholder="Max Price (LKR)" />
      </div>
    </div>
  );
};

export default SearchBar;
