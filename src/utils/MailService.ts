import Mailosaur from 'mailosaur';
import type { Server } from 'mailosaur/lib/models';

export class MailService {
	private readonly client: Mailosaur;

	private defaultServer: Required<Server>;

	constructor() {
		this.client = new Mailosaur(process.env.MAILOSAUR_API_KEY);
	}

	async setup() {
		const { items: servers } = await this.client.servers.list();
		this.defaultServer = servers?.find(
			(s) => s.name === process.env.MAILOSAUR_SERVER,
		) as Required<Server>;

		if (!this.defaultServer) throw new Error('No email server found');
	}

	generateEmail() {
		return this.client.servers.generateEmailAddress(this.defaultServer.id);
	}

	async getLatestMessage(address: string) {
		const filter = { sentTo: address };

		return await this.client.messages.get(this.defaultServer.id, filter);
	}
}
