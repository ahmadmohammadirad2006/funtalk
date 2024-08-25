import * as helpers from './helpers';
import { ROOMS_PER_PAGE } from './config';
import axios from 'axios';

// STATE OBJECT : USED TO STORE THE STATE OF THE APPLICATION AND CONTROLLER GETS DATA FROM THIS OBJECT
export const state = {
  currentUser: {},
  rooms: {
    page: 1,
    results: [],
    resultsPerPage: ROOMS_PER_PAGE,
  },
};

// SEND FORM DATA FUNCTION: SANATIZE GIVEN data , VALIDATE IT, SEND A POST REQUEST TO /api/users/${formType} WITH THE FORM DATA 
// data MUST BE AN Object
// formType CAN BE EITHER signup OR login
export const sendFormData = async function (data, formType) {
  const dataSanatized = helpers.sanatize(data);

  helpers.validateForm(dataSanatized, formType);

  await axios({
    method: 'post',
    url: `/api/users/${formType}`,
    data: dataSanatized,
  });
};

// LOG OUT FUNCTION: SEND A GET REQUEST TO /api/users/logout
export const logOut = async function () {
  await axios.get('/api/users/logout');
};

// LOAD CURRENT USER FUNCTION: SEND A GET REQUEST TO /api/users/me, STORE THE DATA IN THE RESPONSE IN state.currentUser
export const loadCurrentUser = async function () {
  const res = await axios.get('/api/users/me');

  state.currentUser = res.data?.data?.doc;
};

// LOAD ROOMS FUNCTION: SEND A GET REQUEST TO /api/rooms, STORE THE DATA IN THE RESPONSE IN state.rooms
export const loadRooms = async function () {
  const res = await axios.get('/api/rooms');

  state.rooms.results = res.data?.data?.docs;
};

// GET ROOMS OF PAGE: RETURN THE ROOMS OF THE GIVE page
// page MUST BE A Number
export const getRoomsOfPage = function (page = state.rooms.page) {
  state.rooms.page = page;
  const start = (page - 1) * state.rooms.resultsPerPage;
  const end = start + state.rooms.resultsPerPage;
  return state.rooms.results.slice(start, end);
};
