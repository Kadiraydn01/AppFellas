import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  reservationDate: { type: Date, default: Date.now },
  flightNumber: { type: String, required: true },
  departureDate: { type: Date, required: true },
  flightDirection: { type: String, enum: ["D"], required: true },
});

const Reservation = mongoose.model(
  "Reservation",
  reservationSchema,
  "reservation"
);
export default Reservation;
