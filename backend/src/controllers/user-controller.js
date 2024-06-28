import User from "../models/User.js";
import { compare, hash } from "bcrypt";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json({ message: "Ok", users });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "Error", cause: error.message });
  }
};

export const userSignUp = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(401).send("User alredy exists");
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please enter all fields" });
    }
    const hashedPassword = await hash(password, 10); // Await the hash function
    const user = new User({ name, email, password: hashedPassword }); // Assign to the correct field
    await user.save();
    return res.status(201).json({ message: "Ok", id: user._id.toString() }); // Correct usage of res.status
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error", cause: error.message }); // Changed to 500 for server error
  }
};

export const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send("User not Registered");
    }
    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(403).send("Incorrect Password");
    }
    return res.status(200).json({ message: "Ok", id: user._id.toString() });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
