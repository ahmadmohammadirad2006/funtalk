export default class View {
  _data;

  // ADD HANDLER INIT: CALL handler IMMEDIATELY
  // handler MUST BE A FUNCTION
  addHandlerInit(handler) {
    handler();
  }

  // RENDER: STORE GIVEN data IN this._data IF TEHERE IS NO data OR IT'S AN EMPTRY Array CALL this.renderError(), CALL this._genereateMarkup() TO GET MARKUP OF CURRENT this._data, IF render IS false RETURN  MARKUP OTHERWISE CLEAR this._parentEL AND RENDER MARKUP IN IT
  // data MUST BE Object
  // render MUST BE Boolean (OPTIONAL)
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();
    if (!render) return markup;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  // RENDER ERROR: CLEAR this._parentEl DISPLAY GIVEN message IN IT
  // message MUST BE A String (OPTIONAL)
  renderError(message = this._errorMessage) {
    const markup = `
    <div class="error">
    <span>🙊</span>
    <p>${message}</p>
 <span>🙊</span>
  </div>
    `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  // RENDER ERROR: CLEAR this._parentEl DISPLAY SPINNER IN IT
  renderSpinner() {
    const markup = ` 
          <div class="spinner">⭐</div>`;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  // CLEAR: CLEAR this._parentEl
  _clear() {
    this._parentEl.innerHTML = '';
  }
}
