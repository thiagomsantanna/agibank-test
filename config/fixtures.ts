import { Blog } from '@pages/Blog';
import { test as base } from '@playwright/test';
import { MailService } from '@utils/MailService';

type MyFixtures = {
	tempEmail: MailService;
	blog: Blog;
};

export const test = base.extend<MyFixtures>({
	tempEmail: async ({}, use) => {
		// setup
		const service = new MailService();
		await service.setup();

		await use(service);
	},
	blog: async ({ page }, use) => {
		// setup
		const blog = new Blog(page);
		await blog.goto();

		await use(blog);
		// teardown
		page.close();
	},
});

export { expect } from '@playwright/test';
