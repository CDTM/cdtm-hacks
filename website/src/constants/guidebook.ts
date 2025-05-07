import {
  Info,
  Star,
  MapPin,
  MessageSquare,
  Menu,
  CheckSquare,
  Truck,
  Award,
  Pill,
  Calendar,
  Map,
  Users,
  Wrench,
  Upload,
  Phone,
  MessageCircle,
  Utensils,
  Building,
  LucideIcon,
} from "lucide-react";

// Define icon names as strings instead of JSX elements
export type IconName =
  | "info"
  | "star"
  | "mapPin"
  | "messageSquare"
  | "menu"
  | "checkSquare"
  | "truck"
  | "award"
  | "pill"
  | "calendar"
  | "map"
  | "users"
  | "wrench"
  | "upload"
  | "phone"
  | "messageCircle"
  | "utensils"
  | "building";

// Map of icon names to their components
export const iconMap: Record<IconName, LucideIcon> = {
  info: Info,
  star: Star,
  mapPin: MapPin,
  messageSquare: MessageSquare,
  menu: Menu,
  checkSquare: CheckSquare,
  truck: Truck,
  award: Award,
  pill: Pill,
  calendar: Calendar,
  map: Map,
  users: Users,
  wrench: Wrench,
  upload: Upload,
  phone: Phone,
  messageCircle: MessageCircle,
  utensils: Utensils,
  building: Building,
};

export interface GuidebookSubsection {
  id: string;
  title: string;
  icon: IconName;
  content: string;
}

export interface GuidebookSection {
  id: string;
  title: string;
  icon: IconName;
  subsections: GuidebookSubsection[];
}

