const express = require("express");

const {
  getAllUsers,
  blockOrUnblockUser,
} = require("../controllers/usersController");

const {
  authenticateJwt,
  authenticateUserRole,
  authenticateUserStatus,
} = require("../middleware/protectedRoutes.middleware");

const router = express.Router();

router.get("/", authenticateJwt, authenticateUserStatus, getAllUsers);

router.post(
  "/:id",
  authenticateJwt,
  authenticateUserRole("admin"),
  blockOrUnblockUser
);

module.exports = router;
