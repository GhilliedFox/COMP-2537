const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  email: String,
  password: String,
  lastLogin: String,
});

const UserModel = model("user", userSchema);

module.exports = { UserModel };
