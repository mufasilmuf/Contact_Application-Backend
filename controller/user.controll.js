const db = require("../models");
const User = db.users;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signUp = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      res.status(400).send({ message: "Email is already exists" });
    } else {
      const Password = await bcrypt.hash(req.body.password, 10);

      const newUser = await new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        contactnumber: req.body.contactnumber,
        password: Password,
      });

      newUser
        .save()
        .then((data) => {
          res.status(200).send({ status: "OK", message: data });
        })
        .catch((err) => {
          res.status(404).send({ status: "ERROR", message: err });
        });
    }
  } catch (err) {
    res.status(500).send({ message: "Some Internal Please try again" });
  }
};

exports.signIn = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(403).send({ message: "This email has not been registered!" });
    }
    const isPasswordValidation = bcrypt.compare(
      req.body.password,
      user.password
    );
    if (isPasswordValidation) {
      const token = jwt.sign({ email: user.email }, "save100", {
        expiresIn: "24h",
      });
      res
        .status(200)
        .send({ status: "OK", isAuthentication: true, token: token });
    } else {
      res.status(401).json({ message: "Invalid Credentials!" });
    }
  } catch (err) {
    res.status(500).send({ message: "Some Internal Please try again" });
  }
};
