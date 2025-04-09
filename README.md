## Installation

- Recommended: Install [nvm](https://github.com/nvm-sh/nvm)
- Install and setup Node.js version: `nvm install && nvm use`, This will install the project default version on `.nvmrc`
- Install [pnpm](https://pnpm.io/pt/): `npm install -g pnpm`
- Install the dependencies: `pnpm install`
- Also install the used Playwright browsers: `pnpm test:browsers`

After all installation, its necessary to create an account on [Mailsaur](https://mailosaur.com/), to generate a API_KEY to use during the tests
- [API Keys doc on Mailsaur](https://mailosaur.com/docs/managing-your-account/api-keys)
- After all setup with your account, configure the API_KEY value in the `.env` file as `MAILOSAUR_API_KEY`
- If you have edited your main Server/Inbox, its also necessary to configure your new Server/Inbox name in the var `MAILOSAUR_SERVER`.

## Project structure

The project is simple, it has these folders as support files:

- `./src/pages`: Has all website pages, including his element Locators and helper methods to act with the page. 
- `./src/utils`: Has other support modules, like classes to work with libs or generic helper functions
- `./config/fixtures`: Has the Fixtures used during tests, so useful to setup and teardown tests 

All the tests are in the `tests/` folder, it was automated scenarios for the **Search feature** and the **Newsletter Registration.**
- For the Newsletter tests is being used the [Mailsaur](https://mailosaur.com/) lib ([npm](https://www.npmjs.com/package/mailosaur)) to turn possible generate random email address and receive emails to validate.

## Tests

- To run all the tests, simply run: `pnpm test`
- If desired, its also possible to run in [UI Mode](https://playwright.dev/docs/test-ui-mode): `pnpm test:ui`
- Its also possible to only open the latests report on `/playwright-report` with: `pnpm test:report`

If you are fixing or developing new scenarios, you can have more timeout time and debug, its recommended to use the official [Playwright VSCode Extension](https://playwright.dev/docs/debug)

A report from the last execution can be viewed with `pnpm test:report`, being located at `/playwright-report`.

## Formatting

This project uses [Biomejs](https://biomejs.dev/pt-br/) with some rules to ensure a coding style across all files. Any code style checking or automatic formatting can be done with:

- `pnpm format:check`, To only check all files.
- `pnpm format`, To check and make biome fixes any warnings or errors.