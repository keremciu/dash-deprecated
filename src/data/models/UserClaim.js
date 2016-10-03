/**
 * Pointrlabs Webapp Project (http://pointr-node.pointrlabs.com/)
 *
 * Copyright © 2016 Pointr, LLC. All rights reserved.
 *
 * This source code is licensed under the VLK license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import DataType from 'sequelize';
import Model from '../sequelize';

const UserClaim = Model.define('UserClaim', {

  type: {
    type: DataType.STRING,
  },

  value: {
    type: DataType.INTEGER,
  },

});

export default UserClaim;
