"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "cupcake";
    }
    return "cupcake";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "cupcake" ? "sunset" : "cupcake");
  };

  return (
    <div className="tooltip tooltip-bottom" data-tip={theme === "Light" ? "Dark" : "cupcake"}>
      <button onClick={toggleTheme} className="btn btn-circle btn-ghost btn-xs">
        {theme === "cupcake" ? <Moon size={16} /> : <Sun size={16} />}
      </button>
    </div>
  );
};

export default ThemeToggle;