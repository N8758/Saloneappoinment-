const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  bookingDate: Date,
  appoinmentAt: String
});

const salonSchema = new mongoose.Schema({
  name: String,
  salonName: String,
  email: { type: String, unique: true },
  password: String,
  isAdmin: Boolean,
  appointments: [appointmentSchema] // ✅ Embedded appointments array
});

const Salon = mongoose.model("Salon", salonSchema);
module.exports = Salon;
