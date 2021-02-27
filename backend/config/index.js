const config = {
  DEFAULT_PORT: 3000, // set to 4000 for development purposes
  SECRET_KEY: 'MY-SECRET-KEY',
  SECRET_TTL: '7d',
  allowedCors: [
    'http://gumlokt.students.nomoreparties.space',
    'http://www.gumlokt.students.nomoreparties.space',
    'https://gumlokt.students.nomoreparties.space',
    'https://www.gumlokt.students.nomoreparties.space',
  ],
};

module.exports = config;
