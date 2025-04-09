import { test as base } from '@playwright/test';
import { Blog } from '../src/pages/Blog'; // TODO: usar @paths

type MyFixtures = {
	blog: Blog;
};

export const test = base.extend<MyFixtures>({
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
