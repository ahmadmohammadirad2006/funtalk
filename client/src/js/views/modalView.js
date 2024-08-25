import View from './View';

class ModalView extends View {
  _parentEl = document.getElementById('modal');
  _messageEl = document.getElementById('modalMessage');
  _noBtnEl = document.getElementById('modalNoButton');
  _yesBtnEl = document.getElementById('modalYesButton');

  // INIT FUNCTION: DO THINGs THAT NEED TO BE DONE WHEN ModelView is used
  // WHY NOT USING contructor ? BECAUSE CONTRUCTOR IS CALLED WHENEVER THIS CLASS IS CALLED WITH new KEYWORD AND THIS HAPPENS IN ALL PAGES I WANT THESE THINGS TO BE DONE WHEN THIS CLASS IS REALLY USED
  init() {
    this.addHandlerClickNo(this.hide.bind(this));
  }

  // SHOW FUNCTION: DISPLAY THE GIVEN message, REMOVE hidden CLASS FROM THE MODEL, ADD flex CLASS TO IT
  // message MUST BE A String
  show(message) {
    this._messageEl.textContent = message;
    this._parentEl.classList.remove('hidden');
    this._parentEl.classList.add('flex');
  }

  // HIDE FUNCTION: CLEAR THE MESSAGE ELEMEBT, ADD hidden CLASS TO THE MODEL,  REMOVE flex CLASS FROM IT
  // message MUST BE A String
  hide() {
    this._messageEl.textContent = '';
    this._parentEl.classList.add('hidden');
    this._parentEl.classList.remove('flex');
  }

  // ADD HANDLER CLICK YES: CALL handler ON CLICK ON YES BUTTON
  // handler MUST BE A Function
  addHandlerClickYes(handler) {
    this._yesBtnEl.addEventListener('click', function () {
      handler();
    });
  }

  // ADD HANDLER CLICK NO: CALL handler ON CLICK ON NO BUTTON
  // handler MUST BE A Function
  addHandlerClickNo(handler) {
    this._noBtnEl.addEventListener('click', function () {
      handler();
    });
  }
}

export default new ModalView();
