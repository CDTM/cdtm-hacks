# Platform for CDTM Hacks

This folder contains the code for managing the team registration, case assignment and submission for CDTM Hacks.

## Features

- Team registration management
- Project submission handling
- Automated email notifications
- Discord webhook integration for monitoring
- Firebase/Firestore database integration

## Setup

```bash
npm install -C backend/functions
```

### Environment Variables

```
# API key for authentication, just a random crytographically secure string
API_KEY=

# Mailgun configuration for email sending
MAILGUN_API_KEY=
MAILGUN_DOMAIN=
MAILGUN_API_URL=https://api.eu.mailgun.net/v3

# Google Cloud credentials file path, from: https://console.firebase.google.com/u/0/project/cdtm-hacks/settings/serviceaccounts/adminsdk
GOOGLE_APPLICATION_CREDENTIALS=

# Discord webhook URL for notifications
DISCORD_WEBHOOK_URL=
```

_Note: Make sure to not have a .env file in the `functions` folder when deploying to Firebase. This conflicts with the GCP Secret Manager._

## Development

The project uses TypeScript and Firebase Functions. To start development:

```bash
# Start the Firebase emulator
npm run serve

# Watch for TypeScript changes
npm run build:watch
```

## Testing

You can test the webhooks locally using the test script:

```bash
npm run test-webhooks
```

## Deployment

```bash
firebase deploy
```

## Architecture

The platform consists of:

- Firebase Functions for handling webhooks and business logic
- GCP Secret Manager for storing environment variables
- Firestore database for storing team and submission data
- Mailgun for sending automated emails
- Discord integration for monitoring and error reporting

## Flow

### Friday: Team Registration

0. Setup Google Service Account, Mailgun API Key
1. Team registration
2. Download completed submissions from Formbricks, rename to `hackathon_participants.csv`
3. Run `platform/team-allocation/team_allocation.py`
4. Run `platform/team-allocation/send_team_emails.js` (disable test mode in the script)

### Sunday: Submission

0. Setup Google Service Account, Mailgun API Key
1. Download completed submissions from Formbricks, rename to `submissions.csv`
2. Copy `submissions.csv` to `platform/submission/submissions.csv`
3. Run `npx tsx platform/submission/src/genreate-project-page-data.ts`
4. Commit your changes to deploy the website
5. Run `npx tsx platform/submission/src/generate-challenge-scoring.ts`
6. Run `npx tsx platform/submission/src/generate-case-scoring.ts`
7. Import csv files into Google Sheets
