import * as model from './model.js';
import alertView from './views/alertView.js';
import signUpView from './views/signUpView.js';
import profileView from './views/profileView.js';
import logInView from './views/logInView.js';
import roomsView from './views/roomsView.js';
import modalView from './views/modalView.js';
import authContainerView from './views/authContainerView.js';
import paginationView from './views/paginationView.js';
import searchView from './views/searchView.js';

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

const controlSearch = function (query) {
  model.loadSearchResults(query);
  roomsView.render(model.getRoomsOfPage(1), true);
  paginationView.render(model.state.rooms);
};

const init = function () {
  const currentURL = window.location.href;
  if (currentURL.endsWith('/') || currentURL.endsWith('/home')) {
    authContainerView.init();
  }
  if (currentURL.endsWith('/signup')) {
    signUpView.addHandlerSubmit(controlForm);
  }
  if (currentURL.endsWith('/login')) {
    logInView.addHandlerSubmit(controlForm);
  }
  if (
    currentURL.endsWith('/') ||
    currentURL.endsWith('/home') ||
    currentURL.endsWith('/profile') ||
    currentURL.includes('/rooms')
  ) {
    modalView.init();
    profileView.addHandlerInit(controlProfile);
    profileView.addHandlerClickLogOut(controlLogOut);
  }
  if (currentURL.endsWith('/rooms')) {
    roomsView.addHandlerInit(controlRooms);
    paginationView.addHandlerClick(controlPagination);
    searchView.addHandlerClickSearch(controlSearch);
  }
};
init();
