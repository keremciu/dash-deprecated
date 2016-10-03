/**
 * Pointrlabs Webapp Project (http://pointr-node.pointrlabs.com/)
 *
 * Copyright © 2016 Pointr, LLC. All rights reserved.
 *
 * This source code is licensed under the VLK license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint-env mocha */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import App from './App';

describe('App', () => {

  it('renders children correctly', () => {
    const wrapper = shallow(
      <App context={{ insertCss: () => {} }}>
        <div className="child" />
      </App>
    );

    expect(wrapper.contains(<div className="child" />)).to.be.true;
  });

});
