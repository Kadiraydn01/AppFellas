import Reservation from "../modals/Reservation.js";

export const createReservation = async (req, res) => {
  const { flightNumber, departureDate } = req.body;
  const userId = req.user.userId;

  try {
    const reservation = new Reservation({
      user: userId,
      reservationDate: Date.now(),
      flightNumber,
      departureDate,
      flightDirection: "D",
    });

    await reservation.save();
    res.status(201).json({ message: "Reservation created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({ user: req.user.userId });
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
