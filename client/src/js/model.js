import * as helpers from './helpers';
import axios from 'axios';

export const state = {};

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

  const res = await axios({
    method: 'post',
    url: '/api/users/signup',
    data: dataSanatized,
  });

  console.log(res);
};
