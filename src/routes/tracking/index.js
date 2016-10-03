import React from 'react';
import Tracking from './Tracking';

// query: '{level{level,name,url}},tracking{x,y,level,userIdentifier,lastSeenDate,rotationDegrees}',
export default {

  path: '/tracking',

  async action() {
    const resp = await fetch('/graphql', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: '{level{level,name,url},tracking{x,y,level,userIdentifier,lastSeenData,rotationDegrees}}',
      }),
      credentials: 'include',
    });
    const { data } = await resp.json();
    if (!data || !data.level) throw new Error('Failed to load the levels.');

    return <Tracking maps={data.level} tracking={data.tracking} />;
  },

};
