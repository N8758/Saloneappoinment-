const bcrypt = require("bcryptjs");
const User = require("../modals/userSchema");

// Register User
const registerUser = async (req, res) => {
    console.log("📥 Register Request Received");
    console.log("📥 Request Headers:", req.headers);
    console.log("📥 Request Body:", req.body); // Debugging Line

    // Check if the request body is empty
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: "❌ No data received! Make sure the request is sent as JSON." });
    }

    const { name, phone, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "❌ User already exists!" });
        }

        // Hash password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create and save new user
        const newUser = new User({
            name,
            phone,
            email,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ message: "✅ User registered successfully!" });

    } catch (error) {
        console.error("❌ Error registering user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { registerUser };
