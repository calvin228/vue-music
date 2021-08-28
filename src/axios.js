import axios from 'axios';

const instance = axios.create({
  baseURL: "https://itunes.apple.com",
  headers:{
    "Access-Control-Allow-Origin": process.env.VUE_APP_DOMAIN
  }
})

export default instance;