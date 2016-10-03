import { GraphQLList as List } from 'graphql';
import fetch from '../../core/fetch';
import HeatmapType from '../types/HeatmapType';
import { endpoint } from '../../config';

// Level data from pointr server
const url = `${endpoint}/HeatMap/RetrieveHeatMapData`;

let items = [];
let lastFetchTask;
let lastFetchTime = new Date(1970, 0, 1);

const level = {
  type: new List(HeatmapType),
  resolve() {
    if (lastFetchTask) {
      return lastFetchTask;
    }

    if ((new Date() - lastFetchTime) > 1000 * 60 * 10 /* 10 mins */) {
      lastFetchTime = new Date();
      lastFetchTask = fetch(url,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            AuthenticationToken: '84442c45-bea7-460e-9d74-67528fe2c4d3',
            DeviceIdentifier: 'nodeserver-1',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
          },
          body: 'startDate=01/07/2016+10:58&endDate=23/09/2016+10:58&level=-99&positionType=-99&timeOffset:-180',
        })
        .then(response => response.json())
        .then(data => {
          if (data.status.code === 200) {
            if (data.body) {
              items = data.body;
            } else {
              items = [];
            }
          }

          return items;
        })
        .finally(() => {
          lastFetchTask = null;
        });

      if (items.length) {
        return items;
      }

      return lastFetchTask;
    }

    return items;
  },
};

export default level;
