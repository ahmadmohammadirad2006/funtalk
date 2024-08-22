import * as model from './model.js';
import alertView from './views/alertView.js';
import signUpView from './views/signUpView.js';
import profileView from './views/profileView.js';

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

const controlProfile = async function () {
  try {
    // Get current user data
    await model.getCurrentUser();
    // Hide login and signup btns (this only happens in home page)
    profileView.hideLoginSignUpContainer();
    // Display profile
    profileView.show(model.state.currentUser);
  } catch (err) {
    if (err.response?.status !== 401) {
      console.error('💥' + err);
      alertView.show({
        msg: err.response.data.message || err.message,
        error: true,
        stayForMs: 2000,
      });

      console.log('hello');
    }
  }
};

const init = function () {
  const currentURL = window.location.href;
  if (currentURL.endsWith('/signup')) {
    signUpView.addHandlerSignUp(controlSignUp);
  }
  if (
    currentURL.endsWith('/') ||
    currentURL.endsWith('/home') ||
    currentURL.endsWith('/profile') ||
    currentURL.includes('rooms')
  ) {
    controlProfile();
  }
  if (currentURL.endsWith('/')) {
  }
};
init();
