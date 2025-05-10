import * as admin from "firebase-admin";
import emailService from "./emailService";
import { firestore } from "./gcp_global";

interface TeamData {
  name: string;
  emails: string[];
}

interface FormbricksResponse {
  data: {
    data: Record<string, any>;
  };
}

export class WebhookService {
  private db: admin.firestore.Firestore;

  constructor() {
    this.db = firestore;
  }

  /**
   * Handle team registration webhook
   * @param data Form data from Formbricks
   * @returns Promise<void>
   */
  async handleTeamRegistration(data: FormbricksResponse): Promise<void> {
    try {
      const formData = data.data.data;

      const hasTeam = (formData["do-you-have-a-team"] as string).includes("Yes");

      let emails: string[] = [];
      if (hasTeam) {
        emails = (formData["team-email-addresses"] as string)
          .split(",")
          .map((email) => email.trim())
          .filter((email) => email !== "");
      } else {
        emails = [formData["solo-email-address"] as string];
      }

      // Send confirmation email to all team members
      await Promise.all(
        emails.map((email) =>
          emailService.sendEmail({
            to: email,
            subject: "Team Registration Confirmation - CDTM Hacks",
            templateName: "team_registration",
          }),
        ),
      );
    } catch (error) {
      console.error("Error in handleTeamRegistration:", error);
      await this.sendErrorToDiscord("Team Registration Webhook Error", error);
      throw error;
    }
  }

  /**
   * Handle project submission webhook
   * @param data Form data from Formbricks
   * @returns Promise<void>
   */
  async handleProjectSubmission(data: FormbricksResponse): Promise<void> {
    try {
      const formData = data.data.data;
      const teamCode = formData["team-code"] as string;
      const projectName = formData["project-name"] as string;
      const githubRepo = formData["github-repo"] as string;
      const projectDescription = formData["project-description"] as string;

      // Get team data from Firestore
      const teamDoc = await this.db
        .collection("Teams")
        .doc(teamCode.toLowerCase())
        .get();
      if (!teamDoc.exists) {
        throw new Error(`Team with code ${teamCode} not found`);
      }

      const teamData = teamDoc.data() as TeamData;

      // Send confirmation email to all team members
      await Promise.all(
        teamData.emails.map((email) =>
          emailService.sendEmail({
            to: email,
            subject: "Project Submission Confirmation - CDTM Hacks",
            templateName: "project_submission",
            templateData: {
              projectName,
              githubRepo,
              projectDescription,
            },
          }),
        ),
      );
    } catch (error) {
      console.error("Error in handleProjectSubmission:", error);
      await this.sendErrorToDiscord("Project Submission Webhook Error", error);
      throw error;
    }
  }

  /**
   * Send error to Discord monitoring channel
   * @param title Error title
   * @param error Error object
   */
  private async sendErrorToDiscord(title: string, error: any): Promise<void> {
    try {
      const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
      if (!webhookUrl) {
        console.error("Discord webhook URL not configured");
        return;
      }

      const message = {
        embeds: [
          {
            title,
            description: error.message || "Unknown error",
            color: 0xff0000,
            timestamp: new Date().toISOString(),
            fields: [
              {
                name: "Stack Trace",
                value: error.stack || "No stack trace available",
              },
            ],
          },
        ],
      };

      await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });
    } catch (discordError) {
      console.error("Failed to send error to Discord:", discordError);
    }
  }
}

export const webhookService = new WebhookService();
