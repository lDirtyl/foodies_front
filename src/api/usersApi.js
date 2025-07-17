import axios from './default';
import { getAuthorizationHeader } from './utils';

export const currentUserDetailFetch = async token => {
  const response = await axios.get('/users/current', {
    headers: {
      Authorization: getAuthorizationHeader(token),
    },
  });
  return response.data;
};
