class EmailIsExist extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}

module.exports = EmailIsExist;
