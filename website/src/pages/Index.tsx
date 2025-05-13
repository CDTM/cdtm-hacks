import About from "@/components/About";
import AboutUs from "@/components/AboutUs";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Partners from "@/components/Partners";
import Schedule from "@/components/Schedule";
import Speakers from "@/components/Speakers";
import FAQ from "@/components/FAQ";
import { useEffect, useRef, useState } from "react";
import ApplicationsClosedDialog from "@/components/ApplicationsClosedDialog";

const Index = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const sunLayerRef = useRef<HTMLDivElement>(null);
  const bgLayerRef = useRef<HTMLDivElement>(null);
  const midLayerRef = useRef<HTMLDivElement>(null);
  const fgLayerRef = useRef<HTMLDivElement>(null);
  const [isWideAspectRatio, setIsWideAspectRatio] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const checkAspectRatio = () => {
      const aspectRatio = window.innerWidth / window.innerHeight;
      setIsWideAspectRatio(aspectRatio >= 2);
    };

    // Check on mount
    checkAspectRatio();

    // Check on resize
    window.addEventListener("resize", checkAspectRatio);
    return () => window.removeEventListener("resize", checkAspectRatio);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!parallaxRef.current) return;
      const scrollTop = window.scrollY;
      const parallaxHeight = parallaxRef.current.offsetHeight;

      // Only apply parallax when the container is in view and not on mobile
      if (scrollTop <= parallaxHeight) {
        if (sunLayerRef.current) {
          sunLayerRef.current.style.transform = `translateX(${
            scrollTop * 0.2
          }px)`;
          sunLayerRef.current.style.transform = `translateY(${
            scrollTop * 0.5
          }px)`;
        }
        if (bgLayerRef.current) {
          bgLayerRef.current.style.transform = `translateY(${
            scrollTop * 0.1
          }px)`;
        }
        if (midLayerRef.current) {
          midLayerRef.current.style.transform = `translateY(${
            scrollTop * 0.15
          }px)`;
        }
        if (fgLayerRef.current) {
          fgLayerRef.current.style.transform = `translateY(${
            scrollTop * 0.2
          }px)`;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const now = new Date();
  const isAfterSunday4PM = true; // Sunday, May 11th, 4PM German time
  return (
    <div className="min-h-[80vh] overflow-x-hidden bg-springPaleBlue">
      <Navbar
        backgroundColor={isAfterSunday4PM ? "bg-white" : "bg-springPaleBlue/30"}
      />
      {/* Hero section with parallax effect */}
      <div
        ref={parallaxRef}
        className="parallax-container flex flex-col items-center relative min-h-screen"
      >
        {/* Green gradient overlay */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: isAfterSunday4PM
              ? "linear-gradient(to bottom, rgba(13, 25, 45, 0.7), rgba(13, 25, 45, 1))"
              : "linear-gradient(to bottom, rgba(240, 255, 240, 0.3), rgba(255, 255, 255, 0.1))",
          }}
        ></div>

        {/* Sun/Moon layer - rising sun/moon effect */}
        <div
          ref={sunLayerRef}
          className="parallax-layer z-1 top-[25%] md:top-[15%]"
          style={{
            ...(isAfterSunday4PM
              ? {
                  backgroundImage: "url('/images/parallax/moon.svg')",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  height: "15vh",
                  width: "15vh",
                  left: "2%",
                  opacity: 0.85,
                }
              : {
                  background: `radial-gradient(circle at center 120%, #FFE17D 0%, #FFA41B 20%, #F7F2E380 70%, transparent 75%)`,
                  height: "30vh",
                  width: "30vh",
                  borderRadius: "50%",
                  left: "5%",
                  opacity: 0.85,
                  boxShadow: "0 0 50px 5px rgba(255, 209, 82, 0.6)",
                }),
          }}
        />

        {/* Background layer - Alps silhouette */}
        <div
          ref={bgLayerRef}
          className="parallax-layer z-2"
          style={{
            backgroundImage: `url("/images/parallax/alps-silhouette.svg")`,
            backgroundPosition: "bottom center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            top: "30%",
            bottom: 0,
          }}
        />

        {/* Middle layer - Munich cityscape silhouette */}
        <div
          ref={midLayerRef}
          className="parallax-layer z-3"
          style={{
            backgroundImage: `url("/images/parallax/munich-silhouette.svg")`,
            backgroundPosition: "bottom center",
            backgroundRepeat: "repeat-x",
            backgroundSize: "cover",
            top: "25%",
            bottom: 0,
          }}
        />

        {/* Foreground layer - Spring-themed elements */}
        <div
          ref={fgLayerRef}
          className="parallax-layer z-4"
          style={{
            backgroundImage: `url("/images/parallax/spring-elements-without-hiker.svg")`,
            backgroundPosition: "bottom center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            top: "25%",
            bottom: 0,
          }}
        />

        {/* Foreground layer - Spring-themed elements */}
        <div
          ref={fgLayerRef}
          className="parallax-layer z-4 top-[calc(75vh-250px)] landscape:top-[calc(90vh-200px)] md:top-[calc(90vh-250px)] md:landscape:top-[calc(90vh-250px)]"
          style={{
            backgroundImage: `url("/images/parallax/notberlin.svg")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            maxHeight: "300px",
            backgroundPositionX: "100%",
          }}
        />

        {/* Hero content */}
        <div className="container mx-auto px-4 pt-[12vh] relative z-10 text-center flex flex-col items-center justify-center h-full">
          <h1
            className={`text-4xl md:text-5xl lg:text-6xl font-bold ${
              isAfterSunday4PM ? "text-white" : "text-springBlue"
            } mb-4 mt-4 animate-fade-in`}
          >
            CDTM HACKS 2025
          </h1>
          <p
            className={`text-xl md:text-2xl mb-2 max-w-2xl animate-fade-in ${
              isWideAspectRatio || isAfterSunday4PM
                ? "text-white font-bold"
                : "text-springText"
            }`}
            style={{
              animationDelay: "0.1s",
              ...((isWideAspectRatio || isAfterSunday4PM) && {
                textShadow: "0px 0px 3px rgb(0 0 0.5)",
              }),
            }}
          >
            {isAfterSunday4PM ? (
              <>
                Thank you for an amazing weekend in the heart of Europe.
                <div className="mt-4 animate-fade-in font-normal">
                  <p className="text-lg text-white mb-8">
                    Looking forward to continue building & learning after the
                    hackathon? Application for the CDTM are open until 30th May.
                  </p>
                  <div className="flex flex-col items-center justify-center gap-2 mt-2">
                    <a
                      href="https://application.cdtm.com"
                      className="btn-hover-effect bg-springBlue text-white font-semibold py-4 px-10 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                    >
                      Apply now
                    </a>
                    <a
                      href="/projects/2025"
                      className="mt-2 text-white underline underline-offset-4 hover:text-springBlue transition-colors flex items-center gap-1 text-base font-normal opacity-80"
                    >
                      To the projects
                    </a>
                  </div>
                </div>
              </>
            ) : (
              <>
                Spring is here - plant your ideas.
                <br />
                Join us for 36 hours of building in the heart of Europe.
              </>
            )}
          </p>
          {!isAfterSunday4PM && (
            <span
              className="text-lg md:text-xl mb-8 font-bold animate-fade-in text-springText flex items-center justify-center gap-1"
              style={{
                animationDelay: "0.2s",
              }}
            >
              09. - 11. May 2025 at
              <a
                href="https://maps.app.goo.gl/db8BYVF8pj7DVLcCA"
                target="_blank"
                className="underline flex items-center justify-center gap-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mb-1 hidden md:block"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                Celonis, Munich
              </a>
            </span>
          )}

          {/* Mobile buttons - only show on small screens */}
          {!isAfterSunday4PM && (
            <div
              className="flex flex-col gap-4 animate-fade-in md:hidden"
              style={{
                animationDelay: "0.3s",
              }}
            >
              <button
                onClick={() => setIsDialogOpen(true)}
                className="btn-hover-effect bg-springBlue text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                Apply
              </button>
            </div>
          )}
        </div>
        {/* Curved transition and wooden sign - hide on mobile */}
        <div className="absolute bottom-0 left-0 w-full z-20 hidden md:block">
          <svg
            width="100%"
            height="160"
            viewBox="0 0 100 20"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              display: "block",
            }}
          >
            <path
              d="M0 20 L0 12 C15 11 20 8 25 8 S35 10 50 12 S75 13 100 12 L100 20 Z"
              fill="white"
            />
          </svg>

          {/* Wooden Sign with flowers */}
          {!isAfterSunday4PM && (
            <svg
              width="200"
              height="200"
              viewBox="0 0 100 100"
              className="absolute left-[25%] bottom-[40px] transform -translate-x-1/2 cursor-pointer"
              style={{
                transformOrigin: "50% 95%",
                transition: "transform 0.1s ease-out",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  "translate(-50%) rotateZ(2deg)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform =
                  "translate(-50%) rotateZ(0deg)";
              }}
              onClick={() => setIsDialogOpen(true)}
            >
              {/* Shadow */}
              <ellipse cx="50" cy="95" rx="10" ry="2" fill="rgba(0,0,0,0.05)" />

              {/* Pole with rounded bottom */}
              <rect x="47" y="65" width="6" height="30" fill="#8B4513" rx="1" />

              {/* Sign board */}
              <g transform="translate(20,15)">
                {/* Main board with shadow */}
                <rect
                  x="0"
                  y="20"
                  width="60"
                  height="30"
                  rx="4"
                  fill="#A0522D"
                  filter="drop-shadow(1px 2px 1px rgba(0,0,0,0.15))"
                />

                {/* Text */}
                <text
                  x="30"
                  y="39"
                  textAnchor="middle"
                  fill="white"
                  fontFamily="Arial"
                  fontSize="12"
                  fontWeight="bold"
                >
                  Apply
                </text>
              </g>
            </svg>
          )}
        </div>
      </div>

      {/* Applications Closed Dialog */}
      <ApplicationsClosedDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />

      {/* Content sections */}
      <About />
      <Partners />
      <Speakers />
      <FAQ />
      <AboutUs />
      <Footer />
    </div>
  );
};
export default Index;
