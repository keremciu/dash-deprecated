/**
 * Pointrlabs Webapp Project (http://pointr-node.pointrlabs.com/)
 *
 * Copyright © 2016 Pointr, LLC. All rights reserved.
 *
 * This source code is licensed under the VLK license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

export function addEventListener(node, event, listener) {
  if (node.addEventListener) {
    node.addEventListener(event, listener, false);
  } else {
    node.attachEvent(`on${event}`, listener);
  }
}

export function removeEventListener(node, event, listener) {
  if (node.removeEventListener) {
    node.removeEventListener(event, listener, false);
  } else {
    node.detachEvent(`on${event}`, listener);
  }
}

export function windowScrollX() {
  return (window.pageXOffset !== undefined) ? window.pageXOffset :
    (document.documentElement || document.body.parentNode || document.body).scrollLeft;
}

export function windowScrollY() {
  return (window.pageYOffset !== undefined) ? window.pageYOffset :
    (document.documentElement || document.body.parentNode || document.body).scrollTop;
}
