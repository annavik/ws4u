import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styles from "./App.module.css";
import { Guideline } from "./pages/Guideline/Guideline";
import { Guidelines } from "./pages/Guidelines/Guidelines";
import { BookmarksContextProvider } from "./utils/bookmarks/bookmarksContext";
import { clearScrollPosition } from "./utils/scrollPosition";

function App() {
  const [activeTab, setActiveTab] = useState("all");
  const [showAll, setShowAll] = useState(false);
  const [searchString, setSearchString] = useState("");

  // Clear stored scroll position before leaving the page
  useEffect(() => {
    window.addEventListener("beforeunload", clearScrollPosition);

    return () =>
      window.removeEventListener("beforeunload", clearScrollPosition);
  }, []);

  return (
    <BrowserRouter>
      <BookmarksContextProvider>
        <main className={styles.main}>
          <div className={styles.content}>
            <Routes>
              <Route
                path="/"
                element={
                  <Guidelines
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    searchString={searchString}
                    setSearchString={setSearchString}
                    showAll={showAll}
                    setShowAll={setShowAll}
                  />
                }
              />
              <Route path="/:id/:slug?" element={<Guideline />} />
            </Routes>
          </div>
        </main>
      </BookmarksContextProvider>
    </BrowserRouter>
  );
}

export default App;
