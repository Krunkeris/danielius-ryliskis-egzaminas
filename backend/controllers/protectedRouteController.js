const protectedRouteToUserHome = (req, res) => {
  res.json("acces to /userHome granted");
};

const protectedRouteToAdminHome = (req, res) => {
  res.json("acces to /adminHome granted");
};

const protectedRouteToHome = (req, res) => {
  res.json("acces to /home granted");
};

module.exports = {
  protectedRouteToUserHome,
  protectedRouteToAdminHome,
  protectedRouteToHome,
};
