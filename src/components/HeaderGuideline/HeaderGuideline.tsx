import { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./HeaderGuideline.module.css";
import { AboutDialog } from "../AboutDialog/AboutDialog";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";
import { useThemePreference } from "../../utils/useThemePreference";

function HeaderGuideline() {
  const { theme, setTheme } = useThemePreference();
  const globeSize = 40;

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <div className={styles.topBar}>
          <Link to="/">
            <img
              src="/globe.svg"
              alt="websustainability.io logo."
              className={styles.logo}
              width={globeSize}
              height={globeSize}
            />
          </Link>
          <AboutDialog theme={theme} />
          <ThemeToggle theme={theme} onThemeChange={setTheme} />
        </div>
      </div>
    </header>
  );
}

export default HeaderGuideline;
