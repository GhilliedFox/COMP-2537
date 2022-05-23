const path = require("path");

const express = require("express");
const config = require("config");

// Express Middleware
const morgan = require("morgan");
const session = require("express-session");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Routes
const viewsRouter = require("./routes/views");
const apiv1Router = require("./routes/apiv1");

const webRoot = path.join(__dirname, "..", "public");

// Creates a new express instance pre-loaded with middleware.
const createServer = () => {
  // Initialize an instance of express>
  const app = express();

  const secret =
    process.env.NODE_ENV === "production" ? config.get("secret") : "devsecret";

  // Inject middleware
  app.use(morgan("combined"));
  app.use(express.json());
  app.use(
    session({
      secret,
      resave: false,
      saveUninitialized: true,
      store: store,
      unset: "destroy",
      name: "session cookie name",
    })
  );

  // Configure view settings
  app.set("views", path.join(__dirname, "..", "public"));
  app.set("view engine", "ejs");

  // Expose all files in the webRoot directory
  app.use(express.static(webRoot));

  mongoose.connect(config.get("mongo.connectionString"));

  app.use("/", viewsRouter.router);
  app.use("/api/v1", apiv1Router.router);

  // testing stuff
  app.put("/shoppingCart/insert", function (req, res) {
    console.log(req.body);
    eventModel.create(
      {
        text: req.body.text,
        time: req.body.time,
        price: req.body.price,
      },
      function (err, data) {
        if (err) {
          console.log("Error " + err);
        } else {
          console.log("Data " + data);
        }
        res.send(data);
      }
    );
  });

  app.get("/shoppingCart/remove/:id", function (req, res) {
    eventModel.remove(
      {
        _id: req.params.id,
      },
      function (err, data) {
        if (err) {
          console.log("Error " + err);
        } else {
          console.log("Data " + data);
        }
        res.send("Delete is good!");
      }
    );
  });
  // leave this item alone
  return app;
};

module.exports = { createServer };
