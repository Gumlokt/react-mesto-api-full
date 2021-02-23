class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409; // means user already exists
  }
}

module.exports = ConflictError;
