import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { BookmarkToast } from "../../components/BookmarkToast/BookmarkToast";
import { GuidelineDetails } from "../../components/GuidelineDetails/GuidelineDetails";
import { getCompactId } from "../../utils/guideline";
import { useGuidelines } from "../../utils/useGuidelines";
import styles from "./Guideline.module.css";
import { GuidelinesButton } from "./GuidelinesButton/GuidelinesButton";
import HeaderGuideline from "../../components/HeaderGuideline/HeaderGuideline";

export const Guideline = () => {
  const location = useLocation();
  const { id } = useParams();
  const { guidelines = [] } = useGuidelines();
  const guideline = guidelines.find((g) => getCompactId(g) === id);

  useEffect(() => {
    // Scroll to selected element if specified in hash
    if (location.hash) {
      const elementToScroll = document.getElementById(
        location.hash.replace("#", "")
      );

      if (elementToScroll) {
        elementToScroll.scrollIntoView();
        return;
      }
    }

    // Otherwise, scroll to top
    document.getElementById("root")?.scrollTo({ top: 0 });
  }, [location.hash]);

  if (!guideline) {
    return <span>Guideline not found.</span>;
  }

  return (
    <>
      <HeaderGuideline />
      <div className={styles.wrapper}>
        <GuidelinesButton />
        <GuidelineDetails guideline={guideline} />
      </div>
      <BookmarkToast />
    </>
  );
};
