import View from './View';
import roomCardView from './roomCardView';

class RoomsView extends View {
  _parentEl = document.getElementById('roomsContainer');
  _errorMessage = 'No room was found';

  // GENERATE MARKUP: RETURN THE HTML MARKUP OF ALL THE CARD ROOMS FILLED WITH DATA FROM this._data
  _generateMarkup() {
    return this._data
      .map((room) => {
        return roomCardView.render(room, false);
      })
      .join('');
  }
}

export default new RoomsView();
