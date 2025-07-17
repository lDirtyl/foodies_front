import axios from 'axios';

//const baseApiUrl = 'http://localhost:3000/api';
const baseApiUrl = 'https://foodies-back-1.onrender.com/api';

export default axios.create({
  baseURL: baseApiUrl,
  headers: { 'Content-Type': 'application/json' },
});
