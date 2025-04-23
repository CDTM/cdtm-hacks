import * as functions from "firebase-functions/v2";
import * as admin from "firebase-admin";
import * as crypto from "crypto";

admin.initializeApp();

export const handleFormbricksWebhook = functions.https.onRequest(
  {
    secrets: ["API_KEY"],
  },
  async (request, response) => {
    const enteredApiKey = request.query.apiKey as string;
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      response.status(500).send("Internal Server Error");
      return;
    }

    if (
      !crypto.timingSafeEqual(Buffer.from(enteredApiKey), Buffer.from(apiKey))
    ) {
      response.status(401).send("Unauthorized");
      return;
    }

    const {data} = request.body;
    if(!data?.data) {
      response.status(200).send("OK");
      return;
    }

    const teamName = (
      data.data["t1rf52jl41bu4d6e7x5nnfnt"] as string | undefined
    )?.toLowerCase();
    if (!teamName) {
      console.log("No team name");
      response.status(200).send("OK");
      return;
    }

    const teamRef = admin.firestore().collection("Teams").doc();
    const teamDoc = await teamRef.get();
    if (!teamDoc.exists) {
      console.log("Team not found, creating");
      await teamRef.set({name: teamName});
    } else {
      console.log("Team already exists");
    }

    response.status(200).send("OK");
  },
);
