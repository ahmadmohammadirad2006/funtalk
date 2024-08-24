const currentURL = window.location.href;

import * as model from './model.js';
import alertView from './views/alertView.js';
import signUpView from './views/signUpView.js';
import profileView from './views/profileView.js';
import logInView from './views/logInView.js';
import roomsView from './views/roomsView.js';
import modalView from './views/modalView.js';

const controlSignUp = async function (data) {
  try {
    await model.signUp(data);
    // GO back to home page
    window.location.assign('/');
  } catch (err) {
    if (err.data?.cause === 'Incorrect user input') {
      signUpView.displayInpError(err.data.inputGroup, err.message);
    } else {
      console.error('💥' + err);
      alertView.show({
        msg: err.response.data.message || err.message,
        error: true,
        stayForMs: 2000,
      });
    }
  }
};

const controlLogin = async function (data) {
  try {
    await model.logIn(data);
    // GO back to home page
    window.location.assign('/');
  } catch (err) {
    if (err.data?.cause === 'Incorrect user input') {
      logInView.displayInpError(err.data.inputGroup, err.message);
    } else {
      console.error('💥' + err);
      alertView.show({
        msg: err.response.data.message || err.message,
        error: true,
        stayForMs: 2000,
      });
    }
  }
};

const controlLogOut = async function () {
  try {
    modalView.show('Are you sure you want to logout?');

    modalView.addHandlerClickYes(async function () {
      await model.logOut();

      // GO back to home page
      window.location.assign('/');
    });
  } catch (err) {
    console.error('💥' + err);
    alertView.show({
      msg: err.response?.data?.message || err.message,
      error: true,
      stayForMs: 2000,
    });
  }
};

const controlProfile = async function () {
  try {
    // Get current user data
    await model.getCurrentUser();
    // Hide login and signup btns (this only happens in home page)
    profileView.hideLogInAndSignUpContainer();
    // Display profile
    profileView.show(model.state.currentUser);
  } catch (err) {
    if (err.response?.status !== 401) {
      console.error('💥' + err);
      alertView.show({
        msg: err.response?.data?.message || err.message,
        error: true,
        stayForMs: 2000,
      });
    }
  }
};

const controlRooms = async function () {
  try {
    // Render the spinnner
    roomsView.renderSpinner();
    // Get rooms
    await model.getRooms();
    // Display rooms
    roomsView.render(model.state.rooms, true);
  } catch (err) {
    console.error('💥' + err);
    roomsView.renderError(err.response.data.message || err.message);
  }
};

const init = function () {
  const currentURL = window.location.href;
  if (currentURL.endsWith('/signup')) {
    signUpView.addHandlerSubmit(controlSignUp);
  }
  if (currentURL.endsWith('/login')) {
    logInView.addHandlerSubmit(controlLogin);
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
  }
};
init();
