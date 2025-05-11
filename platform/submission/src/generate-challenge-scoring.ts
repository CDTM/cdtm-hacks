import { parse } from "csv-parse/sync";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { stringify } from "csv-stringify/sync";
import 'dotenv/config';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
  "Why you should win the challenge": string;
}

async function generateChallengeScoringSheets() {
  try {
    // Read CSV file
    const csvContent = fs.readFileSync(
      path.join(
        __dirname,
        "../../submission/submissions.csv"
      ),
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
      const teamId = record["1. What is Your Team ID?"];
      // Only set if we haven't seen this team ID before (since records are sorted newest first)
      if (!latestSubmissions.has(teamId)) {
        latestSubmissions.set(teamId, record);
      }
    }

    // Group projects by challenge partner
    const projectsByChallenge: Record<string, ScoringRow[]> = {
      "mistral": [],
      "visionaries": [],
      "beyond_presence": [],
      "celonis": [],
      "tanso": [],
    };

    // Process each record (now only the latest submission per team)
    for (const record of latestSubmissions.values()) {
      const challenges = record["11. Challenges"] || "";
      
      // Create base scoring row without the challenge-specific pitch
      const baseScoringRow: Omit<ScoringRow, "Why you should win the challenge"> = {
        "Team Code": record["1. What is Your Team ID?"],
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

      // Check for each challenge partner and add to their respective array with the relevant pitch
      if (challenges.toLowerCase().includes("mistral")) {
        projectsByChallenge["mistral"].push({
          ...baseScoringRow,
          "Why you should win the challenge": record["12. Why Your Project Deserves to Win \"Best Use of La Plateforme/ Mistral models\" by Mistral AI"]
        });
      }
      if (challenges.toLowerCase().includes("visionaries")) {
        projectsByChallenge["visionaries"].push({
          ...baseScoringRow,
          "Why you should win the challenge": record["13. Why Your Project Deserves to Win \"Most potential to earn real money\" by Visionaries Club, Everyday Intelligence, and Paid"]
        });
      }
      if (challenges.toLowerCase().includes("beyond presence")) {
        projectsByChallenge["beyond_presence"].push({
          ...baseScoringRow,
          "Why you should win the challenge": record["14. Why Your Project Deserves to Win \"Best Use of Real-Time Interactive Avatars\" by Beyond Presence"]
        });
      }
      if (challenges.toLowerCase().includes("celonis")) {
        projectsByChallenge["celonis"].push({
          ...baseScoringRow,
          "Why you should win the challenge": record["15. Why Your Project Deserves to Win \"Best use of AI to improve processes\" by Celonis"]
        });
      }
      if (challenges.toLowerCase().includes("tanso")) {
        projectsByChallenge["tanso"].push({
          ...baseScoringRow,
          "Why you should win the challenge": record["16. Why Your Project Deserves to Win \"Why Not? Biggest Creative Risk\" by Tanso"]
        });
      }
    }

    // Create scoring sheets directory if it doesn't exist
    const scoringDir = path.join(__dirname, "../challenge-scoring-sheets");
    if (!fs.existsSync(scoringDir)) {
      fs.mkdirSync(scoringDir);
    }

    // Generate CSV files for each challenge partner
    for (const [challengeName, projects] of Object.entries(projectsByChallenge)) {
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
            "Why you should win the challenge"
          ],
        });

        fs.writeFileSync(
          path.join(scoringDir, `${challengeName}-scoring.csv`),
          csvContent
        );

        console.log(
          `Generated scoring sheet for ${challengeName} with ${projects.length} projects`
        );
      } else {
        console.log(`No projects found for challenge: ${challengeName}`);
      }
    }

    console.log("Successfully generated all challenge scoring sheets");
  } catch (error) {
    console.error("Error generating challenge scoring sheets:", error);
    process.exit(1);
  }
}

// Run the script
generateChallengeScoringSheets(); 