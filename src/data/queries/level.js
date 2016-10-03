import { GraphQLList as List } from 'graphql';
import fetch from '../../core/fetch';
import LevelType from '../types/LevelType';
import { endpoint } from '../../config';

// Level data from pointr server
const url = `${endpoint}/Service/RetrieveAllFloors`;

let items = [];
let lastFetchTask;
let lastFetchTime = new Date(1970, 0, 1);

const level = {
  type: new List(LevelType),
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
            'Content-Type': 'application/json',
            AuthenticationToken: '84442c45-bea7-460e-9d74-67528fe2c4d3',
            DeviceIdentifier: 'nodeserver-1',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
          },
        })
        .then(response => response.json())
        .then(data => {
          if (data.status.code === 200) {
            items = data.body;
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
