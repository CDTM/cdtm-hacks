"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleFormbricksWebhook = void 0;
const functions = require("firebase-functions/v2");
const admin = require("firebase-admin");
const crypto = require("crypto");
admin.initializeApp();
exports.handleFormbricksWebhook = functions.https.onRequest({
    secrets: ["API_KEY"],
}, async (request, response) => {
    var _a;
    const enteredApiKey = request.query.apiKey;
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        response.status(500).send("Internal Server Error");
        return;
    }
    if (!crypto.timingSafeEqual(Buffer.from(enteredApiKey), Buffer.from(apiKey))) {
        response.status(401).send("Unauthorized");
        return;
    }
    const { data } = request.body;
    if (!(data === null || data === void 0 ? void 0 : data.data)) {
        response.status(200).send("OK");
        return;
    }
    const teamName = (_a = data.data["t1rf52jl41bu4d6e7x5nnfnt"]) === null || _a === void 0 ? void 0 : _a.toLowerCase();
    if (!teamName) {
        console.log("No team name");
        response.status(200).send("OK");
        return;
    }
    const teamRef = admin.firestore().collection("Teams").doc();
    const teamDoc = await teamRef.get();
    if (!teamDoc.exists) {
        console.log("Team not found, creating");
        await teamRef.set({ name: teamName });
    }
    else {
        console.log("Team already exists");
    }
    response.status(200).send("OK");
});
//# sourceMappingURL=index.js.map