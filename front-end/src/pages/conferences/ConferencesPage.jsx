import { useQuery } from "@tanstack/react-query";
import { useConferences } from "../../hooks/useConferences";
import HeroSection from "./components/HeroSection";
import { useState } from "react";
import FilterSection from "./components/FilterSection";

function ConferencesPage() {
  const [filters, onFiltersChange] = useState({
    search: "",
    country: [],
    topic: [],
    sortBy: "asc",
    limit: 20
  });
    const {
        data,
        isLoading,
        isError,
  } = useConferences(filters);
  while(isError && isLoading){}

  console.log(data);
  const handleBasicChanges = (e) => {
    e.preventDefault();
    onFiltersChange({
      ...filters,
      [e.target.name]: e.target.value,
    });
  }
  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      onFiltersChange({
        ...filters,
        [e.target.name]: [...filters[e.target.name], e.target.value]
      });
    } else {
      onFiltersChange({
        ...filters,
        [e.target.name]: filters[e.target.name].filter(el=> el!==e.target.value),
      });
    }
      
  };
  return <div>
    <HeroSection value={filters.search} onValueChange={handleBasicChanges} />
    <FilterSection state={filters} onValueChange={handleCheckboxChange} />
  </div>;
}

export default ConferencesPage;
