import _ from "lodash";
import { useState } from "react";
import { Filter } from "../../../models/filter";
import { FilterGroup } from "./types";

export const useFilters = (filterPickerConfig: FilterGroup[]) => {
  const { activeFilters, setActiveFilters } =
    useActiveFilters(filterPickerConfig);

  const addFilter = (filter: Filter) => {
    setActiveFilters([...activeFilters, filter]);
  };

  const removeFilter = ({ type, value }: Filter) =>
    setActiveFilters(
      activeFilters.filter(
        (filter) => !(filter.type === type && filter.value === value),
      ),
    );

  return {
    activeFilters,
    addFilter,
    removeFilter,
    removeAllFilters: () => setActiveFilters([]),
  };
};

// Help functions to handle filter state as search params
const DELIMITER = ",";

const useSearchParams = () => {
  const [searchParams, setSearchParams] = useState(
    new URLSearchParams(window.location.search),
  );

  return {
    searchParams,
    setSearchParams: (searchParams: URLSearchParams) => {
      const url = searchParams.toString().length
        ? `?${searchParams.toString()}`
        : location.pathname;
      window.history.replaceState(null, "", decodeURIComponent(url));

      setSearchParams(new URLSearchParams(searchParams));
    },
  };
};

const useActiveFilters = (config: FilterGroup[]) => {
  const { searchParams, setSearchParams } = useSearchParams();

  const activeFilters = config
    .map((filterGroup) => {
      const values = searchParams
        .getAll(filterGroup.type)
        .map((value) => value.split(DELIMITER))
        .flat();

      const filters = values
        .map((value) => {
          const config = filterGroup.filters.find(
            (f) => `${f.value}`.toLowerCase() === value.toLowerCase(),
          );

          return config
            ? {
                ...config,
                type: filterGroup.type,
              }
            : undefined;
        })
        .filter((filter): filter is Filter => !!filter);

      return filters;
    })
    .flat();

  const setActiveFilters = (filters: Filter[]) => {
    // Clear current filter values
    config.forEach((filterGroup) => {
      searchParams.delete(filterGroup.type);
    });

    // Add new filter values
    Object.entries(_.groupBy(filters, (filter) => filter.type)).map(
      ([type, filterGroup]) => {
        const values = filterGroup.map((filter) =>
          `${filter.value}`.toLowerCase(),
        );
        searchParams.append(type, values.join(DELIMITER));
      },
    );

    // Update search params
    setSearchParams(searchParams);
  };

  return { activeFilters, setActiveFilters };
};
