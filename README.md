# websustainability.io

In October 2023, the [W3C Community](https://www.w3.org/groups/cg/sustyweb/) published the first draft of the [Web Sustainability Guidelines](https://w3c.github.io/sustyweb/) (WSG). This tool is an independent side project that offers a way to navigate and prioritize these guidelines. For the implementation we use TypeScript and React. Feel free to suggest features, report bugs or contribute!

## System requirements

- [Node](https://nodejs.org/en/download)
- [Yarn](https://classic.yarnpkg.com/en/docs/install)

The .nvmrc file in project root describes what Node version to use to make sure we all use the same. To switch between Node versions, a version manager, such as [Node Version Manager (NVM)](https://github.com/nvm-sh/nvm), is a helpful tool.

## Run app in development mode

```bash
# Install dependencies
yarn install

# Run app
yarn dev
```

Now you can navigate to the following URL: http://localhost:5173/

## Run app in production mode

```bash
# Install dependencies
yarn install

# Build app for production
yarn build

# Test run app
yarn preview
```

Now you can navigate to the following URL: http://localhost:4173/

## Deployment

App is auto deployed when changes are pushed to branch `main`. We use [Digital Ocean](https://www.digitalocean.com/) for hosting.

## Code style

We use [ESLint](https://eslint.org/) to find issues in the code. You can setup your code editor to highlight such issues, based on the project config. There is also an option to run the following command from terminal:

```bash
# Run linter
yarn lint
```

We use [Prettier](https://prettier.io/) as a code formatter. You can setup your code editor to auto format the code, based on the project config. You can also run:

```bash
# Format code in folder src
yarn format
```
