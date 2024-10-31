const express = require("express");

const {
  authenticateUserRole,
} = require("../middleware/protectedRoutes.middleware");
const {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryControllers");

const router = express.Router();

router.get("/", getCategories);

router.get("/:id", authenticateUserRole("admin"), getCategoryById);

router.post("/", authenticateUserRole("admin"), createCategory);

router.put("/:id", authenticateUserRole("admin"), updateCategory);

router.delete("/:id", authenticateUserRole("admin"), deleteCategory);

module.exports = router;
