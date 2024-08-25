import View from './View';

class AuthContainerView extends View {
  _parentEl = document.getElementById('authContainer');
  _authMenuBtnEl = document.getElementById('authMenuBtn');
  _authBtnsContainerEl = document.getElementById('authBtnsContainer');
  _authCloseBtnEl = document.getElementById('authCloseBtn');

  init() {
    this.addHandlerClickAuthMenu(this._showAuthBtnsContainerEl.bind(this));
    this.addHandlerClickClose(this._hideAuthBtnsContainerEl.bind(this));
  }

  _showAuthBtnsContainerEl() {
    this._authBtnsContainerEl.classList.remove('hidden');
    this._authBtnsContainerEl.classList.add('flex');
  }

  _hideAuthBtnsContainerEl() {
    this._authBtnsContainerEl.classList.remove('flex');
    this._authBtnsContainerEl.classList.add('hidden');
  }

  hide() {
    this._parentEl?.classList?.add('hidden');
  }

  addHandlerClickClose(handler) {
    this._authCloseBtnEl.addEventListener('click', function () {
      handler();
    });
  }

  addHandlerClickAuthMenu(handler) {
    this._authMenuBtnEl.addEventListener('click', function () {
      handler();
    });
  }
}

export default new AuthContainerView();
