import FormView from './FormView';

class ChangePasswordView extends FormView {
  _parentEl = document.getElementById('changePasswordForm');
  _formType = 'updateMyPassword';
}

export default new ChangePasswordView();
