/* eslint-disable import/prefer-default-export */
/* eslint-disable no-param-reassign*/

import {
  SET_RUNTIME_VARIABLE,
  SET_FILTER_START,
  SET_FILTER_SUCCESS,
  SET_FILTER_ERROR,
} from '../constants';

export function filterChange({ pages, filter, value, page }) {
  return async (dispatch, getState, { graphqlRequest }) => {
    const state = getState();

    if (pages === undefined) {
      pages = state.filter.pages;
      const index = pages[page].filters.findIndex((el) => el.enum === filter.enum);
      pages[page].filters[index].defaultValue = value;
    }

    dispatch({
      type: SET_RUNTIME_VARIABLE,
      payload: {
        name: 'initialNow',
        value: Date.now(),
      },
    });

    dispatch({
      type: SET_FILTER_START,
      payload: {
        pages,
      },
    });

    try {
      const data = '5';

      dispatch({
        type: SET_FILTER_SUCCESS,
        payload: {
          pages,
          data,
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
          pages,
          error,
        },
      });
      return false;
    }

    return true;
  };
}
