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
import { FormattedRelative } from 'react-intl';
import s from './Home.css';

const title = 'Pointr';

function Home(props, context) {
  context.setTitle(title);
  return (
    <div className={s.root}>
      <div className={s.container}>
        <h1 className={s.title}>Test</h1>
        <p>Pointr Cloud Dashboard test interface</p>
        <p>- You can navigate to 'tracking' or 'heatmap' from sidebar now</p>
      </div>
    </div>
  );
}
Home.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Home);
