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

### GitHub Pages 靜態部署

本專案現在為純前端靜態網站，資料儲存在瀏覽器 localStorage，可直接部署到 GitHub Pages。

1. 安裝套件：`npm install`
2. 開發測試：`npm run dev`
3. 建置靜態網站：`npm run build`
4. 部署到 GitHub Pages：如果你想使用 GitHub Actions，請確保此 repository 設定中的 Pages source 選擇 `GitHub Actions`。

如果要手動設定 GitHub Pages，請將 `dist/` 資料夾內容部署到 GitHub Pages。

### Compile and Minify for Production

```sh
npm run build
```
