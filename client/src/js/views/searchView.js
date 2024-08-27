import View from './View';

class SearchView extends View {
  _searchInpEl = document.getElementById('searchInp');
  _searchBtnEl = document.getElementById('searchBtn');

  // ADD HANDLER CLICK SEARCH: CALL handler WHEN USER CLICKS ON SEARCH BUTTON OR CLICK ENTER WHILE FOCUS ON SEARCH INPUT
  // handler MUST BE A String
  addHandlerClickSearch(handler) {
    this._searchBtnEl.addEventListener(
      'click',
      function () {
        handler(this._searchInpEl.value);
      }.bind(this)
    );
    document.addEventListener(
      'keydown',
      function (e) {
        if (e.key === 'Enter' && document.activeElement === this._searchInpEl) {
          handler(this._searchInpEl.value);
        }
      }.bind(this)
    );
  }
}

export default new SearchView();
