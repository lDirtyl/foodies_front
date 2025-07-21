import { publicApi, privateApi } from '../services/api';

export const usersSignup = async user => {
  const { data } = await publicApi.post('/users/register', user);
  return data;
};

export const usersLogin = async user => {
  const { data } = await publicApi.post('/users/login', user);
  return data;
};

export const usersLogout = async () => {
  await privateApi.post('/users/logout');
};

export const fetchCurrentUser = async () => {
  const { data } = await privateApi.get('/users/current');
  return data;
};
