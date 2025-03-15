import { generateJWT } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";

//Signup Controller
export const signup = async (req, res) => {
  try {
    const { email, fullName, password } = req.body;
    if (!email || !fullName || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }
    const user = await User.findOne({ email });
    if (user) res.status(400).json({ message: "Email already exist." });
    //hasing the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      email,
      fullName,
      password: hashPassword,
    });
    if (newUser) {
      //generate jwt
      generateJWT(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        email: newUser.email,
        fullName: newUser.fullName,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "Invalid user details" });
    }
  } catch (error) {
    //console.log("Error in signup controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//Login Controller
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    generateJWT(user._id, res);
    res.status(200).json({
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
      profilePic: user.profilePic,
    });
  } catch (error) {
    //console.log("Error in login controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//Logout Controller
export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 0,
    });
    res.status(200).json({ message: "Logout successfully" });
  } catch (error) {
    //console.log("Error in logout controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//Update Profile Controller

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;
    if (!profilePic) {
      return res.status(400).json({ message: "Profile pic is required" });
    }
    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );
    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    //console.log("Error in updateProfile controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//check auth controller
export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    //console.log("Error in checkAuth controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
