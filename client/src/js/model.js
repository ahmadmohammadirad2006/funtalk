import * as helpers from './helpers';
import axios from 'axios';

export const state = {
  currentUser: {},
};

export const signUp = async function (data) {
  // DATA SANITIZATION
  const dataSanatized = {
    name: data.name.trim(),
    email: data.email.trim(),
    emoji: data.emoji,
    password: data.password.trim(),
    passwordConfirm: data.passwordConfirm.trim(),
  };
  helpers.validateSignUpForm(dataSanatized);

  await axios({
    method: 'post',
    url: '/api/users/signup',
    data: dataSanatized,
  });
};

export const logIn = async function (data) {
  // DATA SANITIZATION
  const dataSanatized = {
    email: data.email.trim(),
    password: data.password.trim(),
  };
  helpers.validateLogInForm(dataSanatized);
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
