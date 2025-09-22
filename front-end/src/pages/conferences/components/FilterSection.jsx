
import { useEffect, useState } from "react";
import axiosConferenceInstance from "../../../api/axiosConfig";
import { useQuery } from "@tanstack/react-query";
import { countries } from "countries-list";

function FilterSection({ onValueChange,  state}) {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['topics'],
        queryFn: () => axiosConferenceInstance.get("/topics").then(res => res.data)
    });
    const [isFiltersOpen, setIsFiltersOpen] = useState(true);
    const [isCountryOpen, setIsCountryOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [isTopicOpen, setIsTopicOpen] = useState(false);
    const countryNames = Object.values(countries).map((c) => c.name);
    const [filteredCountries, setFilteredCountries] = useState(countryNames);
    
    const toggleFilterDropdown = () => {
        setIsFiltersOpen(!isFiltersOpen)
    }
    const toggleCountryDropdown = () => {
      setIsCountryOpen(!isCountryOpen);
    };
    const toggleTopicDropdown = () => {
      setIsTopicOpen(!isTopicOpen);
    };
    
      useEffect(() => {
        setFilteredCountries(
          countryNames.filter((c) =>
            c.toLowerCase().includes(search.toLowerCase())
          )
        );
      }, [search]);
    return (
      <div className="border m-3 w-full overflow-hidden lg:w-1/3 rounded-2xl">
        <button
          className="w-full flex justify-between items-center px-3 py-2 bg-white"
          onClick={toggleFilterDropdown}
        >
          <span className="font-semibold">Filters</span>
          <span>{isFiltersOpen ? "▲" : "▼"}</span>
        </button>
        {isFiltersOpen && (
          <div className="w-full flex flex-col">
            <div className="w-full overflow-hidden">
              <button
                className="w-full flex justify-between items-center px-3 py-2 bg-white border-y sticky"
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
                      onChange={(e) => setSearch(e.target.value)}
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
                          checked={state.country.includes(country)}
                          onChange={onValueChange}
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
                  className={`w-full flex justify-between items-center px-3 py-2 bg-white ${
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
                            checked={state.topic.includes(topic.id)}
                            onChange={onValueChange}
                          />
                          <span>{topic.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    );
}



export default FilterSection;