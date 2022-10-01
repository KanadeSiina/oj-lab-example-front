import axios, { AxiosResponse } from "axios";
import { mock } from './mock';

const rest = (() => {
  const client = axios.create({
    baseURL: '',
    timeout: 5000,
  });
  return {
    client,
    get: (url) => {
      return client.get(url);
    },
    post: (url, data) => {
      return client.post(url, data);
    }
  }
})();

const useMock = true;
if (useMock) {
  mock(rest.client)
    .enableLog()
    .setDelayTime(500);
}

export default rest;