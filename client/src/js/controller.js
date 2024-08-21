import * as model from './model.js';
import signUpView from './views/signUpView.js';

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
      console.log(err);
      signUpView.showAlert(err.response.data.message, true);
      setTimeout(() => {
        signUpView.hideAlert();
      }, 2000);
    }
  }
};

const init = function () {
  if (window.location.href.endsWith('/signup')) {
    signUpView.addHandlerSignUp(controlSignUp);
  }
};
init();