export const GUIDEBOOK_DATA: GuidebookSection[] = [
  {
    id: "general",
    title: "General Information",
    icon: "info",
    subsections: [
      {
        id: "checklist",
        title: "Participant Checklist",
        icon: "checkSquare",
        content: `<h3 class="text-xl font-bold mb-1">🤝 Must Haves:</h3>
• Valid ID
• Laptop
• Charger
• Other Devices you may need
• Water bottle
• Comfortable clothes
• Good Vibes :)

<h3 class="text-xl font-bold mb-1">😴 If you plan to stay overnight:</h3>
• Air mattress
• Sleeping bag
• Small Pillow
• Sleeping mask
• Ear plugs
• ...

<h3 class="text-xl font-bold mb-1">🔑 Essentials:</h3>
• Basic toiletries: Toothpaste, Toothbrush, Shampoo, Deodorant, Medications, etc.
• Towel (You will get free access to shower at the venue (ground floor))
• ...`,
      },
      {
        id: "accreditation",
        title: "Accreditation Process",
        icon: "award",
        content: `<h3 class="text-xl font-bold mb-1">How to get your participant badge and complete registration:</h3>
1. Go to the registration desk at the entrance of the Celonis Office
2. Show your ID 
3. After the verification, you will get your hacker badge
4. You will also get a goodie bag and hacker t-shirt 
5. And done. Enjoy CDTM Hacks 2025 🎉
`,
      },
      {
        id: "venue",
        title: "Venue Details and Map",
        icon: "map",
        content: `
<h3 class="text-xl font-bold mb-1">Event Venue - Celonis Office: </h3>
Theresienstraße 4, 80333 München<br />Germany<br /><br />
<iframe src="https://www.google.com/maps?q=Theresienstraße+4,+80333+München,+Germany&output=embed" width="100%" height="300" style="border:0; border-radius: 8px; margin-top: 12px; margin-bottom: 12px;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
• The doors open on Friday, 9th May, 16:00 (4:00 PM).
• Please make sure to arrive no later than 18:30 (6:30 PM) so we can kick things off smoothly together.
• Make sure to check for the CDTM Hacks signposts on main door and the hallway to get to the registration desks.

<h3 class="text-xl font-bold mb-1">Here's a small guide to walk you through the venue: </h3>

Enter the Celonis Office from the main entrance on Theresienstraße 4.

<img src="/images/celonis_entry.jpg" alt="Celonis Office Entrance" style="max-height: 300px; width: auto; border-radius: 8px; margin-top: 12px; margin-bottom: 12px;" />


<iframe src="https://drive.google.com/file/d/1ukLKsenh5lchg58t1USyrF4sqWo7vgSG/preview" width="auto%" height="450" style="border:0; border-radius: 8px; margin-top: 12px; margin-bottom: 12px;" allowfullscreen></iframe>

-
`,
      },
      {
        id: "firstaid",
        title: "First Aid & Safety",
        icon: "pill",
        content: `
Our Team (everybody who is wearing Team Merch) is there for you and will help you in every situation. If you need (medical) help, reach out to them or call the emergency number 112. In case of an emergency, please follow their instructions!

<b class="text-xl font-bold mb-0">What to do when you call 112?</b>

Make the call yourself if you can
→ Call from a safe place
→ Explain what happened
→ Tell your exact address and municipality: Celonis, Theresienstraße 6, 80333 München
→ Answer all the ERC operator's questions
→ Follow the instructions given
→ Don't end the call until permitted 

<b class="text-xl font-bold mb-0">Safety & wellbeing</b>

If you have face any situation that makes you feel not safe & uncomfortable in the environment of the hackathon please reach out to the team. There is always someone there from the team at the venue. We will help you to get out of the situation & handle it with care. You can also reach out individually to the team on Discord or approach us in person.

`,
      },
      {
        id: "schedule-overview",
        title: "Schedule Overview",
        icon: "calendar",
        content: `We will keep the schedule on our website and update it as we go. You can find the schedule <a class="underline text-springBlue" href='https://hacks.cdtm.com/schedule'>here</a>. 
        
        You should also add the event calendar <a class="underline text-springBlue" href='https://cdtm-hacks.com/calendar'>here</a> to your calendar to stay updated even when you're totaly locked-in.`,
      },
      {
        id: "channels",
        title: "Communication Channels",
        icon: "messageSquare",
        content: `We have several communication channels for you to stay update:
        
        <b class="text-xl font-bold mb-0">Discord</b>
        We will use Discord as our main communication channel to communicate with you during the event. You can join the server <a class="underline text-springBlue" href='https://discord.gg/UPG8h74VAU'>https://discord.gg/UPG8h74VAU</a>. Next to all the organisational & informational things there is also a lot of space to post your photos, memes, ideas & shit talk about that one team that you totally crushed in the last 24 hours.

        <b class="text-xl font-bold mb-0">Social Media</b>
        We will use Instagram & X to post updates about the event to the public. 
        You can follow us on Instagram under <a class="underline text-springBlue" href='https://www.instagram.com/centerlings/'>centerlings</a> & on Twitter/X under <a class="underline text-springBlue" href='https://x.com/cdtm_munich'>@cdtm_munich</a>.

        Feel free to post about the event on your own social media. Tag us & use the hashtag <b class="text-springBlue">#cdtmhacks</b> to get some engagement from the crew.

        <b class="text-xl font-bold mb-0">Website</b>
        We will try our best to keep the website & especially the Guidebook updated with the latest information about the event. If you are here you probably found the website. Good job 🍪.

        `,
      },
      {
        id: "feedback",
        title: "Feedback",
        icon: "messageCircle",
        content: `We are always looking for ways to improve the event. If you have any immediate feedback during the event, please just talk to us or reach out to us on Discord. We will try to help you as soon as possible.
          
          After the event, we will also ask you to fill out a feedback form to help us improve the event.`,
      },
    ],
  },
  {
    id: "challenges",
    title: "Cases & Challenges",
    icon: "star",
    subsections: [
      {
        id: "descriptions",
        title: "Challenge Descriptions",
        icon: "star",
        content:
          "Detailed information about each challenge and its objectives.",
      },
      {
        id: "teams",
        title: "Team Formation Guidelines",
        icon: "users",
        content: `Some of you might already have signed up with a team, others might be looking for a team. We will have a team formation session on Friday after the opening ceremony. Additionally there is the <b>🤝-looking-for-a-team</b> Discord channel for you to find a team or find people to join your team.`,
      },
      {
        id: "tools",
        title: "Available Tools & Resources",
        icon: "wrench",
        content: `<h3 class="text-xl font-bold mb-1">List of tools and resources available:</h3>
Add link to tech fachsheet`,
      },
      {
        id: "submission",
        title: "Submission Process",
        icon: "upload",
        content:
          "We are working on the submission process. More information on Friday. Please stay tuned.",
      },
      {
        id: "partners",
        title: "Partner Information",
        icon: "phone",
        content:
          "Information about our partners and their roles in the challenges.",
      },
    ],
  },
  {
    id: "cdtm",
    title: "CDTM & Munich",
    icon: "menu",
    subsections: [
      {
        id: "about",
        title: "About CDTM",
        icon: "building",
        content: `The Center of Digital Technology and Management, Munich is a joint entrepreneurship-focused program by Technical University of Munich and Ludwig-Maximilan-University, with a community of 1,000+ students and alumni who have founded 20% of German unicorns, raised 11% of Germany's VC funding ($1.2B in 2022), and lead research at MIT, Google DeepMind, and Stanford. To Learn more about CDTM, visit our <a class="underline text-springBlue" href='https://www.cdtm.com/'> website</a>.

Join our community in Munich as part of the Fall 2025 Class. Apply <a class="underline text-springBlue" href='https://application.cdtm.com/login'>here</a>. The deadline is 30th May 2025. `,
      },
      {
        id: "local",
        title: "Local Transportation",
        icon: "truck",
        content: "How to get around Munich during your stay.",
      },
      {
        id: "food",
        title: "Food & Accommodations",
        icon: "utensils",
        content: "Recommended places to eat and stay near the venue.",
      },
      {
        id: "highlights",
        title: "Munich Highlights",
        icon: "mapPin",
        content: "Points of interest to visit while you're in Munich.",
      },
    ],
  },
];
