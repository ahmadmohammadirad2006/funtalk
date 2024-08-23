import FormView from './FormView';

class SingUpView extends FormView {
  _parentElement = document.getElementById('signUpForm');
}

export default new SingUpView();
