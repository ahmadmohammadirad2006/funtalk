import * as model from './model.js';
import * as helpers from './helpers.js';
import alertView from './views/alertView.js';
import signUpView from './views/signUpView.js';
import profileView from './views/profileView.js';
import logInView from './views/logInView.js';
import roomsView from './views/roomsView.js';
import modalView from './views/modalView.js';
import authContainerView from './views/authContainerView.js';
import paginationView from './views/paginationView.js';
import searchView from './views/searchView.js';
import roomHeaderView from './views/roomHeaderView.js';
import messageAreaView from './views/messageAreaView.js';
import sendMessageView from './views/sendMessageView.js';

// CONTROL FORM: SEND FORM DATA (data) TO MODEL WITH GIVEN formType , IF SUCCESS GO TO HOME PAGE,  IF INPUT ERROR SHOW IT IN INDICATED INPUT, IF GENERAL ERROR USE ALERT
// data MUST BE AN Object
// formType CAN BE EITHER signup OR login
const controlForm = async function (data, formType) {
  try {
    await model.sendFormData(data, formType);

    window.location.assign('/');
  } catch (err) {
    if (err.data?.cause === 'Incorrect user input') {
      logInView.displayInpError(err.data.inputGroup, err.message);
    } else {
      console.error('💥' + err);
      alertView.showError(err.response?.data?.message || err.message);
    }
  }
};

// CONTROL LOG OUT: SHOW MODEL WITH AN APPROPRIATE MESSAGE, ADD A HANDLER TO LOG OUT AND GO TO HOME PAGE WHEN CLICK ON YES BUTTON, IF ERROR USE ALERT
const controlLogOut = function () {
  modalView.show('Are you sure you want to logout?');
  modalView.addHandlerClickYes(async function () {
    try {
      await model.logOut();

      window.location.assign('/');
    } catch (err) {
      console.error('💥' + err);
      alertView.showError(err.response?.data?.message || err.message);
    }
  });
};

// CONTROL PROFILE: LOAD CURRENT USED DATA, IF SUCCESS HIDE AUTH BUTTONS AND SHOW PROFILE WITH THE DATA, IF ERROR USE ALERT
const controlProfile = async function () {
  try {
    await model.loadCurrentUser();
    authContainerView.hide();
    profileView.show(model.state.currentUser);
  } catch (err) {
    if (err.response?.status !== 401) {
      console.error('💥' + err);
      alertView.showError(err.response?.data?.message || err.message);
    }
  }
};

// CONTROL ROOMS: RENDER A SPINNER IN ROOMS CONTAINER, LOAD ROOMS DATA, RENDER ROOMS OF FIRST PAGE, RENDER INITIAL PAGINATION BUTTONs, IF ERROR SHOW ERROR IN ROOMS CONTAINER
const controlRooms = async function () {
  try {
    roomsView.renderSpinner();

    await model.loadRooms();

    roomsView.render(model.getRoomsOfPage(), true);

    paginationView.render(model.state.rooms);
  } catch (err) {
    console.error('💥' + err);
    paginationView.render(model.state.rooms);
    console.log('ehllo');
    roomsView.renderError(err.response?.data?.message || err.message);
  }
};

// CONTROL PAGINATION: CHECK IF goToPage IS NOT OUT OF PAGES RANGE IF SO DO NOTHING, OTHERWISE RENDER ROOMS IN GIVEN goToPage PAGE, UPDATE PAGINATION BUTTONS AND PAGE NUMBER
// goToPage MUST BE A Number
const controlPagination = function (goToPage) {
  if (
    goToPage < 1 ||
    Math.ceil(
      model.state.rooms.searchResutls.length / model.state.rooms.resultsPerPage
    ) < goToPage
  )
    return;
  roomsView.render(model.getRoomsOfPage(goToPage), true);
  paginationView.render(model.state.rooms);
};

// CONTROL SEARCH FUNCTION: LOAD SEARCH RESULTS BASED ON query RENDER ROOMS IN PAGE 1 AND reRENDER PAGINATION BUTTONS
// query MUST BE A String
const controlSearch = function (query) {
  model.loadSearchResults(query);
  roomsView.render(model.getRoomsOfPage(1), true);
  paginationView.render(model.state.rooms);
};

// CONTROL CHAT FUNCTION: RENDER SPINNER IN MESSAGES AREA, LOAD CURRENT ROOM DATA RENDER ROOM NAME AND MESSAGES IN MESSAGE AREA SCROLL TO THE END OF MESSAGE AREA
const controlChat = async function () {
  try {
    model.makeSocketConnection();

    const roomId = helpers.getRoomIdFromURL();

    messageAreaView.renderSpinner();

    await model.loadCurrentRoom(roomId);

    const room = model.state.currentRoom;

    model.state.socket.emit('join-room', room._id);

    roomHeaderView.showRoomName(room.name);

    if (room.messages.length === 0) {
      messageAreaView.render(undefined);
    } else
      messageAreaView.render({
        messages: room.messages,
        currentUserId: model.state.currentUser._id,
      });

    model.state.socket.on('receive-message', (message) => {
      messageAreaView.renderNewMessage({
        message,
        currentUserId: model.state.currentUser._id,
      });
      messageAreaView.scrollToEnd();
    });

    messageAreaView.scrollToEnd();
  } catch (err) {
    console.error('💥' + err);
    alertView.showError(err.response?.data?.message || err.message);
  }
};

const controlSendMessage = async function (content) {
  try {
    const message = {
      content,
      room: model.state.currentRoom,
      user: model.state.currentUser,
      createdAt: new Date(Date.now()),
    };

    await model.sendMessage(message);

    model.state.socket.emit('send-message', message);

    messageAreaView.renderNewMessage({
      message,
      currentUserId: model.state.currentUser._id,
    });

    messageAreaView.scrollToEnd();
  } catch (err) {
    console.error('💥' + err);
    alertView.showError(err.response?.data?.message || err.message);
  }
};

const init = function () {
  let currentPath = window.location.pathname;
  if (currentPath !== '/' && currentPath.endsWith('/')) {
    currentPath = currentPath.slice(0, -1);
  }

  if (currentPath === '/' || currentPath === '/home') {
    authContainerView.init();
  }
  if (currentPath === '/signup') {
    signUpView.addHandlerSubmit(controlForm);
  }
  if (currentPath === '/login') {
    logInView.addHandlerSubmit(controlForm);
  }
  if (
    currentPath === '/' ||
    currentPath === '/home' ||
    currentPath === '/profile' ||
    currentPath.includes('/rooms')
  ) {
    modalView.init();
    profileView.addHandlerInit(controlProfile);
    profileView.addHandlerClickLogOut(controlLogOut);
  }
  if (currentPath === '/rooms') {
    roomsView.addHandlerInit(controlRooms);
    paginationView.addHandlerClick(controlPagination);
    searchView.addHandlerClickSearch(controlSearch);
  }
  if (currentPath.includes('/rooms/')) {
    messageAreaView.addHandlerInit(controlChat);
    sendMessageView.addHandlerClickSend(controlSendMessage);
  }
};
init();
