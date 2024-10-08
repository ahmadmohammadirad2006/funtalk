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
import accountSettingsView from './views/accountSettingsView.js';
import changePasswordView from './views/changePasswordView.js';
import usersListView from './views/usersListView.js';

// CONTROL FORM: SEND FORM DATA (data) TO MODEL WITH GIVEN formType , IF SUCCESS GO TO HOME PAGE,  IF INPUT ERROR SHOW IT IN INDICATED INPUT, IF GENERAL ERROR USE ALERT
// data MUST BE AN Object
// formType CAN BE EITHER signup OR login OR updateMe
const controlForm = async function (data, formType) {
  try {
    await model.sendFormData(data, formType);

    window.location.assign('/');
  } catch (err) {
    if (err.data?.cause === 'Incorrect user input') {
      logInView.displayInpError(err.data?.inputGroup, err.message);
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

// CONTROL PROFILE: LOAD CURRENT USED DATA FROM LOCAL STORAGE IF THERE IS NO DATA RETURN, HIDE AUTH BUTTONS AND SHOW PROFILE WITH THE DATA
const controlProfile = function () {
  if (model.loadCurrentUserFromLocalStorage() === null) return;
  authContainerView.hide();
  profileView.show(model.state?.currentUser);
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
    paginationView.render(model.state?.rooms);
    roomsView.renderError(err.response?.data?.message || err.message);
  }
};

// CONTROL PAGINATION: CHECK IF goToPage IS NOT OUT OF PAGES RANGE IF SO DO NOTHING, OTHERWISE RENDER ROOMS IN GIVEN goToPage PAGE, UPDATE PAGINATION BUTTONS AND PAGE NUMBER
// goToPage MUST BE A Number
const controlPagination = function (goToPage) {
  if (
    goToPage < 1 ||
    Math.ceil(
      model.state?.rooms?.searchResutls?.length /
        model.state?.rooms?.resultsPerPage
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
  paginationView.render(model.state?.rooms);
};

// CONTROL CHAT FUNCTION: RENDER SPINNER IN MESSAGES AREA, LOAD CURRENT ROOM DATA RENDER ROOM NAME AND MESSAGES IN MESSAGE AREA SCROLL TO THE END OF MESSAGE AREA
const controlChat = async function () {
  try {
    model.makeSocketConnection();

    messageAreaView.renderSpinner();

    const roomId = helpers.getRoomIdFromURL();

    await model.loadCurrentRoom(roomId);

    model.state.socket.emit('join-room', model.state?.currentRoom?._id);

    roomHeaderView.showRoomName(model.state?.currentRoom?.name);

    if (model.state?.currentRoom?.messages?.length === 0) {
      messageAreaView.render(undefined);
    } else {
      messageAreaView.render({
        messages: model.state?.currentRoom?.messages,
        currentUserId: model.state?.currentUser?._id,
      });
    }

    messageAreaView.scrollToEnd();

    model.state.socket.on('receive-message', (message) => {
      model.state.currentRoom.messages.push(message);
      messageAreaView.render({
        messages: model.state.currentRoom.messages,
        currentUserId: model.state.currentUser._id,
      });
      messageAreaView.scrollToEnd();
    });
  } catch (err) {
    console.error('💥' + err);
    alertView.showError(err.response?.data?.message || err.message);
  }
};

// CONTROL SEND MESSAGE FUNCTION: CREATE A MESSAGE OBJECT, SEND IT TO MODEL, EMIT send-message EVENT, RENDER NEW MESSAGE , SCROLL TO END OF MESSAGE AREA, IF ERROR USE ALERT
// content MUST BE A String
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

    model.state.currentRoom.messages.push(message);

    messageAreaView.render({
      messages: model.state.currentRoom.messages,
      currentUserId: model.state.currentUser._id,
    });

    messageAreaView.scrollToEnd();
  } catch (err) {
    console.error('💥' + err);
    alertView.showError(err.response?.data?.message || err.message);
  }
};

// CONTROL USERS LIST FUNCTION: RENDER SPINNRE IN USERS LIST , LOAD CURRENT ROOM, RENDER CURRENT USERS IN THE ROOM WITH CURRENT USER AT FIRST, LISTEN FOR one-joined AND one-left EVENTS
const controlUsersList = async function () {
  try {
    usersListView.renderSpinner();

    const roomId = helpers.getRoomIdFromURL();
    await model.loadCurrentRoom(roomId);
    model.state.currentRoom.currentUsers.unshift(model.state.currentUser);
    usersListView.render({
      users: model.state.currentRoom.currentUsers,
      currentUserId: model.state.currentUser._id,
    });

    model.state.socket.on('one-joined', (user) => {
      model.state.currentRoom.currentUsers.push(user);
      usersListView.render({
        users: model.state.currentRoom.currentUsers,
        currentUserId: model.state.currentUser._id,
      });
    });

    model.state.socket.on('one-left', (user) => {
      const currentUsers = model.state.currentRoom.currentUsers;
      model.state.currentRoom.currentUsers.splice(
        currentUsers.findIndex((el) => el._id === user._id),
        1
      );
      usersListView.render({
        users: model.state.currentRoom.currentUsers,
        currentUserId: model.state.currentUser._id,
      });
    });
  } catch (err) {
    console.error('💥' + err);
    usersListView.renderError(err.response?.data?.message || err.message);
  }
};

// CONTROL ACCOUNT SETTINGS FUNCTION: LOAD CURRENT USER DATA AND SET DEFAULT VALUES OF ACCOUNT SETTINGS FORM
const controlAccountSettings = function () {
  model.loadCurrentUserFromLocalStorage();
  accountSettingsView.setDefaultValues(model.state.currentUser);
};

// CONTROL DELETE ACCOUNT FUNCTION: SHOW MODEL WITH AN APPROPRIATE MESSAGE, ADD A HANDLER TO DELETE ACCOUTN AND GO TO HOME PAGE WHEN CLICK ON YES BUTTON, IF ERROR USE ALERT
const controlDeleteAccount = function () {
  modalView.show('Are you sure you want to delete your account?');
  modalView.addHandlerClickYes(async function () {
    try {
      await model.deleteAccount();

      window.location.assign('/');
    } catch (err) {
      console.error('💥' + err);
      alertView.showError(err.response?.data?.message || err.message);
    }
  });
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
    usersListView.addHandlerInit(controlUsersList);
    sendMessageView.addHandlerClickSend(controlSendMessage);
  }
  if (currentPath === '/profile') {
    accountSettingsView.addHandlerInit(controlAccountSettings);
    accountSettingsView.addHandlerSubmit(controlForm);
    changePasswordView.addHandlerSubmit(controlForm);
    accountSettingsView.addHandlerClickDeleteAccount(controlDeleteAccount);
  }
};
init();
