import FormView from './FormView';

class LogInView extends FormView {
  _parentEl = document.getElementById('logInFrom');
  _formType = 'login'
}

export default new LogInView();
