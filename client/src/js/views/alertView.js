import View from './View';
class AlertView extends View {
  _parentElement = document.getElementById('alert');

  show(data) {
    this.hide();
    this._parentElement.textContent = data.msg;
    if (data.error) {
      this._parentElement.classList.add('alert--error');
    }
    this._parentElement.classList.remove('hidden');

    setTimeout(() => {
      this.hide();
    }, data.stayForMs);
  }

  hide() {
    this._clear();
    this._parentElement.classList.remove('alert--error');
    this._parentElement.classList.add('hidden');
  }
}

export default new AlertView();
