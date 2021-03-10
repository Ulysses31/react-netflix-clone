import axios from 'axios';

// base api url
const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3'
});

export default instance;
