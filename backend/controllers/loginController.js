const bcrypt = require("bcryptjs");
const User = require("../modals/userSchema");


// Login User
const loginUser = async (req, res) => {
    console.log("📥 Login Request Received");
    console.log("📥 Request Body:", req.body);

    try {
        let { email, password, isAdmin = false } = req.body;
        email = email.toLowerCase(); // Normalize email case

        // 🛑 Check if email or password is missing
        if (!email || !password) {
            console.log("❌ Missing email or password");
            return res.status(400).json({ message: "❌ Email and password are required!" });
        }

        // 🛑 Fetch user from database
        const user = await User.findOne({ email });

        console.log("🛠️ Debug: Retrieved User ->", user);

        if (!user) {
            console.log("❌ User not found:", email);
            return res.status(400).json({ message: "❌ Invalid email or password!" });
        }

        // 🛑 Check if password exists in DB
        if (!user.password) {
            console.log("❌ User password missing in DB!");
            return res.status(500).json({ message: "❌ Internal error!" });
        }

        // 🛑 Verify password
        const isMatch = await bcrypt.compare(password, user.password);

        console.log("🛠️ Debug: Password Match ->", isMatch);

        if (!isMatch) {
            console.log("❌ Invalid password for:", email);
            return res.status(400).json({ message: "❌ Invalid email or password!" });
        }

        // 🛑 Check isAdmin access
        if (user.isAdmin !== isAdmin) {
            console.log("❌ Incorrect user type for:", email);
            return res.status(403).json({ message: "❌ Access Denied!" });
        }

        console.log("✅ Login Successful for:", email);
        res.status(200).json({ message: "✅ Login Successful!" });

    } catch (error) {
        console.error("❌ Error logging in user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { loginUser };
