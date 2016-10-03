/**
 * Pointrlabs Webapp Project (http://pointr-node.pointrlabs.com/)
 *
 * Copyright © 2016 Pointr, LLC. All rights reserved.
 *
 * This source code is licensed under the VLK license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import UserType from '../types/UserType';

const me = {
  type: UserType,
  resolve({ request }) {
    return request.user && {
      id: request.user.id,
      email: request.user.email,
    };
  },
};

export default me;
