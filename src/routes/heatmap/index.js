import React from 'react';
import Heatmap from './Heatmap';

export default {

  path: '/heatmap',

  async action() {
    const resp = await fetch('/graphql', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: '{level{level,name,url},heatmap{key,value{x,y,value}}}',
      }),
      credentials: 'include',
    });
    const { data } = await resp.json();
    if (!data || !data.level || !data.heatmap) throw new Error('Failed to load the levels.');

    return <Heatmap maps={data.level} heatmap={data.heatmap} />;
  },

};
