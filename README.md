# Tauri + React + Typescript Starter Kit

Welcome to the Tauri + React + Typescript Starter Kit! This template is designed to help non-Rust developers quickly get started with building cross-platform desktop applications using Tauri. Below, you'll find everything you need to kickstart your development journey.

## Getting Started

### Installation

1. Clone this repository to your local machine.
    ```sh
    git clone https://github.com/angelxmoreno/tauri-starter-react-router-mui-ts.git tauri-app
    ```
2. Navigate to the project directory.
    ```sh
    cd tauri-app
    ```
3. Install dependencies using your preferred package manager:
    ```sh
    bun i
    ```
4. @todo the DB migration?

### Development

To start the development server and launch the application:

```
bun tauri dev
```

This will start the tauri app.

### Production Build

To build the application for production:

```
bunx tauri build
```

## Features

This starter kit comes packed with the following features and libraries:

-   React
-   Typescript
-   Vite
-   Material Design Icons
-   Material UI
-   React Router
-   Zustand
-   Path aliases with vite-tsconfig-paths
-   Eslint
-   Prettier
-   lint-staged
-   husky
-   commit-lint
-   Kysely
-   Tauri-Plugin-SQL

## Database Integration

We use [Kysely](https://kysely.dev/) for type-safe SQL queries and migrations management. This enables seamless database integration for TypeScript developers. Below are the steps to manage your database:

### Running Migrations

To apply pending migrations:

```
bun db:migration up
```

### Creating Migrations

To create a new migration:

```
bun db:migration create
```

### Generating Kysely Database Types

To generate database types:

```
bun db:generate
```

## TODOs

-   [ ] Consider a modern linter like [dprint](https://dprint.dev/overview/) or [biomejs](https://biomejs.dev/).
-   [ ] Streamline the process of identifying and setting the database path outside of Tauri for the Kysely CLI tools.
