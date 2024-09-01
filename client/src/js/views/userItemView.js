import View from './View';

class UserItemView extends View {
  // GENERATE MARKUP: RETURN THE HTML MARKUP OF A ROOM CARD FILLED WITH DATA FROM this._data
  _generateMarkup() {
    const { user, currentUserId } = this._data;
    const isYou = user._id === currentUserId;
    return `
         <li class="user-item">
            <span class="user-item-emoji">${user.emoji}</span>
            <span class="user-item-name">${user.name}</span>
            ${isYou ? '<span class="user-item-you">you</span>' : ''}
            </li>
    `;
  }
}

export default new UserItemView();
