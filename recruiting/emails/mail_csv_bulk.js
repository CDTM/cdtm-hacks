const emailService = require('./sending_emails');
const fs = require('fs');
const csv = require('csv-parse');
const path = require('path');

async function readRecipientsFromCSV(csvFilePath) {
    return new Promise((resolve, reject) => {
        const recipients = [];
        fs.createReadStream(csvFilePath)
            .pipe(csv.parse({ columns: true, trim: true }))
            .on('data', (row) => {
                recipients.push({
                    email: row.email,
                    data: {
                        content: 'Dear Applicant,',
                        companyName: 'CDTM Hacks',
                        year: new Date().getFullYear(),
                        eventUrl: `https://app.formbricks.com/s/cm9octey2ky4nuf014edayghl?email=${row.email}`
                    }
                });
            })
            .on('error', reject)
            .on('end', () => resolve(recipients));
    });
}

async function sendBulkEmailsFromCSV(csvFilePath) {
    try {
        console.log('Reading recipients from CSV file...');
        const recipients = await readRecipientsFromCSV(csvFilePath);
        
        console.log(`Found ${recipients.length} recipients in CSV file`);
        
        const results = await emailService.sendBulkEmails({
            recipients,
            // Subject is defined in the template
            templateName: 'acceptance'
        });

        console.log('Bulk email sending completed!');
        console.log('Results:', results);
    } catch (error) {
        console.error('Failed to send bulk emails:', error);
        if (error.details) {
            console.error('Error details:', error.details);
        }
    }
}

// Check if CSV file path is provided as command line argument
const csvFilePath = process.argv[2];
if (!csvFilePath) {
    console.error('Please provide the path to your CSV file as an argument.');
    console.error('Example: node example_csv_bulk.js ./recipients.csv');
    process.exit(1);
}

// Run the example with the provided CSV file
sendBulkEmailsFromCSV(csvFilePath); 