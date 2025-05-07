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

<p class="mt-4 mb-4">❗Please note that the entrance at Theresienstraße 6 is closed. Please only use the entrance at Theresienstraße 4.</p>

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
        title: "Case Descriptions",
        icon: "star",
        content: `The cases will be presented on Friday, 9th May at the opening ceremony. You will find more information afterwards on the website.`,
      },
      {
        id: "challenge-descriptions",
        title: "Challenge Descriptions",
        icon: "star",
        content: `The challenges will be presented on Friday, 9th May at the opening ceremony. You will find more information afterwards on the website.`,
      },
      {
        id: "teams",
        title: "Team Formation Guidelines",
        icon: "users",
        content: `If you'd like to start looking for a team before the event (which we strongly recommend), we have a team-building channel on <a class="underline text-springBlue" href='https://discord.gg/ht3AHskN'>Discord</a>. Here's how it works:

<h3 class="text-xl font-bold mb-1">After you are in the Discord server: </h3>
• In the #looking-for-team channel, post a message introducing yourself and your team-building preferences:
• 🧑‍💻 What you do (e.g., dev, design, biz)
• 🌱 Which case are you're into
• 👀 Who are you looking for
• If you find one that looks like a great match reach out to them and see if you would be a good team! (You can also react to their message and see if they reach out to you if they don't accept any direct messages)
• If you don't find a team, don't worry! You will have time after the case deep dive sessions on Friday.

<p class="mt-4 mb-4">❗Please note that the maximum team size is 4 people.</p>

<h3 class="text-xl font-bold mb-1">How to register your team: </h3>
• Attend the opening ceremony and the case deep dive sessions on Friday, 9th May. (Calendar for exact information on sessions <a class="underline text-springBlue" href='https://calendar.google.com/calendar/u/0?cid=Y19jNGYyYWFjOTQzMWUwNTNmODBiZmQxNzgwZTE4NWQ0MTliMGVlOTk5YjVjNjZlOTg3MDAyYzQ1YzlhYjhhMWIwQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20'>here</a>)
• After the case deep dive sessions, the team registration and the case preference from will be open. The form can be found <a class="underline text-springBlue" href='https://hacks.cdtm.com/register'>here</a>.
• And you're all set for hacking!`,
      },
      {
        id: "tools",
        title: "Available Tools & Resources",
        icon: "wrench",
        content: `<h3 class="text-xl font-bold ">Tech Sponsors</h3>
<table class="min-w-full text-left border border-gray-200">
  <thead>
    <tr>
      <th class="px-4 py-2 border-b">Partner</th>
      <th class="px-4 py-2 border-b">Contribution</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="px-4 py-2 border-b">OpenAI</td>
      <td class="px-4 py-2 border-b">300€ worth of credits per team</td>
    </tr>
    <tr>
      <td class="px-4 py-2 border-b">MistralAI</td>
      <td class="px-4 py-2 border-b">10€ worth of credits per participant</td>
    </tr>
    <tr>
      <td class="px-4 py-2 border-b">Cognition</td>
      <td class="px-4 py-2 border-b">50€ worth of credits per participant</td>
    </tr>
    <tr>
      <td class="px-4 py-2 border-b">Make.com</td>
      <td class="px-4 py-2 border-b">Student Membership</td>
    </tr>
    <tr>
      <td class="px-4 py-2 border-b">Lovable</td>
      <td class="px-4 py-2 border-b">TBD</td>
    </tr>
    <tr>
      <td class="px-4 py-2 border-b">Langfuse</td>
      <td class="px-4 py-2 border-b">3 months access to Langfuse Core/Pro</td>
    </tr>
    <tr>
      <td class="px-4 py-2 border-b">CedarDB</td>
      <td class="px-4 py-2 border-b">Access to CedarDB Alpha</td>
    </tr>
  </tbody>
</table>

<p class="mt-4">For more details, see the tech factsheet (link coming soon).</p>`,
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
        content: `
        The Celonis headquarters at Theresienstraße 6 is located in the Maxvorstadt district near the Technical University of Munich. Here are the best ways to reach this location:

        Just use Google Maps to find the best way to get to the venue: <iframe src="https://www.google.com/maps?q=Theresienstraße+4,+80333+München,+Germany&output=embed" width="100%" height="300" style="border:0; border-radius: 8px; margin-top: 12px; margin-bottom: 12px;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        <h3 class="text-lg font-bold">MVV System:</h3>
        U-Bahn: U2 to Theresienstraße station → 2-3 min walk east, U3 to Universität station → 2-3 min walk north
        Tram: Line 27 or 28 to Pinakotheken → 5 min walk west
        From Central Station: U2 (direction Feldmoching) → 3 stops to Theresienstraße
        Bus: Take Bus 100 or Bus 150 to Pinakotheken stop → Walk approximately 5 minutes west along Theresienstraße
        `,
      },
      {
        id: "food",
        title: "Food & Drinks",
        icon: "utensils",
        content: `If you have more time in Munich on Friday or Sunday, here are some recommendations for food and drinks around the venue:
          
          <h3 class="text-lg font-bold">Food:</h3>
          • Nostimo Greek Deli (Salats, Good Veggie Options)
          • Taco Company (Tacos, Good Veggie Options)
          • many more options in the area
          
          <h3 class="text-lg font-bold">Cafés:</h3>
          • Lost Weekend (Cafe, Bar)
          • Gartensalon (Cafe, Cakes, Vegan Options)
          • Das METTA (Cafe)
          • PLEX Coffee (Cafe to Go)
          • Cafe moinsplatz (Cafe, Vintage-Bikes)
          • Billy's Coffee (Cafe)
          
          `,
      },
    ],
  },
];
