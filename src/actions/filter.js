/* eslint-disable import/prefer-default-export */

import {
  SET_RUNTIME_VARIABLE,
  SET_FILTER_START,
  SET_FILTER_SUCCESS,
  SET_FILTER_ERROR,
} from '../constants';

export function filterChange({ index, value, page }) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const state = getState();

    dispatch({
      type: SET_RUNTIME_VARIABLE,
      payload: {
        name: 'initialNow',
        value: Date.now(),
      },
    });

    try {
      const pageOptions = state.runtime.pageOptions;
      pageOptions[page].filters[index].defaultValue = value;

      dispatch({
        type: SET_RUNTIME_VARIABLE,
        payload: {
          name: 'pageOptions',
          value: pageOptions,
        },
      });
      // const { data } = await graphqlRequest(query, { locale });
      // const messages = data.intl.reduce((msgs, msg) => {
      //   msgs[msg.id] = msg.message; // eslint-disable-line no-param-reassign
      //   return msgs;
      // }, {});
      // dispatch({
      //   type: SET_FILTER_SUCCESS,
      //   payload: {
      //     locale,
      //     messages,
      //   },
      // });

      // remember locale for every new request
      // if (process.env.BROWSER) {
      //   const maxAge = 3650 * 24 * 3600; // 10 years in seconds
      //   document.cookie = `lang=${locale};path=/;max-age=${maxAge}`;
      // }
    } catch (error) {
      dispatch({
        type: SET_FILTER_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }

    return true;
  };
}
