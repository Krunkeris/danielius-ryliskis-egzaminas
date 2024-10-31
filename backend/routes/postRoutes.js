const express = require("express");

const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  likePost,
} = require("../controllers/postControllers");

const {
  authenticateUserRole,
  authenticateJwt,
} = require("../middleware/protectedRoutes.middleware");

const router = express.Router();

router.get("/", authenticateJwt, getAllPosts);

router.get("/:id", authenticateJwt, authenticateUserRole("user"), getPostById);

router.post("/", authenticateJwt, authenticateUserRole("user"), createPost);

router.put("/:id", authenticateJwt, updatePost);

router.put(
  "/:id/like",
  authenticateJwt,
  authenticateUserRole("user"),
  likePost
);

router.delete(
  "/:id",
  authenticateJwt,
  authenticateUserRole("user"),
  deletePost
);

module.exports = router;
