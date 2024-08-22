class ProfileView {
  _parentElement = document.querySelector('.profile-container');
  _nameEl = document.querySelector('.profile-name');
  _emojiEl = document.querySelector('.profile-emoji');

  show(data) {
    this._parentElement.classList.remove('hidden');
    this._nameEl.textContent = data.name;
    this._emojiEl.textContent = data.emoji;
  }

  hideLoginSignUpContainer() {
    document.getElementById('loginSignUpContainer')?.classList.add('hidden');
  }
}

export default new ProfileView();
