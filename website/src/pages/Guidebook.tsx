import Footer from "@/components/Footer";
import { GUIDEBOOK_DATA, IconName, iconMap } from "@/constants/guidebook";
import * as Accordion from "@radix-ui/react-accordion";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { motion } from "framer-motion";
import { Edit, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Logo = () => (
  <a href="/" className="inline-flex items-center group">
    <img
      src="/images/CDTM_Hacks_Logo.svg"
      alt="CDTM Hacks"
      className="h-10 w-auto"
    />
  </a>
);

// Helper function to render an icon by name
const renderIcon = (name: IconName, size: number, color?: string) => {
  const IconComponent = iconMap[name];
  return <IconComponent size={size} color={color} />;
};
const githubEditUrl = `https://github.com/cdtm/cdtm-hacks/edit/main/website/src/constants/guidebook.ts`;

const Guidebook = () => {
  const [activeSection, setActiveSection] = useState(GUIDEBOOK_DATA[0].id);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<
    Array<{ section: string; subsection: string; title: string }>
  >([]);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  // Helper to get all subsection IDs for expanded accordions
  const allSubsectionIds = GUIDEBOOK_DATA.flatMap((section) =>
    section.subsections.map((sub) => sub.id)
  );

  // Handle search functionality
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results = GUIDEBOOK_DATA.flatMap((section) =>
      section.subsections
        .filter(
          (subsection) =>
            subsection.title.toLowerCase().includes(query) ||
            subsection.content.toLowerCase().includes(query)
        )
        .map((subsection) => ({
          section: section.id,
          subsection: subsection.id,
          title: subsection.title,
        }))
    );

    setSearchResults(results);
  }, [searchQuery]);

  // Scroll to section when nav item is clicked
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = sectionRefs.current[sectionId];
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Scroll to subsection from search results or navigation
  const scrollToSubsection = (sectionId: string, subsectionId: string) => {
    setActiveSection(sectionId);
    const anchorId = `${sectionId}-${subsectionId}`;
    // Update the URL hash
    window.location.hash = `#${anchorId}`;
    // Scroll to the anchor
    const anchorElement = document.getElementById(anchorId);
    if (anchorElement) {
      anchorElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    // Expand the accordion if not already open
    const accordionTrigger = document.getElementById(
      `accordion-trigger-${subsectionId}`
    );
    if (
      accordionTrigger &&
      accordionTrigger.getAttribute("aria-expanded") !== "true"
    ) {
      accordionTrigger.click();
    }
    setSearchQuery("");
  };

  return (
    <div className="min-h-[80vh] overflow-x-hidden bg-gray-50">
      <div className="bg-white border-b border-gray-200 ">
        <div className="container px-4 py-4">
          <Logo />
        </div>
      </div>

      {/* Hero section */}
      <div className="relative bg-white py-16 md:pt-8 md:pb-6">
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Hackathon Guidebook
          </h1>
          <p className="text-xl max-w-3xl">
            Everything you need to know about CDTM Hacks 2025
          </p>
        </div>
      </div>

      {/* Search bar */}
      <div className="sticky top-0 z-30 bg-white shadow-md py-4">
        <div className="container mx-auto px-4">
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-springBlue focus:border-springBlue sm:text-sm"
              placeholder="Search the guidebook..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Search results */}
          {searchResults.length > 0 && (
            <div className="absolute z-50 w-full max-w-2xl bg-white mt-1 rounded-md shadow-lg max-h-80 overflow-y-auto">
              <ul className="py-1">
                {searchResults.map((result, index) => (
                  <li key={index}>
                    <button
                      onClick={() =>
                        scrollToSubsection(result.section, result.subsection)
                      }
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      <span className="text-sm text-springBlue font-medium">
                        {
                          GUIDEBOOK_DATA.find((s) => s.id === result.section)
                            ?.title
                        }{" "}
                        &gt;
                      </span>
                      <span className="ml-2">{result.title}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Navigation and content */}
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        {/* Side navigation */}
        <div className="md:w-1/4 lg:w-1/5">
          <div className="sticky top-24 bg-white rounded-lg shadow-md p-4">
            <nav className="space-y-1">
              {GUIDEBOOK_DATA.map((section) => (
                <div key={section.id}>
                  <button
                    onClick={() => scrollToSection(section.id)}
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-md w-full text-left transition-colors ${
                      activeSection === section.id
                        ? "bg-springBlue text-white"
                        : "text-gray-600 hover:text-springBlue hover:bg-gray-100"
                    }`}
                  >
                    <span className="mr-3 w-5 h-5  flex items-center justify-center">
                      {renderIcon(section.icon, 16)}
                    </span>
                    {section.title}
                  </button>
                  {/* Subsection navigation */}
                  <div className="ml-7 mt-1 space-y-1">
                    {section.subsections.map((subsection) => (
                      <button
                        key={subsection.id}
                        onClick={() => {
                          scrollToSubsection(section.id, subsection.id);
                        }}
                        className="block text-left text-xs text-gray-500 hover:text-springBlue w-full px-2 py-1 rounded transition-colors"
                      >
                        {subsection.title}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </nav>
          </div>
        </div>

        {/* Main content */}
        <div className="md:w-3/4 lg:w-4/5">
          <ScrollArea.Root className="overflow-hidden">
            <ScrollArea.Viewport className="w-full">
              {GUIDEBOOK_DATA.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  ref={(el) => (sectionRefs.current[section.id] = el)}
                  className="mb-12"
                >
                  <div className="flex items-center mb-6">
                    <div className="w-8 h-8 rounded-lg bg-springBlue flex items-center justify-center mr-4">
                      {renderIcon(section.icon, 20, "white")}
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                      {section.title}
                    </h2>
                  </div>

                  <Accordion.Root
                    type="multiple"
                    defaultValue={allSubsectionIds}
                    className="space-y-4"
                  >
                    {section.subsections.map((subsection) => (
                      <>
                        {/* Unique anchor for direct linking */}
                        <a id={`${section.id}-${subsection.id}`}></a>
                        <Accordion.Item
                          key={subsection.id}
                          value={subsection.id}
                          id={subsection.id}
                          className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden group"
                        >
                          <div className="relative">
                            <Accordion.Trigger
                              id={`accordion-trigger-${subsection.id}`}
                              className="flex items-center justify-between w-full px-4 py-3 text-left focus:outline-none focus:ring-2 focus:ring-springBlue group"
                            >
                              <div className="flex items-center gap-2">
                                <span className="w-7 h-7 rounded-md bg-springBlue/10 flex items-center justify-center text-springBlue">
                                  {renderIcon(subsection.icon, 16)}
                                </span>
                                <span className="text-base font-medium text-gray-700">
                                  {subsection.title}
                                </span>
                              </div>

                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-4 h-4 text-gray-400 transform transition-transform duration-300 group-radix-state-open:rotate-180"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg>
                            </Accordion.Trigger>
                          </div>
                          <Accordion.Content className="px-4 py-3 bg-gray-50 text-gray-700">
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <div
                                className="whitespace-pre-line"
                                dangerouslySetInnerHTML={{
                                  __html: subsection.content,
                                }}
                              />
                            </motion.div>
                          </Accordion.Content>
                        </Accordion.Item>
                      </>
                    ))}
                  </Accordion.Root>
                </section>
              ))}

              {/* GitHub edit section */}
              <div className="text-center py-8 border-t border-gray-200 mt-12">
                <div className="max-w-2xl mx-auto">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    Improve this guidebook
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Found a typo or want to add more information? This guidebook
                    is open source!
                  </p>
                  <div className="flex justify-center space-x-4">
                    <a
                      href={githubEditUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-springBlue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-springBlue"
                    >
                      <Edit className="h-5 w-5 mr-2" />
                      Edit on GitHub
                    </a>
                  </div>
                </div>
              </div>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar
              className="flex select-none touch-none p-0.5 bg-gray-100 transition-colors duration-150 ease-out hover:bg-gray-200 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
              orientation="vertical"
            >
              <ScrollArea.Thumb className="flex-1 bg-gray-300 rounded-full relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
            </ScrollArea.Scrollbar>
          </ScrollArea.Root>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Guidebook;
