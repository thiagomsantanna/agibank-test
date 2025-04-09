import { expect, type Locator, type Page } from '@playwright/test';

const ICON_NAME = 'Link do ícone de pesquisa';
const SEARCHBOX_NAME = 'Pesquisar por:';

const EMAIL_PLACEHOLDER = 'Endereço de e-mail';
const SIGN_NEWS_BUTTON = ' Assinar ';

const Menus = {
	'O Agibank': '/institucional',
	Produtos: '/produtos',
	Serviços: '/servicos',
	'Suas finanças': '/suas-financas',
	'Seus benefícios': '/seus-beneficios',
	'Sua segurança': '/sua-seguranca',
	Stories: '/web-stories',
} as const;

export class Blog {
	public readonly searchIcon: Locator;
	public readonly searchBar: Locator;
	public readonly articles: Locator;
	public readonly emailNews: Locator;
	public readonly signNews: Locator;

	constructor(public readonly page: Page) {
		this.searchIcon = this.page.getByRole('link', { name: ICON_NAME });
		this.searchBar = this.page.getByRole('searchbox', { name: SEARCHBOX_NAME });

		this.articles = this.page.getByRole('article');

		this.emailNews = this.page.getByPlaceholder(EMAIL_PLACEHOLDER);
		this.signNews = this.page.getByRole('button', { name: SIGN_NEWS_BUTTON });
	}

	async goto() {
		await this.page.goto('/');
		await this.page.waitForLoadState('domcontentloaded');
	}

	async search(term: string) {
		await expect(async () => {
			await this.searchIcon.click();

			await this.searchBar.waitFor({ state: 'visible', timeout: 2000 });
			await this.searchBar.fill(term);
		}).toPass();

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

	async accessMenu(menu: keyof typeof Menus) {
		await this.page.getByRole('link', { name: menu, exact: true }).click();
		await this.page.waitForURL(`**${Menus[menu]}/`);
	}

	async registerNewsletter(email: string) {
		await this.emailNews.fill(email);
		await this.signNews.click();

		await this.page.waitForURL('**/?subscribe=success#**');
	}

	async getRegistrationMessage() {
		return await this.page.getByText('Sucesso! Enviamos um e-mail');
	}
}
