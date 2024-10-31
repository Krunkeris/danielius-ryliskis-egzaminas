const express = require("express");
const {
  authenticateJwt,
  authenticateUserRole,
  authenticateUserStatus,
} = require("../middleware/protectedRoutes.middleware");

const {
  protectedRouteToUserHome,
  protectedRouteToAdminHome,
  protectedRouteToHome,
} = require("../controllers/protectedRouteController");

const router = express.Router();

router.get(
  "/userHome",
  authenticateJwt,
  authenticateUserRole("user"),
  authenticateUserStatus,
  protectedRouteToUserHome
);

router.get(
  "/adminHome",
  authenticateJwt,
  authenticateUserRole("admin"),
  authenticateUserStatus,
  protectedRouteToAdminHome
);

router.get("/home", authenticateJwt, protectedRouteToHome);

module.exports = router;
