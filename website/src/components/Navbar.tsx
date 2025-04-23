import { ExternalLink, Menu as MenuIcon, X } from "lucide-react";
import { useEffect, useState } from "react";
import MobileNavigation from "./MobileNavigation";
interface SubMenuItem {
  id: string;
  label: string;
  url: string;
}

interface MenuItem {
  id: string;
  label: string;
  submenu?: SubMenuItem[];
}

interface Menu {
  items: MenuItem[];
}

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close menu when clicking a link
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  // Define the menu structure
  const navMenu: Menu = {
    items: [
      {
        id: "main-menu",
        label: "Navigation",
        submenu: [
          { id: "about", label: "About", url: "#about" },
          { id: "partners", label: "Partners", url: "#partners" },
          { id: "speakers", label: "Speakers", url: "#speakers" },
          { id: "schedule", label: "Schedule", url: "#schedule" },
          { id: "about-us", label: "CDTM", url: "#about-us" },
        ],
      },
    ],
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-sm shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="font-bold text-xl text-springBlue">
          <img
            src="/images/CDTM_Hacks_Logo.svg"
            alt="CDTM Hacks Logo"
            className="h-8 md:h-10 w-auto"
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a
            href="#about"
            className="text-springText/80 hover:text-springBlue transition-colors"
          >
            About
          </a>
          <a
            href="#partners"
            className="text-springText/80 hover:text-springBlue transition-colors"
          >
            Partners
          </a>
          <a
            href="#speakers"
            className="text-springText/80 hover:text-springBlue transition-colors"
          >
            Speakers
          </a>
          <a
            href="#schedule"
            className="text-springText/80 hover:text-springBlue transition-colors"
          >
            Schedule
          </a>
          <a
            href="#about-us"
            className="text-springText/80 hover:text-springBlue transition-colors flex items-center gap-2"
          >
            Organisers
          </a>
          <a
            href="https://app.formbricks.com/s/cm87i0iq40000ji039uyra9hq"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-hover-effect bg-springBlue text-white font-medium py-2 px-4 rounded-lg"
          >
            Apply
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="text-springBlue" size={24} />
          ) : (
            <MenuIcon className="text-springBlue" size={24} />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <MobileNavigation
        menu={navMenu}
        onItemClick={handleLinkClick}
        isOpen={isMenuOpen}
      />
    </header>
  );
};

export default Navbar;
