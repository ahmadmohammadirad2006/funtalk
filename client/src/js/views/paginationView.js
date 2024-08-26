import View from './View';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');

  // ADD HANDLER CLICK: CALL handler WHEN CLICK ON ON OF BUTTONS WITH THE PAGE NUMBER
  // hanlder MUST BE A Function
  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.pagination-btn');
      if (!btn) return;
      handler(+btn.dataset.goto);
    });
  }

  // GENERATE MARKUP: RETURN MARKUP OF PREV AND NEXT BUTTONs AND PAGE NUMBER FILLED WITH this._data
  _generateMarkup() {
    const curPage = this._data.page;
    const allPagesNum = Math.ceil(
      this._data.searchResutls.length / this._data.resultsPerPage
    );
    return `  
              <button class="pagination-btn" ${curPage === 1 ? 'disabled' : ''} 
              data-goto="${curPage - 1}"
              
              >⏪</button>
          <span class="pagination-page-num">${curPage}</span>
          <button class="pagination-btn"         ${
            allPagesNum === curPage || allPagesNum === 0 ? 'disabled' : ''
          } 
          data-goto="${curPage + 1}"
                         >⏩</button>
    
    `;
  }
}

export default new PaginationView();
