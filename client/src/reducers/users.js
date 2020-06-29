import { SEARCH_USER_SUCCESS, SEARCH_USER_FAIL } from 'actions/types';

const initialState = {
  loading: true,
  users: []
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SEARCH_USER_SUCCESS:
      return {
        ...state,
        users: payload,
        loading: false
      };
    case SEARCH_USER_FAIL:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
}
