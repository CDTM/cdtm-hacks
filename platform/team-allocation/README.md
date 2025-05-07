# Team Allocation and Email Sender

This project contains two main components:
1. A Python script for allocating teams to cases based on preferences
2. A Node.js application for sending team allocation emails to participants

## Team Allocation Script

The `team_allocation.py` script automates the process of allocating hackathon participants to teams and assigning cases based on preferences.

### Features

- Reads team preferences from a CSV file
- Processes both pre-formed teams and individual participants
- Forms teams from individuals based on shared preferences
- Allocates teams to cases based on preference ranking
- Balances cases to ensure minimum participation thresholds
- Exports detailed allocation results to CSV

### Requirements

- Python 3.6+
- CSV input file with required columns:
  - "1. What is the name of the team?" (optional)
  - "2. List all email addresses of your team members"
  - "3. Rank your case preferences"

  The name of the file should be `hackathon_participants.csv`

### Usage

1. Prepare your CSV file with participant data
2. Run the script:
   ```bash
   python team_allocation.py
   ```
3. The script will:
   - Read and validate the input CSV
   - Form teams from individuals based on preferences
   - Assign initial cases based on first preferences
   - Balance cases to ensure each has at least 30 participants
   - Output results to `team_allocations.csv`

### Customization

You can modify the script to change:
- Minimum case participation threshold (default: 30)
- Team size limits (default: 2-4 members)
- Available cases (default: "Trade Republic", "avi", "beam")

## Email Sender

This Node.js application sends team allocation emails to hackathon participants based on CSV data.

## Features

- Reads team allocations from a CSV file
- Sends customized HTML emails using Mailgun
- Sends emails to all team members (or a test email in test mode)
- Supports templated emails
- Logs success and failure statistics

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure Mailgun credentials:
   - Create a `.env` file with the following contents:
   ```
   MAILGUN_DOMAIN=your-mailgun-domain
   MAILGUN_API_KEY=your-mailgun-api-key
   MAILGUN_REGION=eu
   ```

3. Prepare your CSV file:
   - The CSV file should be named `team_allocations.csv`
   - Required columns: `Team ID`, `Team Members`, `Assigned Case`
   - Optional columns: `Team Name` (if not provided, "Team {ID}" will be used)
   - The `Team Members` column should contain comma-separated email addresses

## Usage

### Test Mode

By default, the script runs in test mode, sending all emails to a test address to prevent accidental mass emails. To toggle test mode:

1. Open `send_team_emails.js`
2. Find these lines at the top of the file:
   ```javascript
   // Set to true to send all emails to the test email instead of actual team members
   const TEST_MODE = true;
   const TEST_EMAIL = ""; // Replace with your test email address
   ```
3. To send to actual recipients, set `TEST_MODE = false`
4. To change the test email, modify the `TEST_EMAIL` value

### Running the Script

Execute the script:

```bash
node send_team_emails.js
```

The script will:
1. Read the team allocations from `team_allocations.csv`
2. For each team:
   - Format the team member list
   - Send emails (to all members or the test email, depending on mode)
3. Display statistics about successful and failed email deliveries

### Script Details

The `send_team_emails.js` script:

- **TeamEmailSender class**: Main class handling the email sending process
  - `constructor()`: Validates environment variables and creates a .env template if needed
  - `createEnvFile()`: Creates a template .env file with required fields
  - `readAllocations(csvFile)`: Reads and parses the CSV file into team objects
  - `formatMembersList(members)`: Formats the list of team members into HTML
  - `sendTeamEmails(teams)`: Sends emails to all team members (or test email in test mode)

- **Main execution flow**:
  1. Creates a TeamEmailSender instance
  2. Reads allocations from the CSV file
  3. Sends emails to all teams
  4. Logs statistics and results

## Templates

Email templates are located in the `templates` directory:

- `team_allocation.html` - Template for team allocation emails

The template uses a simple placeholder system with `{{variableName}}` syntax. Available variables:
- `{{teamId}}` - The team's ID number
- `{{teamName}}` - The team's name
- `{{case}}` - The assigned case for the team
- `{{membersList}}` - HTML formatted list of team members

You can customize these templates to match your branding and requirements.

## Python Alternative

This project also includes a Python implementation (`send_emails.py`) which provides the same functionality using the Mailgun REST API directly.


