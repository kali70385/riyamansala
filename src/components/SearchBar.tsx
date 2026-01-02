import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import ModelAutocomplete from "@/components/ModelAutocomplete";

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="bg-card p-6 rounded-lg shadow-lg border border-border">
      <div className="flex gap-4">
        <ModelAutocomplete
          value={searchValue}
          onChange={setSearchValue}
          placeholder="Search by model name (min 4 letters for suggestions)..."
          className="flex-1"
          minChars={4}
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
