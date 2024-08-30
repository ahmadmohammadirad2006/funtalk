import View from './View';

class SendMessageView extends View {
  _sendInpEl = document.getElementById('sendInp');
  _sendBtnEl = document.getElementById('sendBtn');

  // ADD HANDLER CLICK SEND: CALL handler WITH THE VALUE OF this._sendInpEl WHEN CLICK ON _sendBtnEl
  addHandlerClickSend(handler) {
    this._sendBtnEl.addEventListener(
      'click',
      function () {
        if (this._sendInpEl.value.length > 0) {
          handler(this._sendInpEl.value);
          this._clearSendInput();
        }
      }.bind(this)
    );
  }

  // CLEAR SEND INPUT FUNCTION
  _clearSendInput() {
    this._sendInpEl.value = '';
  }
}

export default new SendMessageView();
