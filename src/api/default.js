import axios from 'axios';

const baseApiUrl = 'http://localhost:3000/api';

export default axios.create({
  baseURL: baseApiUrl,
  headers: { 'Content-Type': 'application/json' },
});
