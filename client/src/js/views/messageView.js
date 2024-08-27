import View from './View';

class MessageView extends View {
  // GENERATE MARKUP FUNCTION: RETURN MARKUP OF A MESSAGE FILLED WITH this._data.message
  _generateMarkup() {
    const { message, currentUserId } = this._data;
    const isYourMessage = message.user._id === currentUserId ? true : false;
    return `
              <div class="message message--${isYourMessage ? 'right' : 'left'}">
            <div class="message-sender-emoji">${message.user.emoji}</div>
            <div class="message-info">
              <span class="message-sender">${
                isYourMessage ? 'You' : message.user.name
              }:</span>
              <div class="message-body">
           ${message.content}
              </div>
              <div class="message-date">${new Intl.DateTimeFormat(
                navigator.language,
                {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                }
              ).format(Date.parse(message.createdAt))}</div>
            </div>
          </div>
    
    `;
  }
}

export default new MessageView();
