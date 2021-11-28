module.exports = (mongoose) => {
  const contacts = mongoose.model(
    "contact",
    mongoose.Schema(
      {
        id: { type: String, require: true },
        firstname: { type: String, require: true },
        lastname: { type: String, require: true },
        contactnumber: { type: Number, require: true },
        email: { type: String, require: false },
        organization: { type: String, require: false },
        home: { type: String, require: false },
      },
      { timestaps: true }
    )
  );
  return contacts;
};
