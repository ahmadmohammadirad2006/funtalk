import FormView from './FormView';

class SingUpView extends FormView {
  _parentEl = document.getElementById('signUpForm');
}

export default new SingUpView();
