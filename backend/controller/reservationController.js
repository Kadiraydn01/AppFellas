import Reservation from "../modals/Reservation.js";
import moment from "moment-timezone";

export const createReservation = async (req, res) => {
  const {
    fullName,
    email,
    phone,
    flightNumber,
    departureDate,
    returnDate,
    fromCity,
    toCity,
    price,
  } = req.body;
  const userId = req.user.userId;

  if (
    !fullName ||
    !email ||
    !phone ||
    !flightNumber ||
    !departureDate ||
    !fromCity ||
    !toCity ||
    price === undefined
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const convertedDepartureDate = moment
      .tz(departureDate, "Europe/Istanbul")
      .toDate();
    const convertedReturnDate = returnDate
      ? moment.tz(returnDate, "Europe/Istanbul").toDate()
      : null;

    const reservation = new Reservation({
      user: userId,
      fullName,
      email,
      phone,
      reservationDate: Date.now(),
      flightNumber,
      departureDate: convertedDepartureDate,
      returnDate: convertedReturnDate,
      flightDirection: "D",
      fromCity,
      toCity,
      price,
    });

    await reservation.save();
    res
      .status(201)
      .json({ message: "Reservation created successfully", reservation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({ user: req.user.userId });
    res.json(reservations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
