import View from './View';

class SearchView extends View {
  _searchInp = document.getElementById('searchInp');
  _searchBtn = document.getElementById('searchBtn');

  addHandlerClickSearch(handler) {
    this._searchBtn.addEventListener(
      'click',
      function () {
        handler(this._searchInp.value);
      }.bind(this)
    );
    document.addEventListener(
      'keydown',
      function (e) {
        if (e.key === 'Enter' && document.activeElement === this._searchInp) {
          handler(this._searchInp.value);
        }
      }.bind(this)
    );
  }
}

export default new SearchView();
