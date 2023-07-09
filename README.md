# SnippetMan

A proof of concept gecko application for managing code snippets.

<picture>
    <source media="(prefers-color-scheme: dark)" srcset="./assets/sketch_dark.svg" />
    <img src="./assets/sketch_light.svg"  />
</picture>

## Development

First, download a build of quark runtime from [the Github actions page](https://github.com/quark-platform/runtime/actions/workflows/main.yml). This project currently supports the `115.0.1`, although versioning doesn't exist for Quark yet. Extract the binary into a folder called `runtime`, such that `runtime/quark-runtime` exists.

Install webpack & dependencies:

```sh
pnpm i
```

Start a webpack dev server in one terminal

```sh
pnpm dev
```

Launch the app in a new terminal:

```sh
pnpm start
```
