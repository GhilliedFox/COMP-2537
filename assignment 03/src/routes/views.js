const express = require("express");

// Controllers
const HomeController = require("../controllers/home.controller");
const UserController = require("../controllers/user.controller");
const ShoppingController = require("../controllers/shopping.controller");
const ShoppingCartController = require("../controllers/shoppingCart.controller");

const router = express.Router();

router.get("/", HomeController.renderHomePage);
router.get("/register", UserController.renderRegistrationPage);
router.get("/login", UserController.renderLoginPage);
router.get("/shopping", ShoppingController.renderShoppingPage);
router.get("/shoppingCart", ShoppingCartController.renderShoppingCartPage);
module.exports = { router };
