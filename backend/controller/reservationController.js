import Reservation from "../modals/Reservation.js";

export const createReservation = async (req, res) => {
  const {
    fullName,
    email,
    phone,
    flightNumber,
    departureDate,
    fromCity,
    toCity,
    price,
  } = req.body;
  const userId = req.user.userId;

  // Gerekli alanların doğrulaması
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
    const reservation = new Reservation({
      user: userId,
      fullName,
      email,
      phone,
      reservationDate: Date.now(),
      flightNumber,
      departureDate,
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
    console.error(error); // Hata günlüğü
    res.status(500).json({ message: "Server error" });
  }
};

export const getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({ user: req.user.userId });
    res.json(reservations);
  } catch (error) {
    console.error(error); // Hata günlüğü
    res.status(500).json({ message: "Server error" });
  }
};
