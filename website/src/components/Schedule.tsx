import React from "react";

const Schedule = () => {
  return (
    <section id="schedule" className="section-transition bg-springGray">
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-center text-springBlue mb-12 text-3xl font-bold">
          Event Schedule
        </h2>
        <div className="flex justify-center">
          <iframe
            src="https://calendar.google.com/calendar/embed?src=c_c4f2aac9431e053f80bfd1780e185d419b0ee999b5c66e987002c45c9ab8a1b0%40group.calendar.google.com&ctz=Europe%2FBerlin&mode=AGENDA"
            style={{
              border: "0",
              width: "100%",
              maxWidth: "1200px",
              minHeight: "600px",
            }}
            height="600"
            frameBorder="0"
            scrolling="no"
            title="CDTM Hacks Agenda"
          ></iframe>
        </div>
        <div className="mt-6 text-center">
          <p className="max-w-2xl mx-auto text-springText/90">
            Join us for an exhilarating weekend of innovation, collaboration,
            and fun. All meals and refreshments are provided!
          </p>
        </div>
      </div>
    </section>
  );
};

export default Schedule;
