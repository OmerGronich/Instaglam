import axios from 'axios';
import {
  SEARCH_USERS_SUCCESS,
  SEARCH_USERS_FAIL,
  SEARCH_SINGLE_USER_SUCCESS,
  SEARCH_SINGLE_USER_FAIL, RESET_LOADING
} from './userTypes';

// Search users by email/username
export const searchUsers = (searchParam) => {
  return async (dispatch) => {
    try {
      if (searchParam) {
        dispatch({
          type: RESET_LOADING
        });
        const res = await axios.get(`/api/users/search/${searchParam}`);

        if (!res.data.length) {
          throw new Error('No results found.');
        }

        dispatch({
          type: SEARCH_USERS_SUCCESS,
          payload: res.data
        });
      }
    } catch (error) {
      dispatch({
        type: SEARCH_USERS_FAIL,
        payload: error.message
      });
    }
  };
};

// Search single user by email/username/userId
export const searchUser = (userInfo) => {
  return async (dispatch) => {
    try {
      if (userInfo) {
        dispatch({
          type: RESET_LOADING
        });

        const res = await axios.get(`/api/users/${userInfo}`);

        dispatch({
          type: SEARCH_SINGLE_USER_SUCCESS,
          payload: res.data
        });
      }
    } catch (error) {
      dispatch({
        type: SEARCH_SINGLE_USER_FAIL,
        payload: error.message
      });
    }
  };
};
