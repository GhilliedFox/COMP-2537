const { userCart } = require("../models/shoppingCart.model");
const { UserModel } = require("../models/user.model");

const renderShoppingCartPage = (req, res) => {
  res.render("pages/shopping/shoppingCart.ejs");
};

const shoppingCart = async (req, res) => {
  const { price } = req.body;

  const CartSchema = new mongoose.Schemas({
    price: price,
    roles: ["member"],
  });

  await user.save();

  res.status(200).json({
    success: true,
    msg: "cart successfully created.",
    roles: ["member"],
  });
};

module.exports = { renderShoppingCartPage, shoppingCart };
