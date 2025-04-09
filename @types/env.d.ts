export {};
declare global {
	namespace NodeJS {
		interface ProcessEnv {
			MAILOSAUR_API_KEY: string;
		}
	}
}
