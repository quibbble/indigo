# Indigo

[![Netlify Status](https://api.netlify.com/api/v1/badges/3d12a9ad-1a6c-4556-b0a8-5ac7b26a4f68/deploy-status)](https://app.netlify.com/sites/indigo-quibbble/deploys)

Indigo game website. Play at [indigo.quibbble.com](https://indigo.quibbble.com).

This repo contains [ReactJS](https://react.dev) frontend code and makes use of custom React components found at [boardgame](https://github.com/quibbble/boardgame). Game logic can be found at [go-indigo](https://github.com/quibbble/go-indigo). Server logic can be found at [go-quibbble](https://github.com/quibbble/go-quibbble). 

[![Quibbble Indigo](screenshot.png)](https://indigo.quibbble.com)

## Run Locally

- Generate a personal `GITHUB_ACCESS_TOKEN` with package read permissions. Read more about it [here](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry).
- Create a `.npmrc` file in the `indigo` root director with the following:
```
//npm.pkg.github.com/:_authToken=<GITHUB_ACCESS_TOKEN>
@quibbble:boardgame=https://npm.pkg.github.com
```
- Run `npm i`.
- Run the quibbble server ([go-quibbble](https://github.com/quibbble/go-quibbble)) locally on port `8080`.
- Create a `.env.local` file in the `indigo` root directory with the following:
```
REACT_APP_HOST="http://127.0.0.1:8080"
REACT_APP_WEBSOCKET="ws://127.0.0.1:8080"
```
- Run `npm start`.
