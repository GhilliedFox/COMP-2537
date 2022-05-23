const express = require("express");

// Controllers
const UserController = require("../controllers/user.controller");
const ShoppingCartController = require("../controllers/shoppingCart.controller");

const router = express.Router();

// All of these routes are prepended by /api/v1
// For example, if you want to fetch all reports
// You would query the "/api/v1/report" GET endpoint

// shopping
router.post("/cart/shoppingCart", ShoppingCartController.shoppingCart);
// User
router.get("/user", UserController.fetchAllAccounts);
router.get("/user/id/:id", UserController.fetchUserById);
router.get("/user/logout", UserController.logout);
router.post("/user/login", UserController.login);
router.post("/user/register", UserController.register);

module.exports = { router };
