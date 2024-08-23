import View from './View';
import roomCardView from './roomCardView';

class RoomsView extends View {
  _parentElement = document.getElementById('roomsContainer');
  _errorMessage = 'No room was found';

  _generateMarkup() {
    return this._data
      .map((room) => {
        return roomCardView.render(room, false);
      })
      .join('');
  }
}

export default new RoomsView();
