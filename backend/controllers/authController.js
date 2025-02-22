const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// ✅ Register Controller (Fixed bcrypt hashing)
exports.register = async (req, res) => {
    const { name, email, password } = req.body;
  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      // ✅ Generate Salt and Hash the Password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      console.log("Hashed Password:", hashedPassword); // ✅ Debugging line
  
      const newUser = new User({
        name,
        email,
        password: hashedPassword, // ✅ Ensure we store the hashed password!
      });
  
      await newUser.save();
      res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
      console.error("Error in Register:", err);
      res.status(500).json({ message: "Server error" });
    }
  };
  

// ✅ Login Controller
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    //console.log("Hashed Password2:", user.password); 
    // ✅ Compare Hashed Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Generate JWT Token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Set HTTP-Only Cookie
    res.cookie("token", token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    res.status(200).json({ message: "Login successful",isLoggedin:true,name: user.name });
  } catch (err) {
    console.error("Error in Login:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Logout Controller
exports.logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
};

// ✅ Get Authenticated User
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    res.json(user);
  } catch (error) {
    console.error("Error in Get User:", error);
    res.status(500).json({ message: "Server error" });
  }
};
