import View from './View';

class ProfileView extends View {
  _parentEl = document.querySelector('.profile-container');
  _nameEl = document.querySelector('.profile-name');
  _emojiEl = document.querySelector('.profile-emoji');
  _logOutBtnEl = document.querySelector('.profile-logout-btn');

  // SHOW FUNCTION: REMOVE hidden CLASS FROM PROFILE CONTAINER, DISPLAY data.name And data.emoji
  // data MUST BE AN Object
  show(data) {
    this._parentEl.classList.remove('hidden');
    this._nameEl.textContent = data.name;
    this._emojiEl.textContent = data.emoji;
  }

  // ADD HANDLER CLICK LOG OUT: CALL A FUNCTION ON CLICK ON LOG OUT BUTTON
  // hanlder MUST BE A Function
  addHandlerClickLogOut(handler) {
    this._logOutBtnEl.addEventListener('click', function () {
      handler();
    });
  }
}

export default new ProfileView();
