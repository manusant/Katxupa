# Katxupa

<p align="center">
  <img src="/assets/logo.png" />
  <br/>
  <span align="center" style="font-size: x-large; font-weight: normal">
  Delicious Dish for Typescript and JavaScript projects
  </span> 
</p>

```ts
runIt(() => {
    console.log(`🎉 Welcome to Katxupa library 💖`);
    "Katxupa"
        .alsoIt(it => console.log(`🍲 ${it} was cooked for your delight 🍲`))
        .takeIf(it => it.startsWith("Katxupa"))
        ?.runIt(function() {
            console.log(`🍻 By Manuel Santos`);
            console.log(`🙈 https://github.com/manusant`);
        })
})
```
# Documentation

[![Docs](https://img.shields.io/badge/Documentation-Katxupa-black?logo=gitbook&logoColor=white)](https://katxupa.gitbook.io/katxupa)
[![ESLint](https://img.shields.io/badge/ESLint_Config-eslint--config--katxupa-blue?logo=eslint&logoColor=white)](https://github.com/manusant/eslint-config-katxupa)
[![Linkedin](https://img.shields.io/badge/Linkedin-Manuel--Santos-blue?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/manuel-brito-dos-santos-a7a20a6b/)
[![TSDoc](https://img.shields.io/badge/TypeScript_Doc-blue?logo=typescript&logoColor=white)](https://manusant.github.io/Katxupa)

## Project Configuration
1. Add [Katxupa](https://github.com/manusant/Katxupa) library to project dependencies
```shell
npm install katxupa
pnpm add katxupa
yarn add katxupa
```
2. Add [eslint-config-katxupa](https://github.com/manusant/eslint-config-katxupa) ESLint configs
```shell
npm install --save-dev eslint-config-katxupa
pnpm add --save-dev eslint-config-katxupa
yarn add --dev eslint-config-katxupa
```
3. Activate ESLint config
```js
// .eslintrc.js
module.exports = {
    root: true,
    env: {node: true},
    extends: ["eslint:recommended", "katxupa"],
   ...
};
```
