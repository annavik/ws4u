import { ChevronDownIcon } from "@radix-ui/react-icons";
import * as Popover from "@radix-ui/react-popover";
import { CSSProperties } from "react";
import { Filter } from "../../models/filter";
import { Checkbox } from "../Checkbox/Checkbox";
import { levelToLabel } from "../../utils/levelToLabel";
import styles from "./FilterPicker.module.css";

export const FilterPicker = ({
  activeFilters,
  align = "start",
  contentStyle,
  filters,
  label,
  addFilter,
  removeFilter,
}: {
  activeFilters: Filter[];
  align?: "start" | "end";
  contentStyle?: CSSProperties;
  filters: Filter[];
  label: string;
  addFilter: (filter: Filter) => void;
  removeFilter: (filter: Filter) => void;
}) => (
  <Popover.Root>
    <Popover.Trigger className={styles.popoverTrigger}>
      <span>{label}</span>
      <ChevronDownIcon />
    </Popover.Trigger>
    <Popover.Portal>
      <Popover.Content
        className={styles.popoverContent}
        align={align}
        avoidCollisions={false}
        side="bottom"
        sideOffset={8}
        style={contentStyle}
      >
        {filters.map((filter) => (
          <Checkbox
            key={filter.value}
            checked={activeFilters.some(
              (activeFilter) =>
                filter.type === activeFilter.type &&
                filter.value === activeFilter.value,
            )}
            id={`${filter.value}`}
            label={levelToLabel(filter) ?? filter.label}
            onCheckedChange={(checked) => {
              if (checked) {
                addFilter(filter);
              } else {
                removeFilter(filter);
              }
            }}
          />
        ))}
      </Popover.Content>
    </Popover.Portal>
  </Popover.Root>
);
