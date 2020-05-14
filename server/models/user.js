const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, "..", ".env.server")
});

const { JWT_SECRET } = process.env;

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: {
      validator: validator.isEmail,
      message: "{VALUE} is not a valid email"
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    trim: true
  },
  token: {
    type: String
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user"
  }
},
{
  toJSON: {
    transform: (doc, {_id, name, email, role}) => ({_id, name, email, role})
  }
});

UserSchema.methods.generateAuthToken = async function () {
  if (this.token) {
    return this.token;
  }
  const token = jwt.sign(
    { _id: this._id.toHexString() },
    JWT_SECRET
  ).toString();
  this.token = token;
  await this.save();
  return token;
};

UserSchema.statics.findByToken = async function (token) {
  try {
    const {_id} = jwt.verify(token, JWT_SECRET);
    return this.findOne({_id, token});
  } catch (e) {
    throw e;
  }
};

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    try {
      this.password = await bcrypt.hash(this.password, 8);
      next();
    } catch (e) {
      next(e);
    }
  } else {
    next();
  }
});

UserSchema.statics.findByCredentials = async function (email, password) {
  const user = await this.findOne({email});
  if (!user) {
    throw {
      errors: {
        email: {
          message: "User not found."
        }
      }
    };
  } else {
    if (await bcrypt.compare(password, user.password)) {
      return user;
    } else {
      throw {
        errors: {
          email:{
            message: "Incorrect password."
          }
        }
      };
    }
  }
};

UserSchema.pre("save", async function (next) {
  if (this.isModified("role") && this.role === "admin") {
    const users = await this.constructor.find({role: "admin"});
    if (users.length >= 1) {
      next(new Error("Only one admin user can be added."));
    } else {
      next();
    }
  } else {
    next();
  }
});

module.exports = mongoose.model("User", UserSchema);
