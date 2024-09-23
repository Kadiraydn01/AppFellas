import { useEffect, useState } from "react";
import api from "./api";
import ReservationHeader from "./ReservationHeader";
import { GoChevronDown } from "react-icons/go";
import { BsExclamationCircle } from "react-icons/bs";
import ReservationCard from "./ReservationCard";

const Reservation = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    // Fetch all reservations from the API
    const fetchReservations = async () => {
      try {
        const response = await api.get("reservations/my-reservations");
        setReservations(response.data);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };
    fetchReservations();
  }, []);

  // Check if a reservation is expired
  const isExpired = (reservation) => {
    const [day, month, year] = reservation.departureDate.split(".");
    const formattedDate = `${year}-${month}-${day}`;
    const departureDateTime = new Date(
      `${formattedDate}T${reservation.departureTime}`
    );
    return departureDateTime < new Date();
  };

  // Filter out expired reservations
  const activeReservations = reservations.filter(
    (reservation) => !isExpired(reservation)
  );

  return (
    <>
      <ReservationHeader />
      <div className="px-12 py-4 bg-stone-100">
        <div className="flex space-x-2 justify-between items-center text-center">
          <div className="flex space-x-2 h-[100px] items-center text-center">
            <h2 className="text-xl text-gray-500 flex font-bold">Sort By:</h2>
            <p className="text-gray-700 flex text-xl font-bold">
              {" "}
              Recommended <GoChevronDown className="mt-1 ml-2 w-4" />
            </p>
          </div>
          <div className="flex items-center gap-4">
            <BsExclamationCircle className="text-blue-500 w-6 h-6" />
            <p className="text-xl font-semibold">Avg Fare: 215$</p>
          </div>
        </div>

        {activeReservations.length === 0 ? (
          <p>No active reservations found.</p>
        ) : (
          activeReservations.map((reservation) => (
            <ReservationCard key={reservation._id} reservation={reservation} />
          ))
        )}
      </div>
    </>
  );
};

export default Reservation;
