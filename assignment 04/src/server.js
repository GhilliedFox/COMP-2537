const path = require("path");

const express = require("express");
const config = require("config");

// Express Middleware
const morgan = require("morgan");
const session = require("express-session");
const mongoose = require("mongoose");

// Routes
const viewsRouter = require("./routes/views");
const apiv1Router = require("./routes/apiv1");
const proxyRouter = require("./routes/proxy");

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
    })
  );

  // Configure view settings
  app.set("views", path.join(__dirname, "..", "public"));
  app.set("view engine", "ejs");

  // Expose all files in the webRoot directory
  app.use(express.static(webRoot));

  mongoose.connect(config.get("mongo.connectionString"));

  app.use("/", viewsRouter.router);
  app.use("/proxy", proxyRouter.router);
  app.use("/api/v1", apiv1Router.router);

  app.get("*", function (req, res) {
    res.render("pages/error/error.ejs");
  });

  return app;
};

module.exports = { createServer };
