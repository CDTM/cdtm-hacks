import { ExternalLink, Menu as MenuIcon, X } from "lucide-react";
import { useEffect, useState } from "react";
import MobileNavigation from "./MobileNavigation";
import { Link, useNavigate, useLocation } from "react-router-dom";

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

interface NavbarProps {
  backgroundColor?: string;
}

const Navbar = ({ backgroundColor = "bg-transparent" }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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

  // Handle navigation with hash
  const handleNavigation = (hash: string) => {
    if (location.pathname !== '/') {
      navigate(`/${hash}`);
    } else {
      // If we're already on the home page, just scroll to the section
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Add effect to handle hash navigation after page load
  useEffect(() => {
    const handleHashNavigation = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          // Small delay to ensure the page is fully loaded
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      }
    };

    // Handle initial load
    handleHashNavigation();

    // Handle hash changes
    window.addEventListener('hashchange', handleHashNavigation);
    return () => window.removeEventListener('hashchange', handleHashNavigation);
  }, []);

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
          { id: "about-us", label: "Organisers", url: "#about-us" },
          {
            id: "github",
            label: "GitHub",
            url: "https://github.com/CDTM/cdtm-hacks",
          },
        ],
      },
    ],
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-sm shadow-sm" : backgroundColor
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="font-bold text-xl text-springBlue">
          <img
            src="/images/CDTM_Hacks_Logo.svg"
            alt="CDTM Hacks Logo"
            className="h-8 md:h-10 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => handleNavigation('#about')}
            className="text-springText/80 hover:text-springBlue transition-colors"
          >
            About
          </button>
          <button
            onClick={() => handleNavigation('#partners')}
            className="text-springText/80 hover:text-springBlue transition-colors"
          >
            Partners
          </button>
          <button
            onClick={() => handleNavigation('#speakers')}
            className="text-springText/80 hover:text-springBlue transition-colors"
          >
            Speakers
          </button>
          <button
            onClick={() => handleNavigation('#schedule')}
            className="text-springText/80 hover:text-springBlue transition-colors"
          >
            Schedule
          </button>
          <button
            onClick={() => handleNavigation('#about-us')}
            className="text-springText/80 hover:text-springBlue transition-colors flex items-center gap-2"
          >
            Organisers
          </button>
          <a
            href="https://github.com/CDTM/cdtm-hacks"
            target="_blank"
            rel="noopener noreferrer"
            className="text-springText/80 hover:text-springBlue transition-colors flex items-center gap-1"
          >
            GitHub
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
