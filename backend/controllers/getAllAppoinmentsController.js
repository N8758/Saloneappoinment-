const salonModel = require("../modals/salonSchema"); // ✅ Ensure correct path

const getAllAppoinments = async (req, res) => {
    const { email } = req.params;

    try {
        console.log("Received email:", email); // ✅ Debugging

        // ✅ Find the salon where the user's email exists
        const salon = await salonModel.findOne({ email });

        if (!salon || !salon.appointments || salon.appointments.length === 0) {
            return res.status(404).json({ success: false, message: "No appointments found for this email" });
        }

        res.status(200).json({ success: true, appointments: salon.appointments });

    } catch (error) {
        console.error("Error fetching user appointments:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

module.exports = { getAllAppoinments };
