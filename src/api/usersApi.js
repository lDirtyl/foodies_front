import axios from './default';
import { getAuthorizationHeader } from './utils';

export const currentUserDetailFetch = async token => {
  const { data } = await axios.get('/users/current', {
    headers: {
      Authorization: getAuthorizationHeader(token),
    },
  });
  return data;
};

export const userDetailFetch = async (userId, token) => {
  const { data } = await axios.get(`/users/${userId}/details`, {
    headers: {
      Authorization: getAuthorizationHeader(token),
    },
  });
  return data;
};

export const updateUserAvatar = async (avatar, token) => {
  const { data } = await axios.patch(
    '/users/avatar',
    { avatar },
    {
      headers: {
        Authorization: getAuthorizationHeader(token),
      },
    }
  );
  return data;
};

export const fetchUserFollowers = async token => {
  const { data } = await axios.get(`/users/followers`, {
    headers: {
      Authorization: getAuthorizationHeader(token),
    },
  });
  return data;
};

export const fetchUserFollowing = async token => {
  const { data } = await axios.get(`/users/followings`, {
    headers: {
      Authorization: getAuthorizationHeader(token),
    },
  });
  return data;
};

export const followUser = async (userId, token) => {
  const { data } = await axios.post(`/users/follow`, {
    headers: {
      Authorization: getAuthorizationHeader(token),
    },
    data: {
      followingId: userId,
    },
  });
  return data;
};

export const unfollowUser = async (userId, token) => {
  const { data } = await axios.delete(`/users/follow`, {
    headers: {
      Authorization: getAuthorizationHeader(token),
    },
    data: {
      followingId: userId,
    },
  });
  return data;
};
