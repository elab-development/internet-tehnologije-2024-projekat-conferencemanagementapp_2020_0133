import { useQuery } from "@tanstack/react-query";
import { useConferences } from "../../hooks/useConferences";
import HeroSection from "./components/HeroSection";
import { useState } from "react";

function ConferencesPage() {
  const [filters, onFiltersChange] = useState({
    title: "",
    country: [],
    topics: [],
    sortBy: "asc",
    limit: 20
  });
    const {
        data: topicData,
        isLoading: topicIsLoading,
        isError: topicIsError,
    } = useConferences();

  const handleChanges = (e) => {
    e.preventDefault();
    if (e.target.name === "sortBy") {
    
      return;
    }

    onFiltersChange({
      ...filters,
      [e.target.name]: e.target.value
    })

  }
  return <div>
    <HeroSection value={ filters.title } onValueChange={handleChanges} />
  </div>;
}

export default ConferencesPage;
