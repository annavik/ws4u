import { useLayoutEffect } from "react";
import { FilterPicker } from "../../components/FilterPicker/FilterPicker";
import { SearchInput } from "../../components/SearchInput/SearchInput";
import {
  TabsContent,
  TabsList,
  TabsRoot,
  TabsTrigger,
} from "../../components/Tabs/Tabs";
import { useBookmarks } from "../../utils/bookmarks/useBookmarks";
import {
  restoreScrollPosition,
  storeScrollPosition,
} from "../../utils/scrollPosition";
import { useGuidelines } from "../../utils/useGuidelines";
import { ActiveFilters } from "./ActiveFilters/ActiveFilters";
import { GuidelineList } from "./GuidelineList/GuidelineList";
import styles from "./Guidelines.module.css";
import { getFilterPickerConfig } from "./utils/getFilterPickerConfig";
import { useFilteredGuidelines } from "./utils/useFilteredGuidelines";
import { useFilters } from "./utils/useFilters";
import { Header } from "../../components/Header/Header";

interface GuidelinesProps {
  activeTab: string;
  setActiveTab: (activeTab: string) => void;
  searchString: string;
  setSearchString: (searchString: string) => void;
  showAll: boolean;
  setShowAll: (activeTab: boolean) => void;
}

export const Guidelines = ({
  activeTab,
  setActiveTab,
  searchString,
  setSearchString,
  showAll,
  setShowAll,
}: GuidelinesProps) => {
  const { guidelines, tags, categories } = useGuidelines();
  const { bookmarks } = useBookmarks();
  const filterPickerConfig = getFilterPickerConfig({ categories, tags });
  const { activeFilters, addFilter, removeFilter, removeAllFilters } =
    useFilters(filterPickerConfig);
  const filteredGuidelines = useFilteredGuidelines({
    activeFilters,
    guidelines,
    searchString,
  });
  const bookmarkGuidelines = filteredGuidelines.filter((guideline) =>
    bookmarks.includes(guideline.id)
  );

  useLayoutEffect(() => {
    restoreScrollPosition();

    return () => {
      storeScrollPosition();
    };
  }, []);

  return (
    <>
      <Header />
      <div className={styles.settings}>
        <SearchInput
          clearLabel="Clear search"
          placeholder="Search"
          value={searchString}
          onChange={setSearchString}
        />
        <div className={styles.filterPickers}>
          {filterPickerConfig.map(
            ({ align, contentStyle, filters, label, type }) => {
              const numActiveFilters = activeFilters.filter(
                (filter) => filter.type === type
              ).length;

              return (
                <FilterPicker
                  key={type}
                  align={align}
                  activeFilters={activeFilters}
                  contentStyle={contentStyle}
                  filters={filters.map((filter) => ({
                    ...filter,
                    type,
                  }))}
                  label={
                    numActiveFilters ? `${label} (${numActiveFilters})` : label
                  }
                  addFilter={addFilter}
                  removeFilter={removeFilter}
                />
              );
            }
          )}
        </div>
        {activeFilters.length > 0 && (
          <ActiveFilters
            activeFilters={activeFilters}
            removeFilter={removeFilter}
            removeAllFilters={removeAllFilters}
          />
        )}
      </div>
      <TabsRoot value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger
            label={`All (${filteredGuidelines.length})`}
            value="all"
          />
          <TabsTrigger
            label={`Bookmarks (${bookmarkGuidelines.length})`}
            value="bookmarks"
          />
        </TabsList>
        <TabsContent value="all">
          <GuidelineList
            guidelines={filteredGuidelines}
            showAll={showAll}
            setShowAll={setShowAll}
          />
        </TabsContent>
        <TabsContent value="bookmarks">
          <GuidelineList
            guidelines={bookmarkGuidelines}
            showAll={showAll}
            setShowAll={setShowAll}
          />
        </TabsContent>
      </TabsRoot>
    </>
  );
};
