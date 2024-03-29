/**
 * Pointrlabs Webapp Project (http://pointr-node.pointrlabs.com/)
 *
 * Copyright © 2016 Pointr, LLC. All rights reserved.
 *
 * This source code is licensed under the VLK license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import FastClick from 'fastclick';
import UniversalRouter from 'universal-router';
import { readState, saveState } from 'history/lib/DOMStateStorage';
// will be removed inject tap event
import injectTapEventPlugin from 'react-tap-event-plugin';
import { addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import tr from 'react-intl/locale-data/tr';
import routes from './routes';
import createHistory from './core/createHistory';
import configureStore from './store/configureStore';
import {
  addEventListener,
  removeEventListener,
  windowScrollX,
  windowScrollY,
} from './core/DOMUtils';
import Provide from './components/Provide';

[en, tr].forEach(addLocaleData);

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const context = {
  store: null,
  insertCss: (...styles) => {
    const removeCss = styles.map(style => style._insertCss()); // eslint-disable-line no-underscore-dangle, max-len
    return () => {
      removeCss.forEach(f => f());
    };
  },
  setTitle: value => (document.title = value),
  setMeta: (name, content) => {
    // Remove and create a new <meta /> tag in order to make it work
    // with bookmarks in Safari
    const elements = document.getElementsByTagName('meta');
    Array.from(elements).forEach((element) => {
      if (element.getAttribute('name') === name) {
        element.parentNode.removeChild(element);
      }
    });
    const meta = document.createElement('meta');
    meta.setAttribute('name', name);
    meta.setAttribute('content', content);
    document
      .getElementsByTagName('head')[0]
      .appendChild(meta);
  },
};

// Restore the scroll position if it was saved into the state
function restoreScrollPosition({ state, hash }) {
  if (state && state.scrollY !== undefined) {
    window.scrollTo(state.scrollX, state.scrollY);
    return;
  }

  const targetHash = hash && hash.substr(1);
  if (targetHash) {
    const target = document.getElementById(targetHash);
    if (target) {
      window.scrollTo(0, windowScrollY() + target.getBoundingClientRect().top);
      return;
    }
  }

  window.scrollTo(0, 0);
}

let renderComplete = (location, callback) => {
  const elem = document.getElementById('css');
  if (elem) elem.parentNode.removeChild(elem);
  callback(true);
  renderComplete = (l) => {
    restoreScrollPosition(l);

    // Google Analytics tracking. Don't send 'pageview' event after
    // the initial rendering, as it was already sent
    if (window.ga) {
      window.ga('send', 'pageview');
    }

    callback(true);
  };
};

function render(container, location, config, component) {
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(// eslint-disable-line no-console
        'React rendering. State:',
        config.store.getState()
      );
    }

    try {
      ReactDOM.render(
        <Provide {...config}>
          {component}
        </Provide>,
        container,
        renderComplete.bind(undefined, location, resolve)
      );
    } catch (err) {
      reject(err);
    }
  });
}

export default function main() {
  const history = createHistory();
  const container = document.getElementById('app');
  const initialState = JSON.parse(
    document
      .getElementById('source')
      .getAttribute('data-initial-state')
  );
  let currentLocation = history.getCurrentLocation();

  // Make taps on links and buttons work fast on mobiles
  FastClick.attach(document.body);

  const store = configureStore(initialState, { history });
  context.store = store;
  context.createHref = history.createHref;

  // Re-render the app when window.location changes
  function onLocationChange(location) {
    // Save the page scroll position into the current location's state
    if (currentLocation.key) {
      saveState(currentLocation.key, {
        ...readState(currentLocation.key),
        scrollX: windowScrollX(),
        scrollY: windowScrollY(),
      });
    }
    currentLocation = location;

    UniversalRouter.resolve(routes, {
      path: location.pathname,
      query: location.query,
      state: location.state,
      context,
      render: render.bind(undefined, container, location, { store }), // eslint-disable-line react/jsx-no-bind, max-len
    }).catch(err => console.error(err)); // eslint-disable-line no-console
  }

  // Add History API listener and trigger initial change
  const removeHistoryListener = history.listen(onLocationChange);
  history.replace(currentLocation);

  // https://developers.google.com/web/updates/2015/09/history-api-scroll-restoration
  let originalScrollRestoration;
  if (window.history && 'scrollRestoration' in window.history) {
    originalScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
  }

  // Prevent listeners collisions during history navigation
  addEventListener(window, 'pagehide', function onPageHide() {
    removeEventListener(window, 'pagehide', onPageHide);
    removeHistoryListener();
    if (originalScrollRestoration) {
      window.history.scrollRestoration = originalScrollRestoration;
      originalScrollRestoration = undefined;
    }
  });
}
