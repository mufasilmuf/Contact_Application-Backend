const express = require("express");
const mongoose = require("mongoose");

const app = express();

//middleware to acces the data from body.......
app.use(express.json());

//connect to database...called a immediate invoked function
(async function () {
  const db = require("./models");
  let Client;

  try {
    Client = await db.mongoose.connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Data base connected successfully!");
  } catch (err) {
    console.log("Can not connect to db " + err);
  }
})();

//simple routes..........
app.get("/", (req, res) => {
  res
    .status(200)
    .send({ message: "Welcome to phone application developement" });
});

//routes for users...
require("./routes/user.routes")(app);

//routes for contacts....
require("./routes/contact.routes")(app);

const PORT = process.env.PORT || 8085;

//app listen....
app.listen(PORT, () => {
  console.log(`Application on running on the Port Number ${PORT}`);
});
