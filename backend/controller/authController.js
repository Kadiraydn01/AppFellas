import User from "../modals/User.js";
import bcrypt from "bcryptjs";
import generateTokenAndCookie from "../utils/generateTokenAndCookie.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { username, password } = req.body;
  try {
    let user = await User.findOne({ username });
    if (user) return res.status(400).json({ message: "User already exists" });

    user = new User({ username, password });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    generateTokenAndCookie(user._id, res);

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
