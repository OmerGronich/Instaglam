import axios from 'axios';
import {
  SET_FOLLOWS,
  SET_FOLLOWS_LOADING,
  TOGGLE_FOLLOWS
} from 'actions/follows/followTypes';

export const getFollows = (id, type) => async dispatch => {
  try {
    dispatch({
      type: SET_FOLLOWS_LOADING,
      payload: true
    });

    let follows;

    if (type === 'likes') {
      follows = (await axios.get(`/api/posts/${id}/likes/users`)).data;
    } else if (type === 'followers') {
      follows = (await axios.get(`/api/users/${id}/follows/followers`)).data;
    } else if (type === 'following') {
      follows = (await axios.get(`/api/users/${id}/follows/following`)).data;
    }

    dispatch({
      type: SET_FOLLOWS,
      payload: follows
    });
  } catch (e) {
    console.log(e);
  }
};

export const toggleFollows = (userId, isFollowing) => async dispatch => {
  if (!isFollowing) {
    await axios.post(`/api/users/${userId}/follows`);

    dispatch({
      type: TOGGLE_FOLLOWS,
      payload: { isFollowed: true, userId }
    });

    return Promise.resolve();
  }
  await axios.delete(`/api/users/${userId}/follows`);

  dispatch({
    type: TOGGLE_FOLLOWS,
    payload: { isFollowed: false, userId }
  });
  return Promise.resolve();
};
