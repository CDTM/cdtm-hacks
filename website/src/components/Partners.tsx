import {
  CASE_SPONSORS,
  CHALLENGE_SPONSORS,
  FOOD_SPONSORS,
  TECH_SPONSORS,
} from "@/constants/partners";
import { Lock } from "lucide-react";

const SponsorPlaceholder = ({ index }: { index: number }) => (
  <>
    <div
      className="absolute inset-0 blur-xl opacity-30"
      style={{
        background: `linear-gradient(${index * 45}deg, #eaf3fd, #a8d0ff)`,
      }}
    />
    <div className="relative flex flex-col items-center gap-2">
      <Lock className="w-6 h-6 text-gray-400" />
      <span className="text-sm text-gray-400">To be announced</span>
    </div>
  </>
);

const Partners = () => {
  return (
    <section id="partners" className="section-transition bg-springGray">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-center text-springBlue mb-12">Our Partners</h2>

        {/* Main Prize Sponsor */}
        {/* <div className="mb-16">
          <h3 className="text-center text-xl text-springText/80 mb-8">
            Main Prize Sponsor
          </h3>
          <div className="flex justify-center">
            <div className="flex items-center justify-center p-6 rounded-lg bg-white border border-springBlue/10 shadow-md w-full max-w-[300px] h-[150px] transition-all hover:shadow-lg relative overflow-hidden">
              {MAIN_SPONSOR.image ? (
                <img
                  src={MAIN_SPONSOR.image}
                  alt={MAIN_SPONSOR.name}
                  className="object-contain w-full h-full"
                />
              ) : (
                <SponsorPlaceholder index={0} />
              )}
            </div>
          </div>
        </div> */}

        {/* Case Sponsors */}
        <div className="mb-16">
          <h3 className="text-center text-xl text-springText/80 mb-8">
            Case Sponsors
          </h3>
          <div className="flex flex-wrap justify-center gap-8">
            {CASE_SPONSORS.map((sponsor, index) => (
              <div
                key={index}
                className="flex items-center justify-center p-4 rounded-lg bg-white border border-springBlue/10 shadow-sm w-full max-w-[300px] h-[150px] transition-all hover:shadow-md relative overflow-hidden"
              >
                {sponsor.image ? (
                  <img
                    src={sponsor.image}
                    alt={sponsor.name}
                    className={`object-contain w-full h-full ${sponsor.class}`}
                  />
                ) : (
                  <SponsorPlaceholder index={index} />
                )}
                {sponsor.link && (
                  <a
                    href={sponsor.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h3 className="text-center text-xl text-springText/80 mb-8">
            Challenge Sponsors
          </h3>
          <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
            {CHALLENGE_SPONSORS.map((sponsor, index) => (
              <div
                key={index}
                className="flex items-center justify-center p-6 rounded-lg bg-white border border-springBlue/5 shadow-sm w-[calc(15%-1rem)] min-w-[250px] h-[120px] transition-all hover:shadow-md relative overflow-hidden"
              >
                {sponsor.image ? (
                  <img
                    src={sponsor.image}
                    alt={sponsor.name}
                    className={`object-contain w-full h-full ${sponsor.class}`}
                  />
                ) : (
                  <SponsorPlaceholder index={index} />
                )}
                {sponsor.link && (
                  <a
                    href={sponsor.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Tech Sponsors */}
        <div className="mb-12">
          <h3 className="text-center text-xl text-springText/80 mb-8">
            Tech Sponsors
          </h3>
          <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
            {TECH_SPONSORS.map((sponsor, index) => (
              <div
                key={index}
                className="flex items-center justify-center p-6 rounded-lg bg-white border border-springBlue/5 shadow-sm w-[calc(33%-1rem)] min-w-[230px] max-w-[250px] h-[120px] transition-all hover:shadow-md relative overflow-hidden md:w-[calc(33%-1rem)] md:max-w-[200px]"
              >
                {sponsor.image ? (
                  <img
                    src={sponsor.image}
                    alt={sponsor.name}
                    className={`object-contain w-full h-full ${sponsor.class}`}
                  />
                ) : (
                  <SponsorPlaceholder index={index} />
                )}
                {sponsor.link && (
                  <a
                    href={sponsor.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Food Sponsors */}
        <div className="mb-12">
          <h3 className="text-center text-xl text-springText/80 mb-8">
            Event Sponsors
          </h3>
          <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
            {FOOD_SPONSORS.map((sponsor, index) => (
              <div
                key={index}
                className="flex items-center justify-center p-6 rounded-lg bg-white border border-springBlue/5 shadow-sm w-[calc(33%-1rem)] min-w-[230px] max-w-[250px] h-[120px] transition-all hover:shadow-md relative overflow-hidden md:w-[calc(33%-1rem)] md:max-w-[200px]"
              >
                {sponsor.image ? (
                  <img
                    src={sponsor.image}
                    alt={sponsor.name}
                    className={`object-contain w-full h-full ${sponsor.class}`}
                  />
                ) : (
                  <SponsorPlaceholder index={index} />
                )}
                {sponsor.link && (
                  <a
                    href={sponsor.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-lg font-medium text-springBlue/70 italic">
            More partners to be announced soon
          </p>
        </div>
      </div>
    </section>
  );
};

export default Partners;
