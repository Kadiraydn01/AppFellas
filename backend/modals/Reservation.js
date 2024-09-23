import mongoose from "mongoose";
import moment from "moment-timezone";

const reservationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  reservationDate: {
    type: Date,
    default: () => moment().tz("Europe/Istanbul").toDate(),
  },
  flightNumber: { type: String, required: true },
  departureDate: { type: String, required: true },
  returnDate: { type: String },
  airline: { type: String, required: true },
  fromCity: { type: String, required: true },
  toCity: { type: String, required: true },
  price: { type: Number, required: true },
  flightDirection: { type: String, enum: ["D"], required: true },
  airlineCode: { type: String },
  toCityCode: { type: String },
  fromCityCode: { type: String },
  scheduleTime: { type: String },
  departureTime: { type: String },
  tripType: { type: String },
});

const Reservation = mongoose.model(
  "Reservation",
  reservationSchema,
  "reservation"
);
export default Reservation;
