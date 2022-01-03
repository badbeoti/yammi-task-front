import axios from 'axios';
import store from './redux/store';

const ADDRESS = 'http://localhost:8000/';

const unauthInstance = axios.create({
  baseURL: ADDRESS,
  timeout: 10000,
});

const authInstance = axios.create({
  baseURL: ADDRESS,
  timeout: 10000,
});

authInstance.interceptors.request.use(
  config => {
    // Do something before request is sent
    const {authSlice} = store.getState();
    console.log(authSlice);
    config.headers = {
      ...config.headers,
      Authorization: !authSlice.token ? '' : `Bearer ${authSlice.token}`,
    };
    return config;
  },
  error => {
    // Do something with request error
    return Promise.reject(error);
  },
);

export const postRegister = data => {
  return unauthInstance.post('api/register/', data);
};

export const postToken = data => {
  return unauthInstance.post('api/token/', data);
};

export const postAirdrop = data => {
  return authInstance.post('transfer/airdrop/', data);
};

export const postSend = data => {
  return authInstance.post('transfer/send/', data);
};

export const getLogin = () => {
  return authInstance.get('api/login/');
};

export const URL_USERS = 'api/users/';
export const getUsers = url => {
  return authInstance.get(url);
};

export const URL_TRANSACTIONS = 'transfer/transactions/';
export const getTransactions = url => {
  return authInstance.get(url);
};
