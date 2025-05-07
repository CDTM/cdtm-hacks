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
• Valid ID / Passport
• Laptop
• Charger
• Water bottle
• Comfortable clothes
• Good Vibes :)

<h3 class="text-xl font-bold mb-1">😴 If you plan to stay overnight:</h3>
• Air mattress
• Sleeping bag
• Small Pillow
• Sleeping mask
• Ear plugs
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
4. You will also get a goodie bag 
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

/* Nils Telefon Nummer */

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
        id: "wifi",
        title: "Internet Access",
        icon: "award",
        content: `To join our WiFi network, please connect to "Celonis Visitors" and follow the instructions. As a company you can enter "CDTM HACKS".`,
      },
      {
        id: "schedule-overview",
        title: "Schedule Overview",
        icon: "calendar",
        content: `
        
        TODO: Add schedule
        
        You should also add the event calendar <a class="underline text-springBlue" href='https://hacks.cdtm.com/calendar'>here</a> to your calendar to stay updated even when you're totaly locked-in.`,
      },
      {
        id: "channels",
        title: "Communication Channels",
        icon: "messageSquare",
        content: `We have several communication channels for you to stay update:
        
        <b class="text-xl font-bold mb-0">Discord</b>
        We will use Discord as our main communication channel to communicate with you during the event. You can join the server <a class="underline text-springBlue" href='https://hacks.cdtm.com/discord'>hacks.cdtm.com/discord</a>. Next to all the organisational & informational things there is also a lot of space to post your photos, memes, ideas & shit talk about that one team that you totally crushed in the last 24 hours.

        <b class="text-xl font-bold mb-0">Images</b>
        If you take any photos during the event, please share them with us on Discord. We will also have a photo booth setup at the event.

        <b class="text-xl font-bold mb-0">Social Media</b>
        We will use Instagram & X to post updates about the event to the public. 
        You can follow us on Instagram under <a class="underline text-springBlue" href='https://www.instagram.com/centerlings/'>centerlings</a> & on Twitter/X under <a class="underline text-springBlue" href='https://x.com/cdtm_munich'>@cdtm_munich</a>.

        Feel free to post about the event on your own social media. Tag us & use the hashtag <b class="text-springBlue">#cdtmhacks</b> to get some engagement from the crew.

        <b class="text-xl font-bold mb-0">Website</b>
        We will try our best to keep the website & especially the Guidebook updated with the latest information about the event. If you are here you probably found the website. Good job 🍪.

        `,
      },
      {
        id: "food",
        title: "Food & Drinks",
        icon: "utensils",
        content: `
          TODO: Add food & drinks
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
        id: "pref-submission",
        title: "Case Preference",
        icon: "star",
        content: `All teams will need to submit their case preferences on <b>Friday, 9th May until 22:00</b>. You can choose one of the 3 cases to work on with your team. We will do our best to accommodate all preferences. 
        
        For the challenges you don't need to submit a preference in the beginning. You can choose the challenges in the final submission form.`,
      },
      {
        id: "cases-vs-challenges",
        title: "Cases vs. Challenges",
        icon: "star",
        content: `
        There are 3 <b>Cases</b>, which define a problem space you can work on. You can work on exactly one case & need to submit your preference on Friday, 9th May until 22:00.

        At the same time you can compete in several <b>Challenges</b> at a time. Challenges are open to all teams of all cases. You will only need to pick the challenges you want to work on in the final submission form.
        `,
      },
      {
        id: "how-you-can-win",
        title: "How you can win..",
        icon: "star",
        content: `
        <b>Cases:</b>
        - Submit your preference on Friday, 9th May until 22:00
        - Work on the case you get confirmed from the crew
        - Hackhackhackhack...
        - Create a video pitch for your final submission
        - Submit your solution on Sunday, 11th May until 10:00
        - Winners will be announced on Sunday, 11th May at the closing ceremony

        <b>Challenges:</b>
        - Look at the challenges list & integrate those you find interesting into your project work
        - More hackhackhack...
        - In the final submission form pick the challenges you worked on & submit your solution by Sunday, 11th May until 10:00
        - Winners will be announced on Sunday, 11th May at the closing ceremony

        <b>Main Prizes:</b>
        - Work on your case & challenges
        - Complete the final submission for your case
        - The jury will select the best solutions across all cases & challenges
        - Winners will be announced on Sunday, 11th May at the closing ceremony

        <b>San Francisco Trip:</b>
        - We will keep you updated on the information on the San Francisco trip
        `,
      },
      {
        id: "main-prices",
        title: "Main Prizes",
        icon: "star",
        content: `
        We will have 3 main prizes for everybody competing in one of the 3 cases. The exact prizes will be announced on Friday, 9th May at the opening ceremony.
        `,
      },
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
        id: "san-francisco",
        title: "San Francisco Trip",
        icon: "star",
        content: `We will update on the information on the San Francisco trip soon.`,
      },
      {
        id: "teams",
        title: "Team Formation",
        icon: "users",
        content: `If you'd like to start looking for a team before the event (which we strongly recommend), we have a team-building channel on <a class="underline text-springBlue" href='https://discord.gg/ht3AHskN'>Discord</a>. Here's how it works:

<h3 class="text-xl font-bold mb-1">After you are in the Discord server: </h3>
In the #looking-for-team channel, post a message introducing yourself and your team-building preferences:

🧑‍💻 What you do (e.g., dev, design, biz)
🌱 Your skills you bring to the table
👀 Who you are looking for

If you don't find a team, don't worry! You will have time after the case deep dive sessions on Friday.

<p class="my-1">❗Please note that the maximum team size is 4 people.</p>
<h3 class="text-xl font-bold mb-1">How to register your team: </h3>
Register your team after the opening ceremony using the provided form. You will have time until <b>22:00</b> to register your team.`,
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
<p class="mt-2">We will update the factsheet with more details as we go.</p>`,
      },
      {
        id: "submission",
        title: "Submission Process",
        icon: "upload",
        content:
          "We are working on the submission process. More information on Friday. Please stay tuned.",
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

Join our community in Munich as part of the Fall 2025 Class. Apply <a class="underline text-springBlue" href='https://application.cdtm.com/login'>here</a>. The deadline is 30th May 2025.There are a lot of Centerlings running around the hackathon. Feel free to say hi and ask them about CDTM. `,
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
    ],
  },
];
