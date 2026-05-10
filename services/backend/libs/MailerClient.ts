import nodemailer, { type Transporter } from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";
import { createAccount } from "./mails/mailList";

export class MailerClient {
	private transporter: Transporter;

	constructor(transporter?: Transporter) {
		this.transporter = transporter!;
	}

	static async create(): Promise<MailerClient> {
		const port = Number(process.env.SMTP_PORT) || 587;
		const transporter = nodemailer.createTransport(<SMTPTransport.Options>{
			host: process.env.SMTP_HOST,
			port,
			secure: port === 465,
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASSWORD,
			},
		});

		return new MailerClient(transporter);
	}

	async accountCreation(recipient: string) {
		try {
			const maker = createAccount(recipient);
			const email = await this.transporter.sendMail({
				from: maker.from,
				to: maker.to,
				subject: maker.subject,
				html: maker.html,
			});
			console.log(nodemailer.getTestMessageUrl(email));
		} catch (error) {
			console.trace(error);
		}
	}
}
