const AboutUs = () => {
  return (
    <section id="about-us" className="section-transition bg-springGray">
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-center text-springBlue mb-12">Organisers</h2>

        <div className="flex flex-col gap-12 max-w-6xl mx-auto">
          {/* Organization Info */}
          <div className="space-y-6">
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              <div className="space-y-6 lg:w-2/3 mx-4">
                <p className="text-springText/80 ">
                  The CDTM Hackathon is organized by the Center for Digital
                  Technology and Management (CDTM), a joint institution of
                  excellence by Technical University of Munich (TUM) and
                  Ludwig-Maximilians-Universität München (LMU). CDTM is the
                  place to educate, connect & empower the innovators of
                  tommorow.
                </p>
                <p className="text-springText/80">
                  CDTM alumni have founded 20% of all German unicorns, raised
                  billions in VC funding, and lead research at MIT, Deepmind, or
                  Stanford. And all this with only 50 students joining per year.
                </p>
                <div className="flex gap-4 mt-4">
                  <a
                    href="https://cdtm.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-springBlue hover:text-springBlue/80 underline"
                  >
                    Learn more about CDTM
                  </a>
                </div>
              </div>
              <div className="lg:w-1/3 mr-4">
                <img
                  src="/images/cdtm.png"
                  alt="CDTM Logo"
                  className="w-full max-h-[300px] rounded-lg mx-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
