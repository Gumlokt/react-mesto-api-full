const config = {
  DEFAULT_PORT: 3000, // set to 4000 for development purposes
  SECRET_KEY: 'MY-SECRET-KEY',
  SECRET_TTL: '7d',
  allowedCors: [
    // 'http://localhost:3000',
    'http://178.154.226.175',
    'http://gumlokt.students.nomoredomains.icu',
    'http://www.gumlokt.students.nomoredomains.icu',
    'https://gumlokt.students.nomoredomains.icu',
    'https://www.gumlokt.students.nomoredomains.icu',
  ],
};

module.exports = config;
