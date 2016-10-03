# Pointr Cloud Dashboard

### About

##### Summary
This repository has Node.js client of Pointr Cloud.

Why Node.js?
- We have a service API on .Net Repo. API and Webapp needs to be seperated.

- Backend and Frontend have so different problems. They are solving different needs thats why we disconnect the frontend(client) from the backend.

- Frontend needs "uber" client performance.

- Frontend does not need to use "Windows" or other os dependencies.

- ... more is coming

This repository has "Universal" (isomorphic) build.

Dashboard is an opinionated for client development built on top of Node.js, Express, GraphQL, React and Redux, containing modern web development tools such as Webpack, Babel and Browsersync. Helping us to stay productive following best practices.

> I'm writing our documentations. I will share them in this repository.

### Requirements

  * Mac OS X, Windows, or Linux
  * [Node.js](https://nodejs.org/) v5.0 or newer
  * `npm` v3.3 or newer (new to [npm](https://docs.npmjs.com/)?)
  * `node-gyp` prerequisites mentioned [here](https://github.com/nodejs/node-gyp)

### Directory Layout

Before you start, take a moment to see how the project structure looks like:

  ```
  .
  ├── /build/                     # The folder for compiled output
  ├── /docs/                      # Documentation files for the project
  ├── /node_modules/              # 3rd-party libraries and utilities
  ├── /src/                       # The source code of the application
  │   ├── /components/            # React components
  │   ├── /content/               # Static pages like About Us, Privacy Policy etc.
  │   ├── /core/                  # Core framework and utility functions
  │   ├── /data/                  # GraphQL server schema and data models
  │   ├── /public/                # Static files which are copied into the /build/public folder
  │   ├── /routes/                # Page/screen components along with the routing information
  │   ├── /client.js              # Client-side startup script
  │   ├── /config.js              # Global application settings
  │   └── /server.js              # Server-side startup script
  ├── /test/                      # Unit and end-to-end tests
  ├── /tools/                     # Build automation scripts and utilities
  │   ├── /lib/                   # Library for utility snippets
  │   ├── /build.js               # Builds the project from source to output (build) folder
  │   ├── /bundle.js              # Bundles the web resources into package(s) through Webpack
  │   ├── /clean.js               # Cleans up the output (build) folder
  │   ├── /copy.js                # Copies static files to output (build) folder
  │   ├── /deploy.js              # Deploys your web application
  │   ├── /run.js                 # Helper function for running build automation tasks
  │   ├── /runServer.js           # Launches (or restarts) Node.js server
  │   ├── /start.js               # Launches the development web server with "live reload"
  │   └── /webpack.config.js      # Configurations for client-side and server-side bundles
  └── package.json                # The list of 3rd party libraries and utilities
  ```

### Quick Start

#### 1. Get the latest version

You can start by cloning the latest version of Dashboard on your
local machine by running:

```shell
$ git clone -b master --single-branch \
      https://github.com/PointrLabs/PointrCloudDashboard.git Dashboard
$ cd Dashboard
```

#### 2. Run `npm install`

This will install both run-time project dependencies and developer tools listed
in [package.json](../package.json) file.

#### 3. Run `npm start`

This command will build the app from the source files (`/src`) into the output
`/build` folder. As soon as the initial build completes, it will start the
Node.js server (`node build/server.js`) and [Browsersync](https://browsersync.io/)
with [HMR](https://webpack.github.io/docs/hot-module-replacement) on top of it.

> [http://localhost:3000/](http://localhost:3000/) — Node.js server (`build/server.js`)<br>
> [http://localhost:3000/graphql](http://localhost:3000/graphql) — GraphQL server and IDE<br>
> [http://localhost:3001/](http://localhost:3001/) — BrowserSync proxy with HMR, React Hot Transform<br>
> [http://localhost:3002/](http://localhost:3002/) — BrowserSync control panel (UI)

Note that the `npm start` command launches the app in `development` mode,
the compiled output files are not optimized and minimized in this case.
You can use `--release` command line argument to check how your app works
in release (production) mode:

```shell
$ npm start -- --release
```

### How to Build, Test, Deploy

If you need just to build the app (without running a dev server), simply run:

```shell
$ npm run build
```

or, for a production build:

```shell
$ npm run build -- --release
```

After running this command, the `/build` folder will contain the compiled
version of the app. For example, you can launch Node.js server normally by
running `node build/server.js`.

To check the source code for syntax errors and potential issues run:

```shell
$ npm run lint
```

To launch unit tests:

```shell
$ npm test              # Run unit tests with Mocha
$ npm run test:watch    # Launch unit test runner and start watching for changes
```

To deploy the app, run:

```shell
$ npm run deploy
```

The deployment script `tools/deploy.js` is configured to push the contents of
the `/build` folder to a remote server via Git. You can easily deploy your app
to [Azure Web Apps](https://azure.microsoft.com/en-us/services/app-service/web/),
or [Heroku](https://www.heroku.com/) this way. Both will execute `npm install --production`
upon receiving new files from you. Note, you should only deploy the contents
of the `/build` folder to a remote server.

### How to Update

If you need to keep your project up to date with the recent changes made to RSK,
you can always fetch and merge them from [this repo](https://github.com/PointrLabs/PointrCloudDashboard)
back into your own project by running:

```shell
$ git checkout master
$ git fetch PointrCloudDashboard
$ git merge PointrCloudDashboard/master
$ npm install
```

### Learn More about our Client Stack

  * [Getting Started with React.js](http://facebook.github.io/react/)
  * [Getting Started with GraphQL and Relay](https://quip.com/oLxzA1gTsJsE)
  * [React.js Questions on StackOverflow](http://stackoverflow.com/questions/tagged/reactjs)
  * [React.js Discussion Board](https://discuss.reactjs.org/)
  * [Flux Architecture for Building User Interfaces](http://facebook.github.io/flux/)
  * [Enzyme — JavaScript Testing utilities for React](http://airbnb.io/enzyme/)
  * [Flow — A static type checker for JavaScript](http://flowtype.org/)
  * [The Future of React](https://github.com/reactjs/react-future)
  * [Learn ES6](https://babeljs.io/docs/learn-es6/), [ES6 Features](https://github.com/lukehoban/es6features#readme)


---
Made with ♥ by Kerem Sevencan at Pointr ([@keremciu](https://twitter.com/keremciu))]
