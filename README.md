## Features

- ⚡️ [Vue 3](https://github.com/vuejs/core), [Vite](https://github.com/vitejs/vite), [pnpm](https://pnpm.io/), [esbuild](https://github.com/evanw/esbuild) - born with fastness

- 🗂 [File based routing](./src/pages)

- 📦 [Components auto importing](./src/components)

- 🍍 [State Management via Pinia](https://pinia.vuejs.org/)

- 📑 [Layout system](./src/layouts)

- 🎨 [UnoCSS](https://github.com/antfu/unocss) - the instant on-demand atomic CSS engine

- 🌍 [I18n ready](./src/i18n)

- 🔥 Use the [new `<script setup>` syntax](https://github.com/vuejs/rfcs/pull/227)

- 📥 [APIs auto importing](https://github.com/antfu/unplugin-auto-import) - use Composition API and others directly

- 🦾 TypeScript, of course

- ⚙️ Unit Testing with [Vitest](https://github.com/vitest-dev/vitest), E2E Testing with [Cypress](https://cypress.io/) on [GitHub Actions](https://github.com/features/actions)

## Install the dependencies

```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev
```

### Lint the files

```bash
yarn lint
# or
npm run lint
```

### Format the files

```bash
yarn format
# or
npm run format
```

### Build the app for production

```bash
quasar build
```

### Customize the configuration

See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).

### Progress

#### Pages

| Page           | Completed | Mobile | App | More                               |
| -------------- | --------- | ------ | --- | ---------------------------------- |
| category       | [x]       | [x]    | [ ] | Catch erro, catch empty            |
| explore        | [x]       | [x]    | [ ] | Catch erro                         |
| gacha          | [ ]       | [ ]    | [ ] | Catch erro                         |
| gallery        | [ ]       | [ ]    | [ ] | Catch erro                         |
| search         | [x]       | [x]    | [ ] | Catch erro, catch empty            |
| studio         | [x]       | [x]    | [ ] | Catch erro, catch empty            |
| tag            | [x]       | [x]    | [ ] | Catch erro, catch empty            |
| year           | [x]       | [x]    | [ ] | Catch erro, catch empty            |
| index          | [x]       | [x]    | [ ] | Catch erro                         |
| watch          | [x]       | [x]    | [ ] | Catch erro, fix skeleton on mobile |
| hentai-vietsub | [x]       | [x]    | [ ] |                                    |
| hentai-3d      | [x]       | [x]    | [ ] |                                    |
| uncennsored    | [x]       | [x]    | [ ] |                                    |
| history        | [ ]       | [ ]    | [ ] |                                    |
| favorite       | [ ]       | [ ]    | [ ] |                                    |

#### Components

| Component     | Completed | Mobile | App |
| ------------- | --------- | ------ | --- |
| header        | [x]       | [ ]    | [ ] |
| toolar bottom | [ ]       | [ ]    | [ ] |
| menu sheet    | [x]       | [ ]    | [ ] |

#### Features more

| Feature                             | Completed |
| ----------------------------------- | --------- |
| Save progress watch                 | [ ]       |
| Show series in player on fullscreen | [ ]       |
| Follows anime system                | [ ]       |
| Playlist anime system               | [ ]       |
| SEO                                 | [ ]       |
