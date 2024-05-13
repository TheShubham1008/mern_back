const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin-controller");
const authMiddleWare = require("../middlewares/auth-middleware");
const adminMiddleware = require("../middlewares/admin-middleware");

router
  .route("/users")
  .get(authMiddleWare, adminMiddleware, adminController.getAllUsers);
router
  .route("/users/:id")
  .get(authMiddleWare, adminMiddleware, adminController.getUserById);
router
  .route("/users/update/:id")
  .patch(authMiddleWare, adminMiddleware, adminController.updateUserById);

router
  .route("/users/delete/:id")
  .delete(authMiddleWare, adminMiddleware, adminController.deleteUserById);
router
  .route("/contacts")
  .get(authMiddleWare, adminMiddleware, adminController.getAllContacts);

module.exports = router;
