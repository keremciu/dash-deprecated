/**
 * Pointrlabs Webapp Project (http://pointr-node.pointrlabs.com/)
 *
 * Copyright © 2016 Pointr, LLC. All rights reserved.
 *
 * This source code is licensed under the VLK license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import http from 'http';

export default async (url) => new Promise((resolve, reject) =>
    http.get(url, res => resolve(res)).on('error', err => reject(err))
);
