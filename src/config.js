/**
 * Pointrlabs Webapp Project (http://pointr-node.pointrlabs.com/)
 *
 * Copyright © 2016 Pointr, LLC. All rights reserved.
 *
 * This source code is licensed under the VLK license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint-disable max-len */

export const port = process.env.PORT || 3000;
export const host = process.env.WEBSITE_HOSTNAME || `localhost:${port}`;

// default locale is the first one
export const locales = ['en', 'tr'];

export const databaseUrl = process.env.DATABASE_URL || 'sqlite:database.sqlite';

export const endpoint = 'http://pointr-aimia-v3.azurewebsites.net';
// export const endpoint = 'http://192.168.0.200';

export const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  AuthenticationToken: '84442c45-bea7-460e-9d74-67528fe2c4d3',
  DeviceIdentifier: 'nodeserver-1',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
};

// page filter parameters to get data before runtime
export const pageOptions = {
  tracking: {
    filters: [
      {
        enum: 'levels',
        data: [],
      },
      {
        enum: 'durationType',
        data: [],
        defaultValue: 'minutes',
      },
    ],
  },
  heatmap: {
    filters: [
      {
        enum: 'levels',
        data: [],
      },
      {
        enum: 'heatMapTypes',
        data: [],
        defaultValue: 0,
      },
      {
        enum: 'positionTypes',
        data: [],
        defaultValue: -99,
      },
    ],
  },
};

export const analytics = {

  // https://analytics.google.com/
  google: {
    trackingId: process.env.GOOGLE_TRACKING_ID, // UA-XXXXX-X
  },

};

export const auth = {

  jwt: { secret: process.env.JWT_SECRET || 'Pointr' },

  // https://developers.facebook.com/
  facebook: {
    id: process.env.FACEBOOK_APP_ID || '186244551745631',
    secret: process.env.FACEBOOK_APP_SECRET || 'a970ae3240ab4b9b8aae0f9f0661c6fc',
  },

  // https://cloud.google.com/console/project
  google: {
    id: process.env.GOOGLE_CLIENT_ID || '251410730550-ahcg0ou5mgfhl8hlui1urru7jn5s12km.apps.googleusercontent.com',
    secret: process.env.GOOGLE_CLIENT_SECRET || 'Y8yR9yZAhm9jQ8FKAL8QIEcd',
  },

  // https://apps.twitter.com/
  twitter: {
    key: process.env.TWITTER_CONSUMER_KEY || 'Ie20AZvLJI2lQD5Dsgxgjauns',
    secret: process.env.TWITTER_CONSUMER_SECRET || 'KTZ6cxoKnEakQCeSpZlaUCJWGAlTEBJj0y2EMkUBujA7zWSvaQ',
  },

};
