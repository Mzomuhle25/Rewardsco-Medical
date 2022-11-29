const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
      trim: true,
    },
    Age: {
      type: Number,
      required: true,
    },
    Email: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is Invalid");
        }
      },
    },
    phonenumber: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    _appId: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
    idnumber: {
      type: Number,
      trim: true,
    },
    employeenumber: {
      type: Number,
      trim: true,
    },
    Description: {
      type: String,
      required: true,
      trim: true,
    },
    condition: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;