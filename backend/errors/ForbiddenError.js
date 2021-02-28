class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403; // means user not allowed to delete other user's cards
  }
}

module.exports = ForbiddenError;
