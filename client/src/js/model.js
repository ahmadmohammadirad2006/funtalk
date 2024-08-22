import * as helpers from './helpers';
import axios from 'axios';

export const state = {
  currentUser: {},
};

export const signUp = async function (data) {
  // DATA SANITIZATION
  const dataSanatized = helpers.sanatize(data);
  helpers.validateForm(dataSanatized, 'signup');

  await axios({
    method: 'post',
    url: '/api/users/signup',
    data: dataSanatized,
  });
};

export const logIn = async function (data) {
  // DATA SANITIZATION
  const dataSanatized = helpers.sanatize(data);
  helpers.validateForm(dataSanatized, 'login');
  await axios({
    method: 'post',
    url: '/api/users/login',
    data: dataSanatized,
  });
};

export const getCurrentUser = async function () {
  const res = await axios.get('/api/users/me');
  state.currentUser = res.data?.data?.doc;
};
