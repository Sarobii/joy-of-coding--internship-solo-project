"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme") || "cupcake";
      setTheme(storedTheme);
      document.documentElement.setAttribute("data-theme", storedTheme);
    }
  }, []);

  const toggleTheme = () => {
    if (theme) {
      const newTheme = theme === "cupcake" ? "sunset" : "cupcake";
      setTheme(newTheme);
      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
    }
  };

  if (theme === null) return null; // Render nothing until the theme is determined

  return (
    <div className="tooltip tooltip-bottom" data-tip={theme === "cupcake" ? "Dark" : "Light"}>
      <button onClick={toggleTheme} className="btn btn-circle btn-ghost btn-xs">
        {theme === "cupcake" ? <Moon size={16} /> : <Sun size={16} />}
      </button>
    </div>
  );
};

export default ThemeToggle;
