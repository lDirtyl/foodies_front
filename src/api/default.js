import axios from 'axios';

const baseApiUrl = 'https://foodies-back-1.onrender.com/api';

export default axios.create({
  baseURL: baseApiUrl,
  headers: { 'Content-Type': 'application/json' },
});
