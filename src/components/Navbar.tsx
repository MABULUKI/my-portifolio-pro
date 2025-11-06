import { useState } from "react";
import { Link } from "react-router-dom";
import { routes } from "../routes";
import { type RouteType } from "../routes/routesTypes";
import { GiMineralHeart } from "react-icons/gi";

interface NavbarProps {
  scrolledPastHero: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ scrolledPastHero }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navRoutes: RouteType[] = routes.filter(route => route.fornav);

  // Navbar text color
  const textColor = scrolledPastHero ? "text-gray-800" : "text-white";

  // Conditional background + blur
  const navbarClasses = scrolledPastHero
    ? "bg-[#F5F5F5] backdrop-blur-md shadow-md"
    : "bg-transparent";

  return (
    <header
      className={`fixed top-0 w-full z-50 p-4 transition-colors duration-500 ${navbarClasses}`}
    >
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        {/* Logo / Brand */}
        <div className={`flex items-center justify-center transition-colors duration-500 ${textColor}`}>
          <GiMineralHeart className={`w-12 h-12 drop-shadow-lg ${textColor}`} />
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-8">
          {navRoutes.map(route => (
            <Link
              key={route.path}
              to={route.path}
              className={`font-sans font-semibold transition-colors duration-500 ${textColor} hover:text-blue-500`}
            >
              {route.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Hamburger */}
        <button
          className={`md:hidden focus:outline-none transition-colors duration-500 ${textColor}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="md:hidden mt-2 flex flex-col gap-4 bg-[#F5F5F5]/95 p-4 rounded shadow-md">
          {navRoutes.map(route => (
            <Link
              key={route.path}
              to={route.path}
              className={`font-sans font-semibold transition-colors duration-500 ${textColor} hover:text-blue-500`}
              onClick={() => setIsOpen(false)}
            >
              {route.name}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Navbar;
