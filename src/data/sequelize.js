/**
 * Pointrlabs Webapp Project (http://pointr-node.pointrlabs.com/)
 *
 * Copyright © 2016 Pointr, LLC. All rights reserved.
 *
 * This source code is licensed under the VLK license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import Sequelize from 'sequelize';
import { databaseUrl } from '../config';

const sequelize = new Sequelize(databaseUrl, {
  define: {
    freezeTableName: true,
  },
});

export default sequelize;
