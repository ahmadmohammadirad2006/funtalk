import View from './View';
import userItemView from './userItemView';

class UserListView extends View {
  _parentEl = document.getElementById('usersList');
  _errorMessage = 'No user was found';

  // GENERATE MARKUP: RETURN THE HTML MARKUP OF ALL THE CARD ROOMS FILLED WITH DATA FROM this._data
  _generateMarkup() {
    return this._data.users
      .map((user, i) => {
        if (i !== 0 && user._id === this._data.currentUserId) return '';
        return userItemView.render(
          { user, currentUserId: this._data.currentUserId },
          false
        );
      })
      .join('');
  }
}

export default new UserListView();
