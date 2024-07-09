# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Installation

```
$ yarn
```

## Updating Documentation

### Versioning Overview
The documentation site supports versions - copying content from `docs` to `versioned_docs`.

### Editing Live Documentation
To edit the current live documentation, make changes under `versioned_docs`. Ensure that changes are also made in `docs` to keep future versions updated.

### Steps to Update Documentation

1. **Edit Live Docs**:
    - Make changes in the corresponding files under `versioned_docs`.

2. **Edit WIP Docs**:
    - Make the same changes in the corresponding files under `docs`.

3. **Push Changes**:
    - Once updates are made in both places, push the changes to the repository.

Following these steps ensures that both current and future versions of the documentation remain consistent and up-to-date.

## Local Development

1. Copy the example .env file:

```shell
cp .env.template .env
```

* Note: The default values seem to work for local development but refer to KeePass for the actual ALGOLIA_APP_ID, ALGOLIA_API_KEY, and ALGOLIA_INDEX_NAME details.

2. Start a local development server and open up a browser window. Most changes are reflected live without having to restart the server.

```
$ yarn start
```

## Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

Using SSH:

```
$ USE_SSH=true yarn deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
