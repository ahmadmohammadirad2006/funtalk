import FormView from './FormView';

class SingUpView extends FormView {
  _parentEl = document.getElementById('signUpForm');
  _formType = 'signup';
}

export default new SingUpView();
