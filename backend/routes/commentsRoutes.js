const express = require("express");
const { authenticateJwt } = require("../middleware/protectedRoutes.middleware");
const {
  getAllComments,
  getCommentByPostsId,
  createComment,
  deleteComment,
  updateComment,
} = require("../controllers/commentsControllers");

const router = express.Router();

router.get("/", authenticateJwt, getAllComments);

router.get("/:postsId", authenticateJwt, getCommentByPostsId);

router.post("/", authenticateJwt, createComment);

router.delete("/:id", authenticateJwt, deleteComment);

router.put("/:id", authenticateJwt, updateComment);

module.exports = router;
