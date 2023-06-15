const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: false,
    trim: true,
    minlength: 3,
  },
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    unique: true,
  },
  isVerified: {
    type: Boolean,
    required: true,
  },
  otp: {
    type: Number,
    required: false,
    trim: true,
  },
  password: {
    type: String,
    required: false,
    trim: true,
  },
  about: {
    type: String,
    required: false,
    unique: false,
  },
  // publications: {
  //     type:Array
  // }
});

userSchema.method.comparePassword = async(candidatePassword)=>{
  const isMatch = await bcrypt.compare(candidatePassword,this.password);
  return isMatch;
}

const User = mongoose.model("User", userSchema, "Users");

module.exports = User;
