/**
 * Pointrlabs Webapp Project (http://pointr-node.pointrlabs.com/)
 *
 * Copyright © 2016 Pointr, LLC. All rights reserved.
 *
 * This source code is licensed under the VLK license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import path from 'path';
import gaze from 'gaze';
import Promise from 'bluebird';
import fs from './lib/fs';
import pkg from '../package.json';
/**
 * Copies static files such as robots.txt, favicon.ico to the
 * output (build) folder.
 */
async function copy({ watch } = {}) {
  const ncp = Promise.promisify(require('ncp'));

  await Promise.all([
    ncp('src/public', 'build/public'),
    ncp('src/content', 'build/content'),
    ncp('src/messages', 'build/messages'),
    ncp('node_modules/leaflet/dist/', 'build/public/css'),
    ncp('node_modules/font-awesome/css/', 'build/public/css/font-awesome'),
    ncp('node_modules/font-awesome/fonts/', 'build/public/css/fonts'),
  ]);

  await fs.writeFile('./build/package.json', JSON.stringify({
    private: true,
    engines: pkg.engines,
    dependencies: pkg.dependencies,
    scripts: {
      start: 'node server.js',
    },
  }, null, 2));

  if (watch) {
    const watcher = await new Promise((resolve, reject) => {
      gaze('src/{content,messages}/**/*.*', (err, val) => (err ? reject(err) : resolve(val)));
    });

    const cp = async (file) => {
      const relPath = file.substr(path.join(__dirname, '../src/').length);
      await ncp(`src/${relPath}`, `build/${relPath}`);
    };

    watcher.on('changed', cp);
    watcher.on('added', cp);
  }
}

export default copy;
