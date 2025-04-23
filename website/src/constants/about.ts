import { Award, Clock, Code, Users } from "lucide-react";

export interface AboutStat {
  icon: typeof Users | typeof Clock | typeof Code | typeof Award;
  title: string;
  description: string;
}

export const ABOUT_STATS: AboutStat[] = [
  {
    icon: Users,
    title: "125 Hackers",
    description:
      "Bringing together the brightest minds from across Germany & Europe to collaborate and innovate.",
  },
  {
    icon: Clock,
    title: "36h Hacking",
    description:
      "An intensive weekend of hacking, learning, and building innovative solutions together.",
  },
  {
    icon: Code,
    title: "3 Exciting Cases",
    description:
      "Tackle real-world challenges provided by industry leaders and create impactful solutions.",
  },
  {
    icon: Award,
    title: ">5.000 € in Prizes",
    description:
      "Win incredible rewards, gain industry recognition, and open doors to new opportunities.",
  },
];
