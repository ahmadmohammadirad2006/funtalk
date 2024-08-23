import FormView from './FormView';

class LogInView extends FormView {
  _parentElement = document.getElementById('logInFrom');
}

export default new LogInView();
