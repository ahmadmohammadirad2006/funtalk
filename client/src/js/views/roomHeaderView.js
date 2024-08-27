import View from './View';

class RoomHeaderView extends View {
  _parentEl = document.getElementById('roomHeader');
  _roomNameEl = document.getElementById('roomName');

  // SHOW ROOM NAME FUNCTION: DISPLALY GIVEN name IN this._roomNameEl
  // name MUST BE A String
  showRoomName(name) {
    this._roomNameEl.textContent = name;
  }
}

export default new RoomHeaderView();
