import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { Moon, Sun } from "lucide-react";

function Nav() {
  const { theme, toggleTheme } = useTheme();  
  return (
    <nav className="fixed top-0 left-0 w-full shadow-md flex justify-between items-center px-8 py-4 z-50">
    
      <h1 className="text-lg font-semibold">Tasks</h1>

      <div className="flex gap-6 ">
        <Link to="/" className="hover:text-blue-600">All Tasks</Link>
        <Link to="/active" className="hover:text-blue-600">Active</Link>
        <Link to="/completed" className="hover:text-blue-600">Completed</Link>
        <button
        onClick={toggleTheme}
        className="text-sm px-3 py-1 rounded"
        aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
        >
        {theme === "light" ? <Sun /> : <Moon />}
        </button>
      </div>
    </nav>
  );
}

export default Nav;
