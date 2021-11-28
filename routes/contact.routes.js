module.exports = (app) => {
  const express = require("express");
  const contact = require("../controller/contact.controll");

  const router = express.Router();

  router.get("/", contact.AllContact);

  router.post("/", contact.AddContact);

  router.put("/:Id", contact.UpdateContact);

  router.delete("/:Id", contact.DeleteContact);

  app.use("/api/contact", router);
};
