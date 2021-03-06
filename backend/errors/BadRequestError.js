class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400; // means invalid ID
  }
}

module.exports = BadRequestError;
