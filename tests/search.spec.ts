import type { Page } from '@playwright/test';
import { expect, test } from '@test';

const SEARCH_TERM = 'agibank';

test('should search related news about a term', async ({ blog }) => {
	const heading = blog.page.getByRole('heading', {
		name: `Resultados encontrados para: ${SEARCH_TERM}`,
	});

	await blog.search(SEARCH_TERM);

	await expect(blog.page).toHaveTitle(`${SEARCH_TERM} - Blog do Agi`);
	await expect(heading).toBeVisible();
	for (const article of await blog.getArticles()) {
		expect(article.title.toLowerCase()).toContain(SEARCH_TERM);
	}
});

test('should load pagination automatically after 6 articles', async ({
	blog,
}) => {
	await blog.search(SEARCH_TERM);

	const sixthArticle = (await blog.articles.all())[5];
	await sixthArticle.scrollIntoViewIfNeeded();
	await littleScroll(blog.page); // Do a tiny scroll to trigger lazy loading

	await expect(blog.page).toHaveURL(`/page/2/?s=${SEARCH_TERM}`);
});

async function littleScroll(page: Page) {
	await page.waitForTimeout(2000);
	await page.mouse.wheel(0, 10);
}
