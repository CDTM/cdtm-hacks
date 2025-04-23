import { ABOUT_STATS } from "@/constants/about";

const About = () => {
  return (
    <section id="about" className="section-transition bg-springWhite relative">
      <div className="container mx-auto px-4 pb-8">
        <h2 className="text-center text-springBlue mb-12">
          About the Hackathon
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {ABOUT_STATS.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-springPaleBlue/30 backdrop-blur-sm p-4 md:p-6 rounded-lg shadow-sm border border-springBlue/10 flex flex-col items-center text-center animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-springBlue/10 p-3 rounded-full mb-2 md:mb-4">
                  <Icon className="h-6 w-6 text-springBlue" />
                </div>
                <h3 className="text-base md:text-lg font-semibold">
                  {stat.title}
                </h3>
                <p className="hidden md:block text-sm text-springText/80 mt-2">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="max-w-3xl mx-auto text-springText/90">
            CDTM Hacks brings together the brightest students with the CDTM
            ecosystem to collaborate, innovate, and build together. Join us for
            a weekend of hacking and shared passion for technology and
            entrepreneurship.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
