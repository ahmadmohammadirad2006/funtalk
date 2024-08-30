import * as helpers from './helpers';
import { ROOMS_PER_PAGE } from './config';
import axios from 'axios';
import { io } from 'socket.io-client';

// STATE OBJECT : USED TO STORE THE STATE OF THE APPLICATION AND CONTROLLER GETS DATA FROM THIS OBJECT
export const state = {
  socket: null,
  currentUser: null,
  rooms: {
    searchResutls: null,
    page: 1,
    all: null,
    resultsPerPage: ROOMS_PER_PAGE,
  },
  currentRoom: null,
};

// SEND FORM DATA FUNCTION: SANATIZE GIVEN data , VALIDATE IT, SEND REQUEST TO /api/users/${formType} WITH THE FORM DATA, GET USER DATA AND STORE IT IN LOCAL STORAGE
// data MUST BE AN Object
// formType CAN BE EITHER signup OR login
export const sendFormData = async function (data, formType) {
  const dataSanatized = helpers.sanatize(data);
  helpers.validateForm(dataSanatized, formType);
  let res;
  if (formType === 'updateMyPassword' || formType === 'updateMe') {
    res = await axios.patch(`/api/users/${formType}`, data);
  }
  if (formType === 'login' || formType === 'signup') {
    res = await axios({
      method: 'post',
      url: `/api/users/${formType}`,
      data: dataSanatized,
    });
  }
  const user = res.data?.data?.user;
  localStorage.setItem('currentUser', JSON.stringify(user));
};

// LOG OUT FUNCTION: SEND A DELETE REQUEST to /api/users/logout AND CLEAR currentUser FIELD OF LOCAL STORAGE
export const logOut = async function () {
  await axios.get('/api/users/logout');
  localStorage.setItem('currentUser', '');
};

// LOAD CURRENT USER FROM LOCAL STORAGE FUNCTION: GET CURRENT USER DATA FROM LOCAL STORAGE AND STORE IT IN state.currentUser
export const loadCurrentUserFromLocalStorage = function () {
  const storedUser = localStorage.getItem('currentUser');
  if (!storedUser) return null;
  state.currentUser = JSON.parse(storedUser);
};

// LOAD ROOMS FUNCTION: SEND A GET REQUEST TO /api/rooms, STORE THE DATA IN THE RESPONSE IN state.rooms
export const loadRooms = async function () {
  if (!state.rooms.all) {
    const res = await axios.get('/api/rooms');
    state.rooms.all = state.rooms.searchResutls = res.data?.data?.docs;
  }
};

// GET ROOMS OF PAGE: RETURN THE ROOMS OF THE GIVE page
// page MUST BE A Number
export const getRoomsOfPage = function (page = state.rooms.page) {
  state.rooms.page = page;
  const start = (page - 1) * state.rooms.resultsPerPage;
  const end = start + state.rooms.resultsPerPage;
  return state.rooms.searchResutls.slice(start, end);
};

// LOAD SEARCH RESULTS FUNCTION: FILTER THE state.rooms.all BASED ON THE GIVEN query AND STORE IT IN state.rooms.searchResults
// query MUST BE A String
export const loadSearchResults = function (query) {
  state.rooms.searchResutls = state.rooms.all.filter((room) =>
    room.name.toLowerCase().includes(query.toLowerCase())
  );
};

// LOAD CURRENT ROOM FUNCTION: MAKE A GET REQUEST TO /api/rooms/${roomId} AND STORE THE ROOM DATA IN state.currentRoom
// roomId MUST BE A String
export const loadCurrentRoom = async function (roomId) {
  if (state.currentRoom) return;
  const res = await axios.get(`/api/rooms/${roomId}`);
  state.currentRoom = res.data?.data?.doc;
};

// SEND MESSAGE FUNCTION: MAKE A POST REQUEST TO /api/messages WITH content AND room PROPERTIES OF GIVEN message
// message MUST BE AN Object
export const sendMessage = async function (message) {
  await axios({
    method: 'post',
    url: '/api/messages',
    data: {
      content: message.content,
      room: message.room._id,
    },
  });
};

// MAKE SOCKET CONNECTION FUNCTION: CALL io MAKE SOCKET CONNECTION TO WEB SOCKET SERVER ON SAME DOMAIN AND LISTEN TO connect__error EVENT AND TRHOW THE ERROR
export const makeSocketConnection = function () {
  if (state.socket) return;
  state.socket = io({
    withCredentials: true, // Ensure cookies are sent with the WebSocket connection
  });
  state.socket.on('connect__error', (err) => {
    throw err;
  });
};

// DELETE ACCOUNT FUNCTION: SEND A DELETE REQUEST to /api/users/deleteMe AND CLEAR currentUser FIELD OF LOCAL STORAGE
export const deleteAccount = async function () {
  await axios.delete('/api/users/deleteMe');
  localStorage.setItem('currentUser', '');
};
