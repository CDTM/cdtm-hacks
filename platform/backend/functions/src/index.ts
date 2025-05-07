import * as crypto from "crypto";
import * as functions from "firebase-functions";
import { webhookService } from "./webhookService";

export const handleTeamRegistrationWebhook = functions.https.onRequest(
  {
    region: "europe-west1",
    secrets: [
      "API_KEY",
      "MAILGUN_API_KEY",
      "MAILGUN_DOMAIN",
      "MAILGUN_API_URL",
      "DISCORD_WEBHOOK_URL",
    ],
  },
  async (req, res) => {
    const enteredApiKey = req.query.apiKey as string;
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      res.status(500).send("Internal Server Error");
      return;
    }

    if (
      !crypto.timingSafeEqual(Buffer.from(enteredApiKey), Buffer.from(apiKey))
    ) {
      res.status(401).send("Unauthorized");
      return;
    }

    const {data} = req.body;
    if(!data?.data) {
      // Testing endpoint
      res.status(200).send("OK");
      return;
    }

    try {
      await webhookService.handleTeamRegistration(req.body);
      res.status(200).send("OK");
    } catch (error) {
      console.error("Error handling team registration webhook:", error);
      res.status(500).send("Internal Server Error");
    }
  },
);

export const handleProjectSubmissionWebhook = functions.https.onRequest(
  {
    region: "europe-west1",
    secrets: [
      "API_KEY",
      "MAILGUN_API_KEY",
      "MAILGUN_DOMAIN",
      "MAILGUN_API_URL",
      "DISCORD_WEBHOOK_URL",
    ],
  },
  async (req, res) => {
    const enteredApiKey = req.query.apiKey as string;
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      res.status(500).send("Internal Server Error");
      return;
    }

    if (
      !crypto.timingSafeEqual(Buffer.from(enteredApiKey), Buffer.from(apiKey))
    ) {
      res.status(401).send("Unauthorized");
      return;
    }

    const {data} = req.body;
    if(!data?.data) {
      // Testing endpoint
      res.status(200).send("OK");
      return;
    }

    try {
      await webhookService.handleProjectSubmission(req.body);
      res.status(200).send("OK");
    } catch (error) {
      console.error("Error handling project submission webhook:", error);
      res.status(500).send("Internal Server Error");
    }
  },
);
