const db = require("../models");
const Contact = db.contact;
const jwt = require("jsonwebtoken");
const User = db.users;

exports.AllContact = async (req, res) => {
  const token = req.headers.authorization;

  try {
    const decode = await jwt.verify(token, "save100");
    const user = await User.findOne({ email: decode.email });

    if (!user) {
      res
        .status(403)
        .send({ message: "You are not authorized to access this endpoint!" });
    }

    if (user) {
      Contact.find({ id: user.id })
        .then((data) => {
          res.status(200).send({ status: "OK", data: data });
        })
        .catch((err) => {
          res.status(400).send({ status: "ERROR" });
        });
    }
  } catch (err) {
    res
      .status(500)
      .send({ message: "Please Login first to access this endpoint!" });
  }
};

exports.AddContact = async (req, res) => {
  const token = req.headers.authorization;

  try {
    const decode = await jwt.verify(token, "save100");
    const user = await User.findOne({ email: decode.email });

    if (!user) {
      res
        .status(403)
        .json({ message: "You are not authorized to access this endpoint!" });
    }

    if (user) {
      const Id = await user._id;

      const newContact = await new Contact({
        id: Id,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        contactnumber: req.body.contactnumber,
        email: req.body.email,
        organization: req.body.organization,
        home: req.body.home,
      });

      newContact
        .save()
        .then((data) => {
          res
            .status(200)
            .send({ status: "OK", message: "Contact Created Successfully!" });
        })
        .catch((err) => {
          res.status(400).send({ status: "ERROR", message: err });
        });
    }
  } catch (err) {
    res
      .status(500)
      .send({ message: "Please Login first to access this endpoint!" });
  }
};

exports.UpdateContact = async (req, res) => {
  const token = req.headers.authorization;

  try {
    const decode = await jwt.verify(token, "save100");
    const user = await User.findOne({ email: decode.email });

    if (!user) {
      res
        .status(403)
        .json({ message: "You are not authorized to access this endpoint!" });
    }

    if (user) {
      const updateContact = await Contact.updateOne(
        { _id: req.params.Id },
        {
          $set: {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            contactnumber: req.body.contactnumber,
            email: req.body.email,
            organization: req.body.organization,
            home: req.body.home,
          },
        }
      )
        .then((updateContact) => {
          res.status(200).send({
            status: "OK",
            message: "Contact Updated Successfully",
            data: updateContact,
          });
        })
        .catch((err) => {
          res.status(400).send({ status: "ERROR", message: err });
        });
    }
  } catch (err) {
    res
      .status(500)
      .send({ message: "Please Login first to access this endpoint!" });
  }
};

exports.DeleteContact = async (req, res) => {
  const token = req.headers.authorization;

  try {
    const decode = await jwt.verify(token, "save100");
    const user = await User.findOne({ email: decode.email });

    if (!user) {
      res
        .status(403)
        .json({ message: "You are not authorized to access this endpoint!" });
    }

    if (user) {
      const Id = await req.params.Id;
      Contact.deleteOne({ _id: Id })
        .then((deleteContact) => {
          res.status(200).send({
            status: "OK",
            message: "Deleted Successfully!",
            data: deleteContact,
          });
        })
        .catch((err) => {
          res.status(400).send({ status: "ERROR", message: err });
        });
    }
  } catch (err) {
    res
      .status(500)
      .send({ message: "Please Login first to access this endpoint!" });
  }
};
