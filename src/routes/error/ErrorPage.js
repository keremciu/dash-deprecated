/**
 * Pointrlabs Webapp Project (http://pointr-node.pointrlabs.com/)
 *
 * Copyright © 2016 Pointr, LLC. All rights reserved.
 *
 * This source code is licensed under the VLK license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ErrorPage.css';

function ErrorPage({ error }, context) {
  let title = 'Error';
  let content = 'Sorry, a critical error occurred on this page.';
  let errorMessage = null;

  if (error.status === 404) {
    title = 'Page Not Found';
    content = 'Sorry, the page you were trying to view does not exist.';
  } else if (process.env.NODE_ENV !== 'production') {
    errorMessage = <pre>{error.stack}</pre>;
  }

  if (context.setTitle) {
    context.setTitle(title);
  }

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
      {errorMessage}
    </div>
  );
}

ErrorPage.propTypes = { error: PropTypes.object.isRequired };
ErrorPage.contextTypes = { setTitle: PropTypes.func.isRequired };

export { ErrorPage as ErrorPageWithoutStyle };
export default withStyles(s)(ErrorPage);
