const express = require("express");

// Controllers
const HomeController = require("../controllers/home.controller");
const UserController = require("../controllers/user.controller");
const FormController = require("../controllers/form.controller");
const MemoryGameController = require("../controllers/memorygame.controller");

const {
  requireAuthentication,
} = require("../middleware/requireAuthentication");
const { requireRole } = require("../middleware/requireRole");

const router = express.Router();

router.get("/", requireAuthentication, HomeController.renderHomePage);
router.get("/register", UserController.renderRegistrationPage);
router.get("/login", UserController.renderLoginPage);
router.get(
  "/admin",
  requireAuthentication,
  requireRole("admin"),
  UserController.renderAdminPage
);
router.get(
  "/memory-game",
  requireAuthentication,
  MemoryGameController.renderMemoryGamePage
);

module.exports = { router };
