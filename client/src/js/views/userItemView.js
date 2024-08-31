import View from './View';

class UserItemView extends View {
  // GENERATE MARKUP: RETURN THE HTML MARKUP OF A ROOM CARD FILLED WITH DATA FROM this._data
  _generateMarkup() {
    const { user, currentUserId } = this._data;
    const isYou = user._id === currentUserId;
    if (isYou) {
      return `
             <li class="user-item">
            <span class="user-item-emoji">${user.emoji}</span>
            <span class="user-item-name">${user.name}</span>
            <span class="user-item-you">you</span>
          </li>
        `;
    }

    return `
         <li class="user-item">
            <span class="user-item-emoji">${user.emoji}</span>
            <span class="user-item-name">${user.name}</span>
          </li>
    `;
  }
}

export default new UserItemView();
