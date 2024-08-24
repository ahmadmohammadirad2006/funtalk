import View from './View';

class AlertView extends View {
  _parentEl = document.getElementById('alert');

  // SHOW FUNCTION: FIRST CALL THE this.hide TO MAKE SUER THAT THERE IS NO ALERT ALREADY, SHOW THE ALERT ELELMENT WITH THE GIVEN MESSAGE , IF THE ERROR PROP IS true THE BG OF THE ALERT BECOMES RED , THE ALERT STAYS for data.stayForMs MILLISECONDS
  // data MUST BE AN OBJECT: {msg : String, error: true OR false , stayForMs: time in ms }
  show(data) {
    this.hide();
    this._parentEl.textContent = data.msg;
    if (data.error) {
      this._parentEl.classList.add('alert--error');
    }
    this._parentEl.classList.remove('hidden');
    setTimeout(() => {
      this.hide();
    }, data.stayForMs);
  }

  // HIDE FUNCTION: CLEAR THE PARENT ELEMENT, REMOVE THE alert--error CLASS ON PARENT ELEMNT, HIDE THE PARENT ELEMENT
  hide() {
    this._clear();
    this._parentEl.classList.remove('alert--error');
    this._parentEl.classList.add('hidden');
  }
}

export default new AlertView();
