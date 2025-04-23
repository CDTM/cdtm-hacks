import { SCHEDULE_DAYS } from "@/constants/schedule";

const Schedule = () => {
  return (
    <section id="schedule" className="section-transition bg-springGray">
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-center text-springBlue mb-12">Event Schedule</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {SCHEDULE_DAYS.map((day, dayIndex) => (
            <div
              key={dayIndex}
              className="bg-springPaleBlue/20 rounded-lg p-6 shadow-sm border border-springBlue/10"
            >
              <h3 className="text-xl font-semibold text-springBlue mb-4">
                {day.title}
              </h3>
              {day.subtitle && (
                <p className="text-sm text-springText/70 mb-4 italic">
                  {day.subtitle}
                </p>
              )}
              <ul className="space-y-4">
                {day.events.map((event, eventIndex) => (
                  <li key={eventIndex} className="flex">
                    <span className="text-springBlue font-medium w-16 shrink-0">
                      {event.time}
                    </span>
                    <div>
                      <p className="font-medium">{event.title}</p>
                      {event.description && (
                        <p className="text-sm text-springText/70">
                          {event.description}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
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
