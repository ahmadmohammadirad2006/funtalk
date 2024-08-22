import FormView from './FormView';

class LogInView extends FormView {
  _parentElement = document.getElementById('logInFrom');

  constructor() {
    super();
  }
}

export default new LogInView();
