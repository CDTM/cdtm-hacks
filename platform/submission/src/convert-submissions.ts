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
  case: "trade-republic" | "avi" | "beam";
  description: string;
  pitch: string;
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
  case: "trade-republic" | "avi" | "beam";
}

async function convertSubmissions() {
  try {
    // Read CSV file
    const csvContent = fs.readFileSync(
      path.join(__dirname, "../../../website/export-submission-2025-05-07-08-43-55.csv"),
      "utf-8"
    );

    // Parse CSV
    const records = parse(csvContent, {
      columns: true,
      skip_empty_lines: true,
    });

    const projects: Project[] = [];

    // Process each record
    for (const record of records) {
      const teamCode = record["1. What is your team code?"];
      
      // Fetch team data from Firestore
      const teamDoc = await admin.firestore()
        .collection("Teams")
        .doc(teamCode.toLowerCase())
        .get();

      if (!teamDoc.exists) {
        console.warn(`Team with code ${teamCode} not found in Firestore`);
        continue;
      }

      const teamData = teamDoc.data() as TeamData;

      // Parse challenges
      const challenges = record["5. Challenges"]
        ? record["5. Challenges"]
            .split(";")
            .map((challenge: string) => {
              const match = challenge.match(/"([^"]+)" by ([^"]+)/);
              if (match) {
                return {
                  name: match[1],
                  sponsoredBy: match[2],
                  companies: [], // You'll need to map these based on your challenges data
                };
              }
              return null;
            })
            .filter(Boolean)
        : [];

      const project: Project = {
        id: `project-${teamCode.toLowerCase()}`,
        name: record["7. What is your project?"].split(".")[0], // Take first sentence as name
        case: teamData.case,
        description: record["7. What is your project?"],
        pitch: record["6. One sentence pitch"],
        githubUrl: record["2. GitHub Repository"],
        videoUrl: record["4. Pitch video"],
        challenges: challenges.length > 0 ? challenges : undefined,
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