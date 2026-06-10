# vue_pro

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm install
npm run dev
```

### Run Backend

```sh
npm run backend
```

### Local Full Stack Setup

1. 啟動後端 API：`npm run backend`，預設監聽 `http://127.0.0.1:3000`
2. 啟動前端開發伺服器：`npm run dev`
3. 前端透過 Vite proxy 將 `/api` 轉發到 Express
4. API 規格定義檔：`openapi.yaml`

### Compile and Minify for Production

```sh
npm run build
```
