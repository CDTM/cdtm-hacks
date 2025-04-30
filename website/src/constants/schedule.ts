export interface ScheduleDay {
  title: string;
  subtitle?: string;
  events: ScheduleEvent[];
}

export interface ScheduleEvent {
  time: string;
  title: string;
  description?: string;
}

export const SCHEDULE_DAYS: ScheduleDay[] = [
  {
    title: "Friday, 9th May",
    events: [
      {
        time: "16:00",
        title: "Doors Open",
        description: "Welcome & Registration",
      },
      {
        time: "18:00",
        title: "Mingling & Snacks",
        description: "Network with other participants",
      },
      {
        time: "19:00",
        title: "Opening Ceremony",
        description: "@ Main Stage",
      },
      {
        time: "22:00",
        title: "Hacking Begins",
        description: "Start working on your solutions",
      },
      {
        time: "00:00",
        title: "Midnight Snacks",
      },
    ],
  },
  {
    title: "Saturday, 10th May",
    subtitle: "Full day of hacking",
    events: [
      {
        time: "Starting 08:00",
        title: "Breakfast",
      },
      {
        time: "13:00",
        title: "Lunch",
      },
      {
        time: "19:00",
        title: "Dinner",
      },
      {
        time: "00:00",
        title: "Midnight Snack",
        description: "Fuel for night owls",
      },
    ],
  },
  {
    title: "Sunday, 11th May",
    events: [
      {
        time: "Starting 08:00",
        title: "Breakfast",
      },
      {
        time: "10:00",
        title: "Hacking Stops",
        description: "Submission of solutions",
      },
      {
        time: "12:00",
        title: "Judging & Closing",
        description: "Evaluation and award ceremony",
      },
      {
        time: "15:00",
        title: "Event Ends",
        description: "Official conclusion",
      },
    ],
  },
];
