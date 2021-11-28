module.exports = (app) => {
  const express = require("express");
  const User = require("../controller/user.controll");

  const router = express.Router();

  router.post("/users", User.signUp);

  router.post("/auth", User.signIn);

  app.use("/api", router);
};
