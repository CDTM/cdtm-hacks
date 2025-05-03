import * as formData from 'form-data';
import Mailgun from 'mailgun.js';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

const FROM = `CDTM Hacks <hacks@cdtm.com>`;

interface EmailOptions {
    to: string;
    subject: string;
    templateName: string;
    templateData?: Record<string, string>;
}

interface MessageData {
    from: string;
    to: string[];
    subject: string;
    html: string;
}

interface MailgunResponse {
    id: string;
    message: string;
    status: number;
}

class EmailService {
    private client: any; // Using any for Mailgun client as types are not available
    private domain: string;

    constructor() {
        if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
            console.error('Missing required environment variables: MAILGUN_API_KEY and/or MAILGUN_DOMAIN. Message can be ignored during deployment.');
            this.client = null;
            this.domain = '';
            return;
        }

        const mailgun = new Mailgun(formData);
        this.client = mailgun.client({
            username: 'api',
            key: process.env.MAILGUN_API_KEY,
            url: 'https://api.eu.mailgun.net'
        });
        this.domain = process.env.MAILGUN_DOMAIN!;

        console.log('Initialized Mailgun client with:', {
            domain: this.domain,
            apiUrl: 'https://api.eu.mailgun.net'
        });
    }

    /**
     * Load an HTML template from the templates directory
     * @param templateName - Name of the template file (without .html extension)
     * @returns The HTML content of the template
     */
    async loadTemplate(templateName: string): Promise<string> {
        try {
            const templatePath = path.join(__dirname, 'mail_templates', `${templateName}.html`);
            return fs.promises.readFile(templatePath, 'utf8');
        } catch (error) {
            console.error(`Error loading template ${templateName}:`, error);
            throw new Error(`Failed to load template: ${templateName}`);
        }
    }

    /**
     * Send an email using a template
     * @param options - Email options
     * @returns Mailgun response
     */
    async sendEmail(options: EmailOptions): Promise<MailgunResponse> {
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
            const messageData: MessageData = {
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
        } catch (error: any) {
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

export default new EmailService(); 