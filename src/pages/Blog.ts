import type { Locator, Page } from '@playwright/test';

const ICON_NAME = 'Link do ícone de pesquisa';
const SEARCHBOX_NAME = 'Pesquisar por:';

export class Blog {
	public readonly searchIcon: Locator;
	public readonly searchBar: Locator;
	public readonly articles: Locator;

	constructor(public readonly page: Page) {
		this.searchIcon = this.page.getByRole('link', { name: ICON_NAME });
		this.searchBar = this.page.getByRole('searchbox', { name: SEARCHBOX_NAME });
		this.articles = this.page.getByRole('article');
	}

	async goto() {
		await this.page.goto('/');
		await this.page.waitForLoadState('networkidle');
		console.log(this.page.viewportSize());
	}

	async search(term: string) {
		await this.searchIcon.click();

		await this.searchBar.waitFor({ state: 'visible' });
		await this.searchBar.fill(term);
		await this.searchBar.press('Enter');

		await this.page.waitForURL(`**/?s=${term}`);
	}

	async getArticles() {
		const articles = await this.articles.all();

		return Promise.all(
			articles.map(async (article) => ({
				title: (await article.getByRole('heading').textContent()) as string,
				link: (await article
					.getByRole('link')
					.first()
					.getAttribute('href')) as string,
				isVisible: (await article.isVisible()) as boolean,
			})),
		);
	}
}
