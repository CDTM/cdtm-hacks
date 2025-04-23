import { FaLinkedin } from "react-icons/fa";
import { useEffect, useRef } from "react";
import { SPEAKERS } from "@/constants/speakers";
import { Lock } from "lucide-react";

const SpeakerPlaceholder = () => (
  <div
    className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform hover:-translate-y-1 hover:shadow-lg relative h-full"
  >
    <div
      className="absolute inset-0 blur-xl opacity-30"
      style={{
        background: `linear-gradient(45deg, #eaf3fd, #a8d0ff)`,
      }}
    />
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <Lock className="w-6 h-6 text-gray-400" />
        <span className="text-sm text-gray-400">To be announced</span>
      </div>
    </div>
  </div>
);

const Speakers = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const scrollTop = window.scrollY;
      const sectionRect = sectionRef.current.getBoundingClientRect();
      const sectionTop = sectionRect.top + scrollTop;
      const sectionHeight = sectionRef.current.offsetHeight;

      // Only apply parallax when the section is in view
      if (
        scrollTop + window.innerHeight > sectionTop &&
        scrollTop < sectionTop + sectionHeight
      ) {
        imageRefs.current.forEach((imgRef, index) => {
          if (!imgRef) return;

          // Calculate how far the image is from the top of the viewport
          const imgRect = imgRef.getBoundingClientRect();
          const distanceFromTop = imgRect.top;

          // Apply parallax effect - move slower than scroll speed
          // Different speeds for different images to create depth
          const speed = 0.15 + (index % 3) * 0.05; // Vary speed slightly between images
          const offset = (window.innerHeight - distanceFromTop) * speed;

          imgRef.style.transform = `translateY(${-offset * 0.2}px)`;
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      id="speakers"
      ref={sectionRef}
      className="section-transition bg-springWhite"
    >
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-center text-springBlue mb-12">Speakers & Judges</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {SPEAKERS.map((speaker, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="h-48 bg-springPaleBlue overflow-hidden">
                <img
                  ref={(el) => (imageRefs.current[index] = el)}
                  src={speaker.image}
                  alt={speaker.name}
                  className="w-full will-change-transform"
                  style={{
                    transformOrigin: "center top",
                    transform: "translateY(0)",
                    transition: "transform 0.05s linear",
                    objectPosition: "center top", // Anchor to top
                  }}
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-1 justify-between">
                  <h3 className="text-xl font-semibold text-springBlue">
                    {speaker.name}
                  </h3>
                  <a
                    href={speaker.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${speaker.name}'s LinkedIn profile`}
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <FaLinkedin size={18} />
                  </a>
                </div>
                <p className="text-springText/80">{speaker.title}</p>
                <p className="text-springText/80 mb-2">{speaker.company}</p>
                <p className="text-sm text-springBlue font-bold">
                  CDTM {speaker.cdtmClass}
                </p>
              </div>
            </div>
          ))}
          <SpeakerPlaceholder />
        </div>

        <div className="mt-12 text-center">
          <p className="max-w-2xl mx-auto text-springText/90">
            Learn from and get feedback from industry leaders and successful
            CDTM alumni who are changing the tech landscape.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Speakers;
