import axios, { AxiosInstance } from 'axios';

class Axios {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      timeout: 10000,
    });
  }
}

const fetch = new Axios().instance;

export default fetch;
