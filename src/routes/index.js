/**
 * Pointrlabs Webapp Project (http://pointr-node.pointrlabs.com/)
 *
 * Copyright © 2016 Pointr, LLC. All rights reserved.
 *
 * This source code is licensed under the VLK license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import App from '../components/App';

// Child routes
import home from './home';
import heatmap from './heatmap';
import tracking from './tracking';
import contact from './contact';
import login from './login';
import register from './register';
import content from './content';
import error from './error';

export default {

  path: '/',

  // keep in mind, routes are evaluated in order
  children: [
    home,
    heatmap,
    tracking,
    contact,
    login,
    register,

    // place new routes before...
    content,
    error,
  ],

  async action({ next, render, context }) {
    const component = await next();
    if (component === undefined) return component;
    return render(
      <App context={context}>{component}</App>
    );
  },

};
