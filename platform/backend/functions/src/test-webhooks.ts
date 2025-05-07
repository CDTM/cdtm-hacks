import * as dotenv from "dotenv";
import { webhookService } from "./webhookService";
dotenv.config();

// Test data for team registration
const teamRegistrationData = {
  data: {
    data: {
      "case-preference": ["Trade Republic", "avi", "beam"],
      "team-email-addresses": "test1@example.com, test2@example.com",
    },
  },
};

// Test data for project submission
const projectSubmissionData = {
  data: {
    data: {
      "team-code": "0000",
      "project-name": "Awesome Project",
      "github-repo": "https://github.com/test-team/awesome-project",
      "project-description": "This is a test project description.",
    },
  },
};

async function testWebhooks() {
  try {
    console.log("Testing team registration webhook...");
    await webhookService.handleTeamRegistration(teamRegistrationData);
    console.log("Team registration test completed successfully");

    console.log("\nTesting project submission webhook...");
    await webhookService.handleProjectSubmission(projectSubmissionData);
    console.log("Project submission test completed successfully");
  } catch (error) {
    console.error("Test failed:", error);
  }
}

// Run the tests
testWebhooks();
