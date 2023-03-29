/**
 * @file models/user.js
 * @desc the Schema and model for the users.
 */
import bcrypt from "bcrypt";
import { model, Schema } from "mongoose";
import config from "../../config.js";
import { encodeToken, handleError } from "../../utils.js";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Must use a valid email address"],
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      unique: false,
    },
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// has a user password
UserSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, config.saltRounds);
  }
  next();
});

// custom method to compare and validate password for logging in
UserSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.methods.authenticate = async function (password) {
  // 'this' references the document (user) that called this method
  const isCorrectPassword = await bcrypt.compare(password, this.password);

  if (!isCorrectPassword) {
    // ⚠️ Don't reveal specifics about why authentication failed 🦉
    handleError(new Error("Invalid credentials."), "UNAUTHORIZED");
  }

  return encodeToken({
    username: this.username,
    id: this._id,
  });
};

const User = model("User", UserSchema);

export { UserSchema, User };
