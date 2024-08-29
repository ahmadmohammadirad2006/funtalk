import FormView from './FormView';

class AccountSettingsView extends FormView {
  _parentEl = document.getElementById('accountSettingsForm');
  _formType = 'updateMe';
  _nameInpEl = document.getElementById('inpGroupName')?.querySelector('input');
  _emailInpEl = document
    .getElementById('inpGroupEmail')
    ?.querySelector('input');
  _selectEmojiEl = document.getElementById('selectEmoij');
  _deleteAccountBtnEl = document.getElementById('deleteAccountBtn');
  setDefaultValues(data) {
    this._nameInpEl.value = data.name;
    this._emailInpEl.value = data.email;
    this._selectEmojiEl.querySelector(`[value=${data.emoji}]`).selected = true;
  }
  addHandlerClickDeleteAccount(handler) {
    this._deleteAccountBtnEl.addEventListener('click', function () {
      handler();
    });
  }
}

export default new AccountSettingsView();
