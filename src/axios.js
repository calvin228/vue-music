import axios from 'axios';

const instance = axios.create({
  baseURL: "https://itunes.apple.com",
})

console.log(process.env);
export default instance;