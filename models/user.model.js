module.exports = (mongoose) => {
  const user = mongoose.model(
    "users",
    mongoose.Schema(
      {
        firstname: { type: String, require: true },
        lastname: { type: String, require: true },
        email: { type: String, require: true },
        contactnumber: { type: Number, require: true },
        password: { type: String, require: true },
      },
      { timestaps: true }
    )
  );
  return user;
};
