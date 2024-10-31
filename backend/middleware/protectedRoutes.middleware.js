const verifyJwt = require("../jsonwebtoken/verifyJwt");

const authenticateJwt = (req, res, next) => {
  const token = req.cookies.token;

  console.log("Token from cookie:", token);

  if (!token) {
    return res
      .status(401)
      .json({ message: "Token is missing. Unauthorized access" });
  }

  const decoded = verifyJwt(token);

  if (!decoded) {
    return res
      .status(401)
      .json({ message: "Invalid token. Unauthorized access" });
  }

  req.user = decoded;
  console.log("Decoded user:", req.user);
  next();
};

const authenticateUserRole = (requiredRole) => (req, res, next) => {
  const token = req.cookies.token;
  console.log(token);
  if (!token) {
    return res
      .status(401)
      .json({ message: "Token is missing. Unauthorized access" });
  }

  const decoded = verifyJwt(token);

  console.log(decoded.role);
  if (!decoded) {
    return res
      .status(401)
      .json({ message: "Invalid token. Unauthorized access" });
  }

  const role = decoded.role;

  if (role !== requiredRole) {
    return res
      .status(403)
      .json({ message: `Role is: ${role}, should be: "${requiredRole}"` });
  }

  console.log(`Role is: ${role}`);
  next();
};

const authenticateUserStatus = (req, res, next) => {
  const token = req.cookies.token;
  console.log(token);
  if (!token) {
    return res
      .status(401)
      .json({ message: "Token is missing. Unauthorized access" });
  }

  const decoded = verifyJwt(token);

  console.log(decoded.status);
  if (!decoded) {
    return res
      .status(401)
      .json({ message: "Invalid token. Unauthorized access" });
  }

  const status = decoded.status;

  if (status !== "accepted") {
    return res
      .status(403)
      .json({ message: `Status is: ${status}, should be: "Accepted"` });
  }

  console.log(`Status is: ${status}`);
  next();
};

module.exports = {
  authenticateJwt,
  authenticateUserRole,
  authenticateUserStatus,
};
