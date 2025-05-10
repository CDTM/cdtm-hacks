import admin from "firebase-admin";
import { parse } from "csv-parse/sync";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { stringify } from "csv-stringify/sync";
import "dotenv/config";

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Firebase Admin using environment variable
admin.initializeApp();

interface TeamData {
  name: string;
  emails: string[];
  case: "Trade Republic" | "avi" | "beam";
}

interface ScoringRow {
  "Team Code": string;
  "Team Name": string;
  "Project Name": string;
  "Pitch YT Link": string;
  "Demo / MVP Link": string;
  "GitHub URL": string;
  "One Sentence Pitch": string;
  "What Is Your Project": string;
  "How You Built It": string;
  "Difficulties You Faced": string;
}

async function generateScoringSheets() {
  try {
    // Read CSV file
    const csvContent = fs.readFileSync(
      path.join(__dirname, "../../submission/submissions.csv"),
      "utf-8",
    );

    // Parse CSV
    const records = parse(csvContent, {
      columns: true,
      skip_empty_lines: true,
    });

    // Group projects by case
    const projectsByCase: Record<string, ScoringRow[]> = {
      "Trade Republic": [],
      avi: [],
      beam: [],
    };

    // Process each record
    for (const record of records) {
      const teamId = record["1. What is Your Team ID?"];

      // Fetch team data from Firestore
      const teamDoc = await admin
        .firestore()
        .collection("Teams")
        .doc(`${teamId}`)
        .get();

      let teamData: TeamData;

      if (!teamDoc.exists) {
        console.warn(`Team with ID ${teamId} not found in Firestore`);

        // dummy data
        // teamData = {
        //   name: "Team Name",
        //   emails: ["team@example.com"],
        //   case: ["Trade Republic", "avi", "beam"][
        //     Math.floor(Math.random() * 3)
        //   ] as "Trade Republic" | "avi" | "beam",
        // };
        // console.log(
        //   `WARNING: Team with code ${teamId} not found in Firestore. Using dummy data.`,
        // );

        continue;
      } else {
        teamData = teamDoc.data() as TeamData;
      }

      const scoringRow: ScoringRow = {
        "Team Code": teamId,
        "Team Name": record["2. Give Your Team a Name"],
        "Project Name": record["3. Give Your Project a Name"],
        "Pitch YT Link": record["4. Pitch video"],
        "Demo / MVP Link": record["5. Link to Your Demo or MVP"],
        "GitHub URL": record["6. GitHub Repository"],
        "One Sentence Pitch": record["7. One-Sentence Pitch"],
        "What Is Your Project": record["8. What Is Your Project?"],
        "How You Built It": record["9. How You Built It"],
        "Difficulties You Faced": record["10. Difficulties You Faced"],
      };

      projectsByCase[teamData.case].push(scoringRow);
    }

    // Create scoring sheets directory if it doesn't exist
    const scoringDir = path.join(__dirname, "../scoring-sheets");
    if (!fs.existsSync(scoringDir)) {
      fs.mkdirSync(scoringDir);
    }

    // Generate CSV files for each case
    for (const [caseName, projects] of Object.entries(projectsByCase)) {
      if (projects.length > 0) {
        const csvContent = stringify(projects, {
          header: true,
          columns: [
            "Team Code",
            "Team Name",
            "Project Name",
            "Pitch YT Link",
            "Demo / MVP Link",
            "GitHub URL",
            "One Sentence Pitch",
            "What Is Your Project",
            "How You Built It",
            "Difficulties You Faced",
          ],
        });

        fs.writeFileSync(
          path.join(scoringDir, `${caseName}-scoring.csv`),
          csvContent,
        );

        console.log(
          `Generated scoring sheet for ${caseName} with ${projects.length} projects`,
        );
      } else {
        console.log(`No projects found for case: ${caseName}`);
      }
    }

    console.log("Successfully generated all scoring sheets");
  } catch (error) {
    console.error("Error generating scoring sheets:", error);
    process.exit(1);
  }
}

// Run the script
generateScoringSheets();
