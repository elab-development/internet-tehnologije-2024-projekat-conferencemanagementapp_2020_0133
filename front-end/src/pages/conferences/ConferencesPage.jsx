import { useQuery } from "@tanstack/react-query";
import { useConferences } from "../../hooks/useConferences";
import HeroSection from "./components/HeroSection";
import { useEffect, useMemo, useState } from "react";
import FilterSection from "./components/FilterSection";
import ConferenceListSection from "./components/ConferenceListSection";
import { useLocation, useNavigate } from "react-router";

function ConferencesPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Parse query params
  const getFiltersFromQuery = () => {
    const params = new URLSearchParams(location.search);
    return {
      search: params.get("search") || "",
      country: params.getAll("country"),
      topic: params.getAll("topic"),
      sortBy: params.get("sortBy") || "asc",
      limit: Number(params.get("limit")) || 20,
      page: Number(params.get("page")) || 0,
    };
  };

  const [filters, onFiltersChange] = useState(getFiltersFromQuery());
  const [filter, onFilterChange] = useState(getFiltersFromQuery());
  const { data, isLoading, isError, refetch } = useConferences(filters);

  // Sync filter state to URL
  const syncQuery = (newFilter) => {
    const params = new URLSearchParams();
    if (newFilter.search) params.set("search", newFilter.search);
    newFilter.country.forEach((c) => params.append("country", c));
    newFilter.topic.forEach((t) => params.append("topic", t));
    params.set("sortBy", newFilter.sortBy);
    params.set("limit", newFilter.limit);
    params.set("page", newFilter.page);
    navigate({ search: params.toString() }, { replace: true });
  };

  // Kada se filter/paginacija promeni
  const handleBasicChanges = (e) => {
    const newFilter = {
      ...filter,
      [e.target.name]: e.target.value,
      page: 0,
    };
    onFilterChange(newFilter);
    if (e.target.name === "sortBy") {
      onFiltersChange(newFilter);
      syncQuery(newFilter);
    }
  };

  const handleCheckboxChange = (e) => {
    let newFilter;
    if (e.target.checked) {
      newFilter = {
        ...filter,
        [e.target.name]: [...filter[e.target.name], e.target.value],
        page: 0,
      };
    } else {
      newFilter = {
        ...filter,
        [e.target.name]: filter[e.target.name].filter(
          (el) => el !== e.target.value
        ),
        page: 0,
      };
    }
    onFilterChange(newFilter);
    syncQuery(newFilter);
  };

  const clearFilter = () => {
    const newFilter = {
      ...filter,
      country: [],
      topic: [],
      page: 0,
    };
    onFilterChange(newFilter);
    onFiltersChange(newFilter);
    syncQuery(newFilter);
  };

  const paginationClick = (page) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const newFilters = { ...filters, page };
    onFiltersChange(newFilters);
    syncQuery(newFilters);
  };

  // Kada se URL promeni, ažuriraj filtere
  useEffect(() => {
    const urlFilters = getFiltersFromQuery();
    onFiltersChange(urlFilters);
    onFilterChange(urlFilters);
  }, [location.search]);

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
