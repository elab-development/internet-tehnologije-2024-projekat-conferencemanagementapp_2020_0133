import { useEffect, useState } from "react";
import axiosConferenceInstance from "../../../api/axiosConfig";
import { useQuery } from "@tanstack/react-query";
import { countries } from "countries-list";

function FilterSection({ onValueChange, state, onFilter, clearFilter }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["topics"],
    queryFn: () =>
      axiosConferenceInstance.get("/topics").then((res) => res.data),
  });
  const [isFiltersOpen, setIsFiltersOpen] = useState(true);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [search, setSearch] = useState(state.search || "");
  const [isTopicOpen, setIsTopicOpen] = useState(false);
  const countryNames = Object.values(countries).map((c) => c.name);
  const [filteredCountries, setFilteredCountries] = useState(countryNames);

  // Local filter state — user changes are applied here and only sent to parent when user clicks "Filter"
  const [localFilter, setLocalFilter] = useState({
    search: state.search || "",
    country: Array.isArray(state.country) ? [...state.country] : [],
    topic: Array.isArray(state.topic) ? [...state.topic] : [],
  });

  useEffect(() => {
    // keep localFilter in sync when parent state (e.g. URL change) updates
    setLocalFilter({
      search: state.search || "",
      country: Array.isArray(state.country) ? [...state.country] : [],
      topic: Array.isArray(state.topic) ? [...state.topic] : [],
    });
    setSearch(state.search || "");
  }, [state]);

  const toggleFilterDropdown = () => {
    setIsFiltersOpen(!isFiltersOpen);
  };
  const toggleCountryDropdown = () => {
    setIsCountryOpen(!isCountryOpen);
  };
  const toggleTopicDropdown = () => {
    setIsTopicOpen(!isTopicOpen);
  };

  useEffect(() => {
    setFilteredCountries(
      countryNames.filter((c) => c.toLowerCase().includes(search.toLowerCase()))
    );
  }, [search]);

  const handleCountryCheckbox = (country) => {
    setLocalFilter((prev) => {
      const exists = prev.country.includes(country);
      return {
        ...prev,
        country: exists
          ? prev.country.filter((c) => c !== country)
          : [...prev.country, country],
      };
    });
  };

  const handleTopicCheckbox = (topicId) => {
    setLocalFilter((prev) => {
      const id =
        typeof topicId === "string" && !isNaN(Number(topicId))
          ? Number(topicId)
          : topicId;
      const exists = prev.topic.includes(id);
      return {
        ...prev,
        topic: exists
          ? prev.topic.filter((t) => t !== id)
          : [...prev.topic, id],
      };
    });
  };

  const onFilterClicked = () => {
    // call parent's onFilter with the composed filter object
    onFilter({
      ...state,
      search: localFilter.search,
      country: localFilter.country,
      topic: localFilter.topic,
    });
    setSearch("");
  };

  const onClearFilterClicked = () => {
    clearFilter();
    setSearch("");
    setLocalFilter({
      search: "",
      country: [],
      topic: [],
    });
  };

  return (
    <div className="h-fit  w-full xl:w-1/4 xl:px-10 xl:mt-14">
      <div className="border h-fit  w-full overflow-hidden rounded-2xl ">
        <div className="w-full relative pb-10">
          <button
            className="absolute w-full flex justify-between items-center px-3 py-2 z-0 bg-white"
            onClick={toggleFilterDropdown}
          >
            <span className="font-semibold">Filters</span>
            <span>{isFiltersOpen ? "▲" : "▼"}</span>
          </button>
          <button
            className="absolute hover:underline hover:cursor-pointer top-1/2 -translate-y-5  end-0 -translate-x-12 z-10  h-full"
            onClick={onClearFilterClicked}
          >
            Clear filters
          </button>
        </div>

        {isFiltersOpen && (
          <div className="w-full flex flex-col space-y-1 p-4">
            <div className="w-full overflow-hidden">
              <button
                className="w-full flex justify-between items-center px-3 py-2 bg-white border  sticky"
                onClick={toggleCountryDropdown}
              >
                <span className="font-semibold">Countries</span>
                <span>{isCountryOpen ? "▲" : "▼"}</span>
              </button>

              {isCountryOpen && (
                <div className="relative max-h-60 overflow-y-auto border-b">
                  {/* Search box */}
                  <div className="p-2 top-0 sticky bg-white">
                    <input
                      type="text"
                      placeholder="Search Country"
                      className="w-full border rounded px-2 py-1 text-sm"
                      value={search}
                      onChange={(e) => {
                        setSearch(e.target.value);
                      }}
                    />
                  </div>

                  {/* List of countries */}
                  <ul>
                    {filteredCountries.map((country) => (
                      <li
                        key={country}
                        className="px-3 py-1 flex items-center gap-2"
                      >
                        <input
                          name="country"
                          value={country}
                          type="checkbox"
                          checked={localFilter.country.includes(country)}
                          onChange={() => handleCountryCheckbox(country)}
                        />
                        <span>{country}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {!isLoading && !isError && (
              <div className="w-full overflow-hidden">
                <button
                  className={`w-full flex justify-between items-center px-3 py-2 bg-white border  ${
                    isTopicOpen ? "border-b" : ""
                  }`}
                  onClick={toggleTopicDropdown}
                >
                  <span className="font-semibold">Topics</span>
                  <span>{isTopicOpen ? "▲" : "▼"}</span>
                </button>

                {isTopicOpen && (
                  <div className="h-fit">
                    <ul>
                      {data.map((topic) => (
                        <li
                          key={topic.id}
                          className="px-3 py-1 flex items-center gap-2"
                        >
                          <input
                            name="topic"
                            value={topic.id}
                            type="checkbox"
                            checked={localFilter.topic.includes(topic.id)}
                            onChange={() => handleTopicCheckbox(topic.id)}
                          />
                          <span>{topic.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
            <button
              className="w-full border p-2 rounded-b-2xl mt-6"
              onClick={onFilterClicked}
            >
              Filter
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default FilterSection;
