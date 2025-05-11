import 'dotenv/config';
import admin from "firebase-admin";
import { parse } from "csv-parse/sync";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Firebase Admin using environment variable
admin.initializeApp();

interface Project {
  id: string;
  name: string;
  case: "Trade Republic" | "avi" | "beam";
  whatIsProject: string;
  howBuilt: string;
  difficulties: string;
  oneSentencePitch: string;
  githubUrl: string;
  videoUrl: string;
  placement?: 1 | 2;
  challenges?: Array<{
    name: string;
    sponsoredBy: string;
    companies: Array<{
      name: string;
      url?: string;
      logoPath: string;
      logoClass: string;
    }>;
  }>;
}

interface TeamData {
  name: string;
  emails: string[];
  case: "Trade Republic" | "avi" | "beam";
}

async function convertSubmissions() {
  try {
    // Read CSV file
    const csvContent = fs.readFileSync(
      path.join(__dirname, "../submissions.csv"),
      "utf-8"
    );

    // Parse CSV
    const records = parse(csvContent, {
      columns: true,
      skip_empty_lines: true,
    });

    // Sort records by timestamp in descending order (newest first)
    records.sort((a, b) => new Date(b.Timestamp).getTime() - new Date(a.Timestamp).getTime());

    // Group submissions by team ID to get only the latest submission
    const latestSubmissions = new Map<string, any>();
    for (const record of records) {
      const teamCode = record["1. What is Your Team ID?"];
      // Only set if we haven't seen this team ID before (since records are sorted newest first)
      if (!latestSubmissions.has(teamCode)) {
        latestSubmissions.set(teamCode, record);
      }
    }

    const projects: Project[] = [];

    // Process each record (now only the latest submission per team)
    for (const record of latestSubmissions.values()) {
      const teamCode = record["1. What is Your Team ID?"];
      
      // Fetch team data from Firestore
      const teamDoc = await admin.firestore()
        .collection("Teams")
        .doc(teamCode.toLowerCase())
        .get();

      let teamData: TeamData;
      if (!teamDoc.exists) {
        console.warn(`Team with code ${teamCode} not found in Firestore`);

        // dummy data
        // teamData = {
        //   name: "Team Name",
        //   emails: ["team@example.com"],
        //   case: ["Trade Republic", "avi", "beam"][Math.floor(Math.random() * 3)] as "Trade Republic" | "avi" | "beam",
        // };
        // console.log(`WARNING: Team with code ${teamCode} not found in Firestore. Using dummy data.`);

        continue;
      } else {
        teamData = teamDoc.data() as TeamData;
      }

      const project: Project = {
        id: `project-${teamCode.toLowerCase()}`,
        name: record["3. Give Your Project a Name"],
        case: teamData.case,
        whatIsProject: record["8. What Is Your Project?"],
        howBuilt: record["9. How You Built It"],
        difficulties: record["10. Difficulties You Faced"],
        oneSentencePitch: record["7. One-Sentence Pitch"],
        githubUrl: record["6. GitHub Repository"] || "",
        videoUrl: record["4. Pitch video"],
      };

      projects.push(project);
    }

    // Generate TypeScript file
    const tsContent = `// This file is auto-generated. Do not edit manually.
import { Project } from "./projects-page-config";

export const projects: Project[] = ${JSON.stringify(projects, null, 2)};
`;

    // Write to file
    fs.writeFileSync(
      path.join(__dirname, "../../../website/src/constants/projects.ts"),
      tsContent
    );

    console.log("Successfully converted submissions to projects.ts");
  } catch (error) {
    console.error("Error converting submissions:", error);
    process.exit(1);
  }
}

// Run the conversion
convertSubmissions(); 