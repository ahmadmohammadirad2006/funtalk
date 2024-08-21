class SingUpView {
  _parentElement = document.getElementById('signUpForm');

  addHandlerSignUp(handler) {
    this._parentElement.addEventListener(
      'submit',
      function (e) {
        e.preventDefault();
        this.clearAllInpErrors();
        const dataArr = [...new FormData(this._parentElement)];
        const data = Object.fromEntries(dataArr);
        handler(data);
      }.bind(this)
    );
  }

  displayInpError(inpGroupId, errorMessage) {
    const inpGroupEl = document.getElementById(inpGroupId);
    inpGroupEl.classList.add('input-group--error');
    const errorMessageEl = inpGroupEl.querySelector(
      '.input-group-error-message'
    );
    errorMessageEl.textContent = errorMessage;
  }

  clearAllInpErrors() {
    const inpGroups = this._parentElement.querySelectorAll('.input-group');
    inpGroups.forEach((el) => {
      el.classList.remove('input-group--error');
      const errorMessageEl = el.querySelector('.input-group-error-message');
      errorMessageEl.textContent = '';
    });
  }

  showAlert(msg, error = false) {
    this.hideAlert();
    const alertEl = document.getElementById('alert');
    alertEl.textContent = msg;
    if (error) {
      alertEl.classList.add('alert--error');
    }
    alertEl.classList.remove('hidden');
  }

  hideAlert() {
    const alertEl = document.getElementById('alert');
    alertEl.textContent = '';
    alertEl.classList.remove('alert--error');
    alertEl.classList.add('hidden');
  }
}

export default new SingUpView();
