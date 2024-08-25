import View from './View';

// FormView CLASS: SOME METHODS CAN BE USED FOR FORMS
export default class FormView extends View {
  // ADD HANDLER SUBMIT FUNCTION: ON FORM SUBMIT, PREVENT DEFAULT BEHAVIOUR, CLEAR ALL INPUT ERRORs, CALL GIVEN handler WITH THE FORM DATA
  // handler MUST BE A Function
  addHandlerSubmit(handler) {
    this._parentEl.addEventListener(
      'submit',
      function (e) {
        e.preventDefault();
        this.clearAllInpErrors();
        const dataArr = [...new FormData(this._parentEl)];
        const data = Object.fromEntries(dataArr);
        handler(data, this._formType);
      }.bind(this)
    );
  }

  // DISPLAY INP ERROR FUNCTION: ADD input-group--error TO THE ELMENT WITH THE GIVEN inpGroupId ID AND DISPLAY errorMessage IN A ELEMENT WITH input-group-error-message CLASS
  // inpGroupId MUST BE THE ID OF AN INPUT GROUP
  // errorMessage MUST BE A String
  displayInpError(inpGroupId, errorMessage) {
    const inpGroupEl = document.getElementById(inpGroupId);
    inpGroupEl.classList.add('input-group--error');
    const errorMessageEl = inpGroupEl.querySelector(
      '.input-group-error-message'
    );
    errorMessageEl.textContent = errorMessage;
  }

  // CLEAR ALL INPUT ERRORs FUNCTION: SELECT ALL INPUT GROUPs IN THE FORM, REMOVE input-group--error CLASS AND CLEAR ERROR MESSAGE FROM THEM
  clearAllInpErrors() {
    const inpGroupEls = this._parentEl.querySelectorAll('.input-group');
    inpGroupEls.forEach((el) => {
      el.classList.remove('input-group--error');
      const errorMessageEl = el.querySelector('.input-group-error-message');
      errorMessageEl.textContent = '';
    });
  }
}
