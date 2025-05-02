import About from "@/components/About";
import AboutUs from "@/components/AboutUs";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Partners from "@/components/Partners";
import Schedule from "@/components/Schedule";
import Speakers from "@/components/Speakers";
import FAQ from "@/components/FAQ";
import { useEffect, useRef, useState } from "react";

const Index = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const sunLayerRef = useRef<HTMLDivElement>(null);
  const bgLayerRef = useRef<HTMLDivElement>(null);
  const midLayerRef = useRef<HTMLDivElement>(null);
  const fgLayerRef = useRef<HTMLDivElement>(null);
  const [isWideAspectRatio, setIsWideAspectRatio] = useState(false);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

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
    const calculateCountdown = () => {
      const deadline = new Date("May 2, 2025 23:59:59 GMT+0200"); // German time (CEST)
      const now = new Date();
      const timeLeft = deadline.getTime() - now.getTime();

      if (timeLeft <= 0) {
        // Past the deadline
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds });
    };

    // Calculate immediately
    calculateCountdown();

    // Then update every second
    const timer = setInterval(calculateCountdown, 1000);
    return () => clearInterval(timer);
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
  return (
    <div className="min-h-[80vh] overflow-x-hidden bg-springPaleBlue">
      <Navbar backgroundColor="bg-springPaleBlue/30" />
      {/* Hero section with parallax effect */}
      <div
        ref={parallaxRef}
        className="parallax-container flex flex-col items-center relative min-h-screen"
      >
        {/* Green gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-green-50/30 to-white/10 z-0"></div>

        {/* Sun layer - rising sun effect */}
        <div
          ref={sunLayerRef}
          className="parallax-layer z-1 top-[35%] md:top-[25%]"
          style={{
            background: `radial-gradient(circle at center 120%, #FFE17D 0%, #FFA41B 20%, #F7F2E380 70%, transparent 75%)`,
            height: "30vh",
            width: "30vh",
            borderRadius: "50%",
            left: "5%",
            opacity: 0.85,
            boxShadow: "0 0 50px 5px rgba(255, 209, 82, 0.6)",
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
            backgroundImage: `url("/images/parallax/spring-elements.svg")`,
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
        <div className="container mx-auto px-4 pt-[10vh] relative z-10 text-center flex flex-col items-center justify-center h-full">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-springBlue mb-4 animate-fade-in">
            CDTM HACKS 2025
          </h1>
          <p
            className={`text-xl md:text-2xl mb-2 max-w-2xl animate-fade-in ${
              isWideAspectRatio ? "text-white font-bold" : "text-springText"
            }`}
            style={{
              animationDelay: "0.1s",
              ...(isWideAspectRatio && {
                textShadow: "0px 0px 3px rgb(0 0 0.5)",
              }),
            }}
          >
            Spring is here - plant your ideas.
            <br />
            Join us for 36 hours of building in the heart of Europe.
          </p>
          <a
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
          </a>

          {/* Application Countdown */}
          <div
            className="bg-white/95 backdrop-blur-sm rounded-lg shadow-md px-2 py-3 mb-6 animate-fade-in flex flex-col items-center max-w-[300px] w-full mx-auto"
            style={{
              animationDelay: "0.25s",
            }}
          >
            <p className="text-springBlue font-medium text-sm mb-1">
              Application deadline:
            </p>
            <div className="flex justify-center gap-4 sm:gap-6 text-springText w-full">
              <div className="flex flex-col items-center">
                <span className="font-bold text-xl sm:text-2xl">
                  {countdown.days}
                </span>
                <span className="text-xs">days</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-bold text-xl sm:text-2xl">
                  {countdown.hours}
                </span>
                <span className="text-xs">hours</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-bold text-xl sm:text-2xl">
                  {countdown.minutes}
                </span>
                <span className="text-xs">mins</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-bold text-xl sm:text-2xl">
                  {countdown.seconds}
                </span>
                <span className="text-xs">secs</span>
              </div>
            </div>
          </div>

          {/* Mobile buttons - only show on small screens */}
          <div
            className="flex flex-col gap-4 animate-fade-in md:hidden"
            style={{
              animationDelay: "0.3s",
            }}
          >
            <a
              href="https://app.formbricks.com/s/cm87i0iq40000ji039uyra9hq"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-hover-effect bg-springBlue text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              Apply
            </a>
          </div>
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
              e.currentTarget.style.transform = "translate(-50%) rotateZ(2deg)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translate(-50%) rotateZ(0deg)";
            }}
            onClick={() => {
              window.open(
                "https://app.formbricks.com/s/cm87i0iq40000ji039uyra9hq",
                "_blank"
              );
            }}
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
        </div>
      </div>

      {/* Content sections */}
      <About />
      <Partners />
      <Speakers />
      <Schedule />
      <FAQ />
      <AboutUs />
      <Footer />
    </div>
  );
};
export default Index;
