import FormView from './FormView';

class SingUpView extends FormView {
  _parentElement = document.getElementById('signUpForm');

  constructor() {
    super();
  }
}

export default new SingUpView();
