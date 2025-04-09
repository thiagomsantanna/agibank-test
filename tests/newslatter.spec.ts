import { test, expect } from '../config/fixtures';

const SUCESS_MESSAGE =
	"Sucesso! Enviamos um e-mail para confirmar a sua assinatura. Encontre o e-mail agora e clique em 'Confirmar' para iniciar a inscrição.";
const BLOG_MAIL = {
	email: 'donotreply@wordpress.com',
	name: 'Blog do Agi',
};

test('should register email in Newsletter', async ({ blog, tempEmail }) => {
	const email = tempEmail.generateEmail();
	await blog.accessMenu('O Agibank');

	await blog.registerNewsletter(email);
	const message = await tempEmail.getLatestMessage(email);

	await expect(blog.page).toHaveURL(/\/.*\/?subscribe=success#.*/);
	await expect(blog.page.getByText('Sucesso!')).toHaveText(SUCESS_MESSAGE);
	expect(message.from).toMatchObject([BLOG_MAIL]);
	expect(message.subject).toBe('Confirm your subscription');
	expect(message.html?.body).toContain('Privacy Policy');
	expect(message.html?.body).toContain('Terms of Service');
	expect(message.html?.body).toContain('Confirm email');
});
