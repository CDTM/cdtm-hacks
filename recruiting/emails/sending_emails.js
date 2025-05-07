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
            url: 'https://api.eu.mailgun.net'
        });
        this.domain = process.env.MAILGUN_DOMAIN;

        console.log('Initialized Mailgun client with:', {
            domain: this.domain,
            apiUrl: 'https://api.eu.mailgun.net'
        });
    }

    /**
     * Load an HTML template from the templates directory and extract its metadata
     * @param {string} templateName - Name of the template file (without .html extension)
     * @returns {Object} - Object containing the HTML content and metadata
     */
    async loadTemplate(templateName) {
        try {
            const templatePath = path.join(__dirname, 'templates', `${templateName}.html`);
            const content = await fs.promises.readFile(templatePath, 'utf8');
            
            // Extract subject from meta tags if present
            const subjectMatch = content.match(/<meta\s+name="subject"\s+content="([^"]+)"\s*\/?>/);
            const subject = subjectMatch ? subjectMatch[1] : null;
            
            return {
                html: content,
                subject
            };
        } catch (error) {
            console.error(`Error loading template ${templateName}:`, error);
            throw new Error(`Failed to load template: ${templateName}`);
        }
    }

    /**
     * Send an email using a template
     * @param {Object} options - Email options
     * @param {string|string[]} options.to - Single recipient email address or array of recipient email addresses
     * @param {string} [options.subject] - Email subject (optional, will use template subject if not provided)
     * @param {string} options.templateName - Name of the template to use
     * @param {Object} options.templateData - Data to inject into the template
     * @returns {Promise<Object>} - Mailgun response
     */
    async sendEmail(options) {
        const {
            to,
            subject: overrideSubject,
            templateName,
            templateData = {}
        } = options;

        try {
            console.log('Attempting to send email with options:', {
                to,
                templateName,
                domain: this.domain
            });

            // Load the template and get its metadata
            const { html: templateHtml, subject: templateSubject } = await this.loadTemplate(templateName);
            
            // Use override subject if provided, otherwise use template subject
            const subject = overrideSubject || templateSubject;
            
            if (!subject) {
                throw new Error('No subject provided and no subject found in template metadata');
            }

            // Replace template variables
            let html = templateHtml;
            Object.entries(templateData).forEach(([key, value]) => {
                const regex = new RegExp(`{{${key}}}`, 'g');
                html = html.replace(regex, value);
            });

            // Send the email
            const messageData = {
                from: FROM,
                to: Array.isArray(to) ? to : [to],
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

    /**
     * Send bulk emails using a template with recipient-specific data
     * @param {Object} options - Email options
     * @param {Array<{email: string, data: Object}>} options.recipients - Array of recipient objects with email and custom data
     * @param {string} [options.subject] - Email subject (optional, will use template subject if not provided)
     * @param {string} options.templateName - Name of the template to use
     * @returns {Promise<Array<Object>>} - Array of Mailgun responses
     */
    async sendBulkEmails(options) {
        const {
            recipients,
            subject,
            templateName,
        } = options;

        const results = [];
        const errors = [];

        for (const recipient of recipients) {
            try {
                const result = await this.sendEmail({
                    to: recipient.email,
                    subject,
                    templateName,
                    templateData: recipient.data
                });
                console.log(`Email sent to ${recipient.email}`)
                results.push({ email: recipient.email, status: 'success', result });
            } catch (error) {
                errors.push({ email: recipient.email, error: error.message });
                results.push({ email: recipient.email, status: 'error', error: error.message });
            }
        }

        if (errors.length > 0) {
            console.warn('Some emails failed to send:', errors);
        }

        return results;
    }
}

module.exports = new EmailService();
