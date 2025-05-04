const formData = require('form-data');
const Mailgun = require('mailgun.js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const FROM = `CDTM Hacks <hacks@cdtm.com>`

class EmailService {
    constructor() {
        if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
            throw new Error('Missing required environment variables: MAILGUN_API_KEY and/or MAILGUN_DOMAIN');
        }

        const mailgun = new Mailgun(formData);
        this.client = mailgun.client({
            username: 'api',
            key: process.env.MAILGUN_API_KEY,
            url: 'https://api.eu.mailgun.net'  // Note: removed /v3 from the URL
        });
        this.domain = process.env.MAILGUN_DOMAIN;

        console.log('Initialized Mailgun client with:', {
            domain: this.domain,
            apiUrl: 'https://api.eu.mailgun.net'
        });
    }

    /**
     * Load an HTML template from the templates directory
     * @param {string} templateName - Name of the template file (without .html extension)
     * @returns {string} - The HTML content of the template
     */
    async loadTemplate(templateName) {
        try {
            const templatePath = path.join(__dirname, 'templates', `${templateName}.html`);
            return fs.promises.readFile(templatePath, 'utf8');
        } catch (error) {
            console.error(`Error loading template ${templateName}:`, error);
            throw new Error(`Failed to load template: ${templateName}`);
        }
    }

    /**
     * Send an email using a template
     * @param {Object} options - Email options
     * @param {string} options.to - Recipient email address
     * @param {string} options.subject - Email subject
     * @param {string} options.templateName - Name of the template to use
     * @param {Object} options.templateData - Data to inject into the template
     * @returns {Promise<Object>} - Mailgun response
     */
    async sendEmail(options) {
        const {
            to,
            subject,
            templateName,
            templateData = {}
        } = options;

        try {
            console.log('Attempting to send email with options:', {
                to,
                subject,
                templateName,
                domain: this.domain
            });

            // Load the template
            let html = await this.loadTemplate(templateName);

            // Replace template variables
            Object.entries(templateData).forEach(([key, value]) => {
                const regex = new RegExp(`{{${key}}}`, 'g');
                html = html.replace(regex, value);
            });

            // Send the email
            const messageData = {
                from: FROM,
                to: [to],
                subject,
                html
            };

            console.log('Sending email with message data:', {
                ...messageData,
                html: '[HTML content hidden]'
            });

            const result = await this.client.messages.create(this.domain, messageData);
            console.log('Email sent successfully:', result);
            return result;
        } catch (error) {
            console.error('Detailed error sending email:', {
                error: error.message,
                status: error.status,
                details: error.details,
                stack: error.stack
            });
            throw new Error(`Failed to send email: ${error.message}`);
        }
    }
}

module.exports = new EmailService();
