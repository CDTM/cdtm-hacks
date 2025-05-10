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
      const projectName = formData["lrytlj95o6ua2vylb1fi73ha"] as string;
      const teamName = formData["f9us21kx80ol0k1ln48u9v2l"] as string;
      const demoLink = formData["djm7t3238fmxa63dvs7q6tvw"] as string;
      const githubRepo = formData["repository"] as string;
      const projectDescription = formData["what-is-your-project"] as string;
      const pitchVideo = formData["pitch-video"] as string;
      const howWeBuiltIt = formData["how-we-built-it"] as string;
      const whatYouLearned = formData["what-we-learned"] as string;
      const difficulties = formData["fug36spozqys4uaah0ncnq2e"] as string;
      const oneSentencePitch = formData["one-sentence-pitch"] as string;
      const whatIsNext = formData["what-is-next-for-your-project"] as string;
      const challenges = formData["nfi6gji4lv321c7ompvk2wm8"] as string;

      const reasoningForVisonaries = formData["ixmth9vbjz6b9c1qotp9wlf2"] as string;
      const reasoningForCelonis = formData["n8q93po2dd5wsnspuguznrl8"] as string;
      const reasoningForTanso = formData["feno0rbmyhf8vqyxoqndqnz8"] as string;
      const reasoningForBeyondPresence = formData["lk4zccnfrdyw8kxvuvtm5y5i"] as string;
      const reasoningForMistral = formData["ksj41i74afe7gxykvdgkxzun"] as string;

      // Get team data from Firestore
      const teamDoc = await this.db
        .collection("Teams")
        .doc(teamCode.toLowerCase())
        .get();
      if (!teamDoc.exists) {
        throw new Error(`Team with code ${teamCode} not found`);
      }

      const teamData = teamDoc.data() as TeamData;

      let reasoningForChallenges = "";
      if (reasoningForVisonaries) {
        reasoningForChallenges += `<strong>Reasoning for Visionaries Club, Everyday Intelligence & Paid Challenge:</strong>\n${reasoningForVisonaries}\n\n`;
      }
      if (reasoningForCelonis) {
        reasoningForChallenges += `<strong>Reasoning for Celonis Challenge:</strong>\n${reasoningForCelonis}\n\n`;
      }
      if (reasoningForTanso) {
        reasoningForChallenges += `<strong>Reasoning for Tanso Challenge:</strong>\n${reasoningForTanso}\n\n`;
      }
      if (reasoningForBeyondPresence) {
        reasoningForChallenges += `<strong>Reasoning for Beyond Presence Challenge:</strong>\n${reasoningForBeyondPresence}\n\n`;
      }
      if (reasoningForMistral) {
        reasoningForChallenges += `<strong>Reasoning for Mistral Challenge:</strong>\n${reasoningForMistral}\n\n`;
      }

      if (!reasoningForChallenges) {
        reasoningForChallenges = "No reasoning provided";
      }

      // Send confirmation email to all team members
      await Promise.all(
        teamData.emails.map((email) =>
          emailService.sendEmail({
            to: email,
            subject: "Project Submission Confirmation - CDTM Hacks",
            templateName: "project_submission",
            templateData: {
              teamName,
              projectName,
              githubRepo,
              projectDescription,
              pitchVideo,
              howWeBuiltIt,
              whatYouLearned,
              oneSentencePitch,
              whatIsNext,
              challenges,
              reasoningForChallenges,
              demoLink,
              difficulties,
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
