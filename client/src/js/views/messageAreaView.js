import messageView from './messageView';
import View from './View';

class MessageAreaView extends View {
  _parentEl = document.getElementById('messageArea');
  _errorMessage = 'No messages';

  // SCROLL TO END FUNCTION: GO TO THE LAST MESSAGE OF THE MSSAGE AREA
  scrollToEnd() {
    this._parentEl.scrollTop = this._parentEl.scrollHeight;
  }
  // GENERATE MARKUP: RETURN MARKUP OF ALL MESSAGES FILLED WITH this._data.messages
  _generateMarkup() {
    return this._data.messages
      .map((message) =>
        messageView.render(
          {
            message: message,
            currentUserId: this._data.currentUserId,
          },
          false
        )
      )
      .join('');
  }
}

export default new MessageAreaView();
