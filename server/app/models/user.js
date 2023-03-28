/**
 * @file models/user.js
 * @desc the Schema and model for the users.
 */
import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new Schema(
  {
    username: {
      type:     String,
      required: true,
      unique:   true,
    },
    email: {
      type:     String,
      required: true,
      unique:   true,
      match:    [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type:     String,
      required: true,
    },
    role:{
      type:     String,
      required: true,
      unique:   false,
    }
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// has a user password
UserSchema.pre('save', async function(next) {
  if(this.isNew || this.isModified('password')){
    const saltRounds = 10;                        // TODO: Replace this with a variable in a .env file
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

// custom method to compare and validate password for logging in
UserSchema.methods.isCorrectPassword = async function (password){
  return bcrypt.compare(password, this.password);
}

const UserModel = model('User', UserSchema);

export { UserSchema, UserModel };
