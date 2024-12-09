import Fuse from "fuse.js";
import _ from "lodash";
import { Filter, FilterType } from "../../../models/filter";
import { Guideline } from "../../../models/guideline";

export const useFilteredGuidelines = ({
  activeFilters,
  guidelines,
  searchString,
}: {
  activeFilters: Filter[];
  guidelines: Guideline[];
  searchString: string;
}) => {
  let filteredGudelines = guidelines;

  // Filter based on search search string
  const fuse = new Fuse(guidelines ?? [], {
    keys: ["title", "description"],
    threshold: 0.5,
    shouldSort: true,
  });

  if (searchString.length) {
    filteredGudelines = fuse.search(searchString).map((result) => result.item);
  }

  // Filter based on category, tag, effort and impact
  const filterGroups = _.groupBy(activeFilters, (filter) => filter.type);
  Object.entries(filterGroups).forEach(([filterType, filterGroup]) => {
    if (!filterGroup.length) {
      return;
    }

    switch (filterType as FilterType) {
      case "category": {
        filteredGudelines = filteredGudelines.filter((guideline) =>
          filterGroup.some((filter) => filter.value === guideline.category.id),
        );
        break;
      }
      case "tag": {
        filteredGudelines = filteredGudelines.filter((guideline) =>
          filterGroup.some((filter) =>
            guideline.tags.some((tag) => filter.value === tag),
          ),
        );
        break;
      }
      case "effort": {
        filteredGudelines = filteredGudelines.filter((guideline) =>
          filterGroup.some((filter) => filter.value === guideline.effort.level),
        );
        break;
      }
      case "impact": {
        filteredGudelines = filteredGudelines.filter((guideline) =>
          filterGroup.some((filter) => filter.value === guideline.impact.level),
        );
        break;
      }
    }
  });

  return filteredGudelines;
};
