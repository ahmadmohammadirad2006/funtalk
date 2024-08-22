import { isAlpha, isEmail, isAscii } from 'validator';
import MyError from './utils/myError';

// formType can be either signup or login
export const validateForm = function (data, formType) {
  if (formType === 'signup') {
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
  if (formType === 'login' || formType === 'signup') {
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
  if (formType === 'signup') {
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

export const sanatize = function (obj) {
  return Object.fromEntries(
    Object.entries(obj).map((entry) => {
      return [entry[0], entry[1].trim()];
    })
  );
};
