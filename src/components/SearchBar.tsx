import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SearchBar = () => {
  return (
    <div className="bg-card p-6 rounded-lg shadow-lg border border-border">
      <div className="flex gap-4">
        <Input
          placeholder="Search by keyword..."
          className="flex-1"
        />
        
        <Button className="bg-primary hover:bg-primary/90">
          <Search className="w-4 h-4 mr-2" />
          Search
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
