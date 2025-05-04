const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');
const emailService = require('./sending_emails');
require('dotenv').config();

// Set to true to send all emails to the test email instead of actual team members
const TEST_MODE = true;
const TEST_EMAIL = ""; // Replace with your test email address

class TeamEmailSender {
    constructor() {
        // Check if required environment variables are set
        if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
            console.log('Creating .env file template...');
            this.createEnvFile();
            throw new Error('Please fill in your Mailgun credentials in the .env file');
        }
    }

    createEnvFile() {
        const envContent = `# Mailgun Configuration
MAILGUN_DOMAIN=your-mailgun-domain
MAILGUN_API_KEY=your-mailgun-api-key
MAILGUN_REGION=eu
`;
        if (!fs.existsSync('.env')) {
            fs.writeFileSync('.env', envContent);
            console.log('.env file created. Please fill in your Mailgun credentials.');
        }
    }

    async readAllocations(csvFile) {
        return new Promise((resolve, reject) => {
            const teams = [];
            fs.createReadStream(csvFile)
                .pipe(csv())
                .on('data', (row) => {
                    if (row['Team Members']) {
                        teams.push({
                            teamId: row['Team ID'],
                            teamName: row['Team Name'] || `Team ${row['Team ID']}`, // Use Team ID if name is missing
                            members: row['Team Members'].split(',').map(email => email.trim()),
                            case: row['Assigned Case'],
                            size: parseInt(row['Team Size'])
                        });
                    }
                })
                .on('end', () => {
                    console.log(`Read ${teams.length} teams from CSV file`);
                    resolve(teams);
                })
                .on('error', (error) => {
                    console.error('Error reading CSV file:', error);
                    reject(error);
                });
        });
    }

    formatMembersList(members) {
        return members.map(member => `<li>${member}</li>`).join('');
    }

    async sendTeamEmails(teams) {
        console.log(`\nStarting to send emails to ${teams.length} teams...`);
        if (TEST_MODE) {
            console.log(`⚠️ TEST MODE: All emails will be sent to ${TEST_EMAIL} ⚠️`);
        }
        
        let successfulTeams = 0;
        let successfulEmails = 0;
        let failedEmails = 0;

        // Define the Discord links
        const discordLinks = {
            traderepublic: 'https://discord.com/channels/1359912565421113545/1368596605233528863',
            beam: 'https://discord.com/channels/1359912565421113545/1363502688729432094',
            avi: 'https://discord.com/channels/1359912565421113545/1363502706462953694'
        };

        for (const team of teams) {
            try {
                // Format the member list as HTML
                const membersList = `<ul>${this.formatMembersList(team.members)}</ul>`;
                
                let teamSuccessCount = 0;
                
                // When in test mode, send one email per team to the test email
                // Otherwise, send to each team member
                const recipients = TEST_MODE ? [TEST_EMAIL] : team.members;
                
                for (const email of recipients) {
                    try {
                        const result = await emailService.sendEmail({
                            to: email,
                            subject: `Your Case Assignment - Team ${team.teamId}`,
                            templateName: 'team_allocation',
                            templateData: {
                                teamId: team.teamId,
                                teamName: team.teamName,
                                case: team.case,
                                membersList: membersList,
                                discordLink: discordLinks[team.case.toLowerCase().replace(/\s+/g, '')]
                            }
                        });
                        
                        const recipientInfo = TEST_MODE ? 
                            `${email} (representing Team ${team.teamId})` : 
                            `${email} (Team ${team.teamId})`;
                            
                        console.log(`Email sent successfully to ${recipientInfo}`);
                        successfulEmails++;
                        teamSuccessCount++;
                    } catch (memberError) {
                        const recipientInfo = TEST_MODE ? 
                            `${email} (representing Team ${team.teamId})` : 
                            `${email} (Team ${team.teamId})`;
                            
                        console.error(`Failed to send email to ${recipientInfo}:`, memberError.message);
                        failedEmails++;
                    }
                }
                
                // Consider a team successful if at least one email was sent
                if (teamSuccessCount > 0) {
                    successfulTeams++;
                }
            } catch (teamError) {
                console.error(`Failed to process team ${team.teamId}:`, teamError.message);
            }
        }

        console.log('\nEmail sending complete:');
        console.log(`Total teams: ${teams.length}`);
        console.log(`Teams with at least one successful email: ${successfulTeams}`);
        console.log(`Total emails sent: ${successfulEmails}`);
        console.log(`Failed emails: ${failedEmails}`);
        
        if (TEST_MODE) {
            console.log(`\n⚠️ TEST MODE was enabled: All emails were sent to ${TEST_EMAIL} ⚠️`);
            console.log(`To send to actual recipients, set TEST_MODE to false at the top of the file.`);
        }
    }
}

async function main() {
    try {
        const sender = new TeamEmailSender();
        const teams = await sender.readAllocations('team_allocations.csv');
        await sender.sendTeamEmails(teams);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Run the script
main(); 