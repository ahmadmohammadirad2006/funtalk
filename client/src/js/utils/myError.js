export default class MyError extends Error {
  constructor(message, data) {
    super(message);
    this.data = data;
  }
}
