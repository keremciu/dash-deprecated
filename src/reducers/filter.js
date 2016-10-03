import {
  SET_FILTER_START,
  SET_FILTER_SUCCESS,
  SET_FILTER_ERROR,
} from '../constants';

export default function filter(state = null, action) {
  if (state === null) {
    return {
      initialNow: Date.now(),
    };
  }

  switch (action.type) {
    case SET_FILTER_START: {
      const pages = state[action.payload.pages] ? action.payload.pages : state.pages;
      return {
        ...state,
        pages,
        newPages: action.payload.pages,
      };
    }

    case SET_FILTER_SUCCESS: {
      return {
        ...state,
        pages: action.payload.pages,
        newPages: null,
        data: {
          ...state.data,
          [action.payload.pages]: action.payload.data,
        },
      };
    }

    case SET_FILTER_ERROR: {
      return {
        ...state,
        newPages: null,
      };
    }

    default: {
      return state;
    }
  }
}
