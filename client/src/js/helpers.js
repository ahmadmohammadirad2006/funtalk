import { isAlpha, isEmail, isAscii } from 'validator';
import MyError from './utils/myError';

// VALIDATE FORM FUNCTION: GET FROM DATA, AND CHECK ITS PROPERTies BASED ON THE GIVEN FORM TYPE AND IF SOMETHING IS WRONG THROW AN ERROR WITH THE CAUSE OF Incorrect user input AND THE ID OF THE INPUT GROUP
// data MUST BE AN OBJECT WHICH HAS LOG IN OR SIGN UP FORM PROPERTIES
// formType CAN BE EITHER signup OR login OR updateMe OR updateMyPassword
export const validateForm = function (data, formType) {
  if (formType === 'signup' || formType === 'updateMe') {
    // NAME VALIDATION
    if (!data.name) {
      throw new MyError('Name is required', {
        cause: 'Incorrect user input',
        inputGroup: 'inpGroupName',
      });
    }
    if (data.name.length < 3 || data.name.length > 32) {
      throw new MyError(
        'Name must not be less than 3 and more than 32 characters',
        {
          cause: 'Incorrect user input',
          inputGroup: 'inpGroupName',
        }
      );
    }
    if (!isAlpha(data.name)) {
      throw new MyError('Name must only contain letters', {
        cause: 'Incorrect user input',
        inputGroup: 'inpGroupName',
      });
    }
  }
  if (
    formType === 'login' ||
    formType === 'signup' ||
    formType === 'updateMe'
  ) {
    // EMAIL VALIDATION
    if (!data.email) {
      throw new MyError('Email is required', {
        cause: 'Incorrect user input',
        inputGroup: 'inpGroupEmail',
      });
    }
    if (!isEmail(data.email)) {
      throw new MyError('Email is invalid', {
        cause: 'Incorrect user input',
        inputGroup: 'inpGroupEmail',
      });
    }
  }
  if (
    formType === 'login' ||
    formType === 'signup' ||
    formType === 'updateMyPassword'
  ) {
    // PASSWORD VALIDATION
    if (!data.password) {
      throw new MyError('Password is required', {
        cause: 'Incorrect user input',
        inputGroup: 'inpGroupPassword',
      });
    }
    if (data.password.length < 8) {
      throw new MyError('Password must be atleast 8 charaters', {
        cause: 'Incorrect user input',
        inputGroup: 'inpGroupPassword',
      });
    }
    if (!isAscii(data.password)) {
      throw new MyError(
        'Password must use only English letters, numbers, and standard symbols.',
        {
          cause: 'Incorrect user input',
          inputGroup: 'inpGroupPassword',
        }
      );
    }
  }
  if (formType === 'signup' || formType === 'updateMyPassword') {
    // PASSWORD CONFIRM VALIDATION
    if (!data.passwordConfirm) {
      // PASSWORD CONFIRM VALIDATION
      throw new MyError('Please confirm your password', {
        cause: 'Incorrect user input',
        inputGroup: 'inpGroupPasswordConfirm',
      });
    }
    if (data.password !== data.passwordConfirm) {
      throw new MyError(
        'Your password confirm is not the same as your password',
        {
          cause: 'Incorrect user input',
          inputGroup: 'inpGroupPasswordConfirm',
        }
      );
    }
  }
};

// SANATIZE FUNTION: GET AN OBJECT, RUN String.prototype.trim() FUNCTION ON ALL OF ITS VALUEs, RETURN A NEW OBJECT
// obj MUST BE AN OBJECT THAT ALL OF ITS VALUEs ARE STRINGs
export const sanatize = function (obj) {
  return Object.fromEntries(
    Object.entries(obj).map((entry) => {
      return [entry[0], entry[1].trim()];
    })
  );
};

// GET ROOM ID FROM URL FUNCTION: RETURN ROOM ID FROM URL
export const getRoomIdFromURL = function () {
  let currentPath = window.location.pathname;
  if (currentPath !== '/' && currentPath.endsWith('/')) {
    currentPath = currentPath.slice(0, -1);
  }
  return currentPath.split('/').at(-1);
};
