/**
 * Pointrlabs Webapp Project (http://pointr-node.pointrlabs.com/)
 *
 * Copyright © 2016 Pointr, LLC. All rights reserved.
 *
 * This source code is licensed under the VLK license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import 'babel-polyfill';
import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import requestLanguage from 'express-request-language';
import bodyParser from 'body-parser';
import expressJwt from 'express-jwt';
import expressGraphQL from 'express-graphql';
import jwt from 'jsonwebtoken';
import React from 'react';
import ReactDOM from 'react-dom/server';
import UniversalRouter from 'universal-router';
import PrettyError from 'pretty-error';
import './serverIntlPolyfill';
import Html from './components/Html';
import { ErrorPageWithoutStyle } from './routes/error/ErrorPage';
import errorPageStyle from './routes/error/ErrorPage.css';
import fetch from './core/fetch';
import passport from './core/passport';
import models from './data/models';
import schema from './data/schema';
import routes from './routes';
import createHistory from './core/createHistory';
import assets from './assets'; // eslint-disable-line import/no-unresolved
import configureStore from './store/configureStore';
import { setRuntimeVariable } from './actions/runtime';
import { setLocale } from './actions/intl';
import { filterChange } from './actions/filter';
import Provide from './components/Provide';
import { port, auth, locales, pageOptions, endpoint, headers } from './config';

const app = express();
global.navigator = { userAgent: 'all' };

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(requestLanguage({
  languages: locales,
  queryName: 'lang',
  cookie: {
    name: 'lang',
    options: {
      path: '/',
      maxAge: 3650 * 24 * 3600 * 1000, // 10 years in miliseconds
    },
    url: '/lang/{language}',
  },
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//
// Authentication
// -----------------------------------------------------------------------------
app.use(expressJwt({
  secret: auth.jwt.secret,
  credentialsRequired: false,
  getToken: req => req.cookies.id_token,
}));
app.use(passport.initialize());

app.get('/login/facebook',
  passport.authenticate('facebook', { scope: ['email', 'user_location'], session: false })
);
app.get('/login/facebook/return',
  passport.authenticate('facebook', { failureRedirect: '/login', session: false }),
  (req, res) => {
    const expiresIn = 60 * 60 * 24 * 180; // 180 days
    const token = jwt.sign(req.user, auth.jwt.secret, { expiresIn });
    res.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: true });
    res.redirect('/');
  }
);

//
// Register API middleware
// -----------------------------------------------------------------------------
app.use('/graphql', expressGraphQL(req => ({
  schema,
  graphiql: true,
  rootValue: { request: req },
  pretty: process.env.NODE_ENV !== 'production',
})));

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
app.get('*', async (req, res, next) => {
  const history = createHistory(req.url);
  // let currentLocation = history.getCurrentLocation();
  let sent = false;
  const removeHistoryListener = history.listen(location => {
    const newUrl = `${location.pathname}${location.search}`;
    if (req.originalUrl !== newUrl) {
      // console.log(`R ${req.originalUrl} -> ${newUrl}`); // eslint-disable-line no-console
      if (!sent) {
        res.redirect(303, newUrl);
        sent = true;
        next();
      } else {
        console.error(`${req.path}: Already sent!`); // eslint-disable-line no-console
      }
    }
  });

  try {
    const store = configureStore({}, {
      cookie: req.headers.cookie,
      history,
    });

    store.dispatch(setRuntimeVariable({
      name: 'initialNow',
      value: Date.now(),
    }));
    let css = new Set();
    let statusCode = 200;
    const locale = req.language;
    const data = {
      lang: locale,
      title: '',
      description: '',
      style: '',
      script: assets.main.js,
      children: '',
    };

    store.dispatch(setRuntimeVariable({
      name: 'availableLocales',
      value: locales,
    }));

    await store.dispatch(setLocale({
      locale,
    }));

    const filledOptions = pageOptions;

    // promise chain for retrieve options by pages
    await new Promise((resolve, reject) => {
      const pages = Object.keys(pageOptions);
      // Loop pages from pageOptions
      const page = function pageData(key) {
        return new Promise((pageResolve, pageReject) => {
          // Get filters by page
          const filters = pageOptions[key].filters;
          const fetchedData = {};

          // fetch filter options
          const fn = function asyncFetch(filter, index) {
            return new Promise((childResolve, childReject) => {
              let items = [];
              const url = `${endpoint}/Service/RetrieveOptions?option=${filter.enum}`;

              fetch(url, { method: 'GET', headers })
                .then(response => response.json())
                .then(filterData => {
                  if (filterData.status.code === 200) {
                    items = filterData.body;
                  }
                  filledOptions[key].filters[index].data = items;
                  fetchedData[filter] = items;
                  return childResolve(items);
                })
                .catch((err) => childReject(err));
            });
          };

          // fetch all filters and finish the page promise
          const filtersResult = Promise.all(filters.map(fn));

          // now set results to redux store
          return filtersResult
            .then((filterData) => pageResolve(filterData))
            .catch((err) => pageReject(err));
        });
      };

      // fetch all filters and change pageOptions
      const result = Promise.all(pages.map(page));

      // now set results to redux store
      return result.then((pageData) => {
        store.dispatch(filterChange({
          pages: filledOptions,
        }));
        return resolve(pageData);
      }).catch((err) => reject(err));
    });

    await UniversalRouter.resolve(routes, {
      path: req.path,
      query: req.query,
      context: {
        store,
        createHref: history.createHref,
        insertCss: (...styles) => {
          styles.forEach(style => css.add(style._getCss())); // eslint-disable-line no-underscore-dangle, max-len
        },
        setTitle: value => (data.title = value),
        setMeta: (key, value) => (data[key] = value),
      },
      render(component, status = 200) {
        css = new Set();
        statusCode = status;

        // Fire all componentWill... hooks
        data.children = ReactDOM.renderToString(<Provide store={store}>{component}</Provide>);

        // If you have async actions, wait for store when stabilizes here.
        // This may be asynchronous loop if you have complicated structure.
        // Then render again

        // If store has no changes, you do not need render again!
        // data.children = ReactDOM.renderToString(<Provide store={store}>{component}</Provide>);

        // It is important to have rendered output and state in sync,
        // otherwise React will write error to console when mounting on client
        data.state = store.getState();

        data.style = [...css].join('');
        return true;
      },
    });

    if (!sent) {
      const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);
      res.status(statusCode);
      res.send(`<!doctype html>${html}`);
    }
  } catch (err) {
    next(err);
  } finally {
    removeHistoryListener();
  }
});

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.log(pe.render(err)); // eslint-disable-line no-console
  const statusCode = err.status || 500;
  const html = ReactDOM.renderToStaticMarkup(
    <Html
      title="Internal Server Error"
      description={err.message}
      style={errorPageStyle._getCss()} // eslint-disable-line no-underscore-dangle
    >
      {ReactDOM.renderToString(<ErrorPageWithoutStyle error={err} />)}
    </Html>
  );
  res.status(statusCode);
  res.send(`<!doctype html>${html}`);
});

//
// Launch the server
// -----------------------------------------------------------------------------
/* eslint-disable no-console */
models.sync().catch(err => console.error(err.stack)).then(() => {
  app.listen(port, () => {
    console.log(`The server is running at http://localhost:${port}/`);
  });
});
/* eslint-enable no-console */
