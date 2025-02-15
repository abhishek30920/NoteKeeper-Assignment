require('dotenv').config();
const config = {
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiration: process.env.JWT_EXPIRATION,
};
console.log(config);
module.exports = config;

