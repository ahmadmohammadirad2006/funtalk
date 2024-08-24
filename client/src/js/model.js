import * as helpers from './helpers';
import axios from 'axios';

// STATE OBJECT : USED TO STORE THE STATE OF THE APPLICATION AND CONTROLLER GETS DATA FROM THIS OBJECT
export const state = {
  currentUser: {},
  rooms: [],
};

// SIGN UP FUNCTION: GET FORM DATA, SANATIZE FORM DATA, VALIDATE FORM DATA, SEND A POST REQUEST TO /api/users/signup WITH THE FORM DATA (name, email, password, password confirm, emoji)
// data MUST BE AN OBJECT WITH SIGN UP FORM DATA
export const signUp = async function (data) {
  const dataSanatized = helpers.sanatize(data);

  helpers.validateForm(dataSanatized, 'signup');

  await axios({
    method: 'post',
    url: '/api/users/signup',
    data: dataSanatized,
  });
};

// LOG IN FUNCTION: GET FORM DATA, SANATIZE FORM DATA, VALIDATE FORM DATA, SEND A POST REQUEST TO /api/users/login WITH THE FORM DATA (email, password)
// data MUST BE AN OBJECT WITH LOG IN FORM DATA
export const logIn = async function (data) {
  const dataSanatized = helpers.sanatize(data);

  helpers.validateForm(dataSanatized, 'login');

  await axios({
    method: 'post',
    url: '/api/users/login',
    data: dataSanatized,
  });
};

// LOG OUT FUNCTION: SEND A GET REQUEST TO /api/users/logout
export const logOut = async function () {
  await axios.get('/api/users/logout');
};

// GET CURRENT USER FUNCTION: SEND A GET REQUEST TO /api/users/me, STORE THE DATA IN THE RESPONSE IN state.currentUser
export const getCurrentUser = async function () {
  const res = await axios.get('/api/users/me');

  state.currentUser = res.data?.data?.doc;
};

// GET ROOMS FUNCTION: SEND A GET REQUEST TO /api/rooms, STORE THE DATA IN THE RESPONSE IN state.rooms
export const getRooms = async function () {
  const res = await axios.get('/api/rooms');

  state.rooms = res.data?.data?.docs;
};
