import axios from 'axios';

//const baseApiUrl = 'http://localhost:3000/';
const baseApiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/';

export default axios.create({
  baseURL: baseApiUrl,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});
