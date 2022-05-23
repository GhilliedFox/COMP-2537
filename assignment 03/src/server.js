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
  app.get("/", (req, res) => {
    if (!req.session.cart) {
      req.session.cart = {
        items: [],
        totals: 0.0,
        formattedTotals: "",
      };
    }
    Products.find({ price: { $gt: 0 } })
      .sort({ price: -1 })
      .limit(6)
      .then((products) => {
        let format = new Intl.NumberFormat(req.app.locals.locale.lang, {
          style: "currency",
          currency: req.app.locals.locale.currency,
        });
        products.forEach((product) => {
          product.formattedPrice = format.format(product.price);
        });
        res.render("index", {
          pageTitle: "Node.js Shopping Cart",
          products: products,
          nonce: Security.md5(req.sessionID + req.headers["user-agent"]),
        });
      })
      .catch((err) => {
        res.status(400).send("Bad request");
      });
  });

  app.get("/cart", (req, res) => {
    let sess = req.session;
    let cart = typeof sess.cart !== "undefined" ? sess.cart : false;
    res.render("cart", {
      pageTitle: "Cart",
      cart: cart,
      nonce: Security.md5(req.sessionID + req.headers["user-agent"]),
    });
  });

  app.get("/cart/remove/:id/:nonce", (req, res) => {
    let id = req.params.id;
    if (/^\d+$/.test(id) && Security.isValidNonce(req.params.nonce, req)) {
      Cart.removeFromCart(parseInt(id, 10), req.session.cart);
      res.redirect("/cart");
    } else {
      res.redirect("/");
    }
  });

  app.get("/cart/empty/:nonce", (req, res) => {
    if (Security.isValidNonce(req.params.nonce, req)) {
      Cart.emptyCart(req);
      res.redirect("/cart");
    } else {
      res.redirect("/");
    }
  });

  app.post("/cart", (req, res) => {
    let qty = parseInt(req.body.qty, 10);
    let product = parseInt(req.body.product_id, 10);
    if (qty > 0 && Security.isValidNonce(req.body.nonce, req)) {
      Products.findOne({ product_id: product })
        .then((prod) => {
          let cart = req.session.cart ? req.session.cart : null;
          Cart.addToCart(prod, qty, cart);
          res.redirect("/cart");
        })
        .catch((err) => {
          res.redirect("/");
        });
    } else {
      res.redirect("/");
    }
  });

  app.post("/cart/update", (req, res) => {
    let ids = req.body["product_id[]"];
    let qtys = req.body["qty[]"];
    if (Security.isValidNonce(req.body.nonce, req)) {
      let cart = req.session.cart ? req.session.cart : null;
      let i = !Array.isArray(ids) ? [ids] : ids;
      let q = !Array.isArray(qtys) ? [qtys] : qtys;
      Cart.updateCart(i, q, cart);
      res.redirect("/cart");
    } else {
      res.redirect("/");
    }
  });

  app.get("/checkout", (req, res) => {
    let sess = req.session;
    let cart = typeof sess.cart !== "undefined" ? sess.cart : false;
    res.render("checkout", {
      pageTitle: "Checkout",
      cart: cart,
      checkoutDone: false,
      nonce: Security.md5(req.sessionID + req.headers["user-agent"]),
    });
  });

  app.post("/checkout", (req, res) => {
    let sess = req.session;
    let cart = typeof sess.cart !== "undefined" ? sess.cart : false;
    if (Security.isValidNonce(req.body.nonce, req)) {
      res.render("checkout", {
        pageTitle: "Checkout",
        cart: cart,
        checkoutDone: true,
      });
    } else {
      res.redirect("/");
    }
  });

  if (app.get("env") === "development") {
    app.use((err, req, res, next) => {
      res.status(err.status || 500);
    });
  }

  app.use((err, req, res, next) => {
    res.status(err.status || 500);
  });
  // leave this item alone
  return app;
};

module.exports = { createServer };
