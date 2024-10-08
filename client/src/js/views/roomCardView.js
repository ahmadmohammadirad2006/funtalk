import View from './View';

class RoomCardView extends View {
  // GENERATE MARKUP: RETURN THE HTML MARKUP OF A ROOM CARD FILLED WITH DATA FROM this._data
  _generateMarkup() {
    return `
     <div class="room-card">
            <div class="room-card-info">
              <h3 class="room-card-name">${this._data.name}</h3>
              <p class="room-card-description">
            ${this._data.description}
              </p>
            </div>
            <span class="room-card-emoji">${this._data.emoji}</span>
            <span class="room-card-users">${this._data.currentUsers.length}<span>👥</span></span>
            <a
              href="/rooms/${this._data._id}"
              class="btn btn--primary room-card-join-btn"
              >join</a
            >
          </div>
    `;
  }
}

export default new RoomCardView();
