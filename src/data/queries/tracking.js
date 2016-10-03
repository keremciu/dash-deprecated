import { GraphQLList as List } from 'graphql';
import fetch from '../../core/fetch';
import PositionType from '../types/PositionType';
import { endpoint } from '../../config';

// Tracking data from pointr server
const url = `${endpoint}/Positions/RetrieveData`;

let items = [];
let lastFetchTask;
let lastFetchTime = new Date(1970, 0, 1);

const tracking = {
  type: new List(PositionType),
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

export default tracking;
