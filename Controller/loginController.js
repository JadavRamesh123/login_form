const db = require("../Model/loginModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

exports.signUp = async (req, res) => {
  try {
    let { name, email, password } = req.body;
    let emailCheck = await db.findOne({ email });
    if (emailCheck) {
      res.status(400).json({ message: "email is already exists" });
    }
    let hashedpassword = await bcrypt.hash(password, 10);
    let data = await db.create({ name, email, password: hashedpassword });
    res.status(201).json({ message: "account created successfully", data });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
exports.login = async (req, res) => {
  try {
    let { email, password } = req.body;
    let emailCheck = await db.findOne({ email });
    if (!emailCheck) {
      res.status(400).json({ message: "user not found " });
    }
    let passCompare =await bcrypt.compare(password, emailCheck.password);
    if (!passCompare) {
      res.status(400).json({ message: "password wrong" });
    }
    let details = {
      id: emailCheck._id,
    };
    let token = jwt.sign(details, process.env.SECRET_KEY);
    res
      .status(200)
      .json({ message: "logged in successfully", token, emailCheck });
  } catch (err) {
    res.status(404).json({ message: "user does not exist" });
  }
};
exports.getDetails = async (req, res) => {
  let data = await db.find();
  res.status(200).json({ message: "data fetched successfully", data });
};
exports.profile = async (req, res) => {
  res.json({ message: "profile page loaded" });
};
