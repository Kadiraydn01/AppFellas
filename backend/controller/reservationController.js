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
    airline,
    airlineCode,
    toCityCode,
    fromCityCode,
    scheduleTime,
    departureTime,
    tripType,
  } = req.body;
  const userId = req.user.userId;

  const reservationDate = moment().tz("Europe/Istanbul").toDate();

  if (
    !fullName ||
    !email ||
    !phone ||
    !flightNumber ||
    !departureDate ||
    !fromCity ||
    !toCity ||
    !airline ||
    price === undefined
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const reservation = new Reservation({
      user: userId,
      fullName,
      email,
      phone,
      reservationDate: reservationDate,
      flightNumber,
      departureDate,
      returnDate,
      flightDirection: "D",
      fromCity,
      toCity,
      price,
      airline,
      airlineCode,
      toCityCode,
      fromCityCode,
      scheduleTime,
      departureTime,
      tripType,
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

    const reservationsWithLocalTime = reservations.map((reservation) => ({
      ...reservation._doc,
      reservationDate: moment(reservation.reservationDate)
        .tz("Europe/Istanbul")
        .format("YYYY-MM-DD HH:mm:ss"),
    }));

    res.json(reservationsWithLocalTime);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
