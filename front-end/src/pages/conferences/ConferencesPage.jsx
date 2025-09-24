import { useQuery } from "@tanstack/react-query";
import { useConferences } from "../../hooks/useConferences";
import HeroSection from "./components/HeroSection";
import { useMemo, useState } from "react";
import FilterSection from "./components/FilterSection";
import ConferenceListSection from "./components/ConferenceListSection";

function ConferencesPage() {
  const [filters, onFiltersChange] = useState({
    search: "",
    country: [],
    topic: [],
    sortBy: "asc",
    limit: 20,
    page: 0,
  });
  const [filter, onFilterChange] = useState({
    search: "",
    country: [],
    topic: [],
    sortBy: "asc",
    limit: 20,
    page: 0,
  });
  const { data, isLoading, isError, refetch } = useConferences(filters);

  const handleBasicChanges = (e) => {
    const newFilter = {
      ...filter,
      [e.target.name]: e.target.value,
      page: 0,
    };
    onFilterChange(newFilter);

    console.log(filter);
    if (e.target.name === "sortBy") {
      onFiltersChange(newFilter);
    }
  };
  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      onFilterChange({
        ...filter,
        [e.target.name]: [...filter[e.target.name], e.target.value],
        page: 0,
      });
    } else {
      onFilterChange({
        ...filter,
        [e.target.name]: filter[e.target.name].filter(
          (el) => el !== e.target.value
        ),
        page: 0,
      });
    }
  };
  const clearFilter = () => {
    const newFilter = {
      ...filter,
      "country": [],
      "topic": [],
      "page": 0
    };
    onFilterChange(newFilter);

    onFiltersChange(newFilter);
  };
  const paginationClick = (page) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    onFiltersChange({
      ...filters,
      "page": page
    });
     
  }
  return (
    <div>
      <HeroSection
        value={filter}
        onValueChange={handleBasicChanges}
        onClick={() => onFiltersChange({ ...filter })}
      />
      <div className="w-full space-y-4 px-4 flex flex-col xl:flex-row h-full xl:space-x-8 mt-16">
        <FilterSection
          state={filter}
          onValueChange={handleCheckboxChange}
          onFilter={() => onFiltersChange({ ...filter })}
          clearFilter={clearFilter}
        />
        <ConferenceListSection
          data={data}
          isLoading={isLoading}
          isError={isError}
          state={filter}
          onChange={handleBasicChanges}
          onNavClick={paginationClick}
        />
      </div>
    </div>
  );
}

export default ConferencesPage;
