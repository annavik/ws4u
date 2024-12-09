import _ from "lodash";
import { useMemo } from "react";
import { Guideline } from "../models/guideline";
import wsgInfo from "../wsg-info.json";

export const useGuidelines = (): {
  guidelines: Guideline[];
  tags: string[];
  categories: { id: string; title: string }[];
} => {
  const { tags, categories, data } = wsgInfo;

  const guidelines = useMemo(
    () =>
      data.map((serverGuideline, index) => {
        const guideline: Guideline = {
          ...serverGuideline,

          index,
          impact: {
            level: serverGuideline.impact.value,
            title: serverGuideline.impact.title,
          },
          effort: {
            level: serverGuideline.effort.value,
            title: serverGuideline.effort.title,
          },
          tags: _.uniq(serverGuideline.tags),
        };

        return guideline;
      }),
    [data],
  );

  return {
    tags,
    categories,
    guidelines,
  };
};
