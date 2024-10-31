const jwt = require("jsonwebtoken");

const verifyJwt = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.log(`Invalid token:${error}`);
    return null;
  }
};

module.exports = verifyJwt;
