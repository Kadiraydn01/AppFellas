import { useEffect, useState } from "react";
import { GoChevronDown } from "react-icons/go";
import { BsExclamationCircle } from "react-icons/bs";
import ReservationHeader from "./ReservationHeader";
import ReservationDetailsModal from "./ReservationDetailsModal";

import api from "./api";
import thy from "../images/thy1.png";
import alitalia from "../images/alitalia.png";
import lufthansa from "../images/Lufthansa1.png";
import airFrance from "../images/Air-France.jpg";
import Brussels from "../images/Brussels.png";
import AirItaly from "../images/Air-Italy.png";
import Siberia from "../images/Siberia.png";
import Pegasus from "../images/Pegasus.jpg";
import British from "../images/British.png";
import FlyEmirates from "../images/Fly_Emirates.png";

const ReservationCard = ({ reservation }) => {
  const [disabledIndexes, setDisabledIndexes] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState(reservation.price);

  const handleFlightDetailsClick = () => {
    setIsModalOpen(true);
  };

  const handleClick = (index) => {
    if (!isDisabled(index)) {
      setSelectedClass(index);
      setSelectedPrice(reservation.price + index * 50);
    }
  };

  const isSelected = (index) => selectedClass === index;

  const airlineLogos = {
    "Turkish Airlines": thy,
    Alitalia: alitalia,
    Lufthansa: lufthansa,
    "Air France": airFrance,
    Brussels: Brussels,
    "Air Italy": AirItaly,
    Siberia: Siberia,
    Pegasus: Pegasus,
    "British Airways": British,
    "Fly Emirates": FlyEmirates,
  };

  const airlineLogo = airlineLogos[reservation.airline] || null;

  useEffect(() => {
    const numberOfDisabled = Math.floor(Math.random() * 2) + 1;
    const allIndexes = [0, 1, 2, 3, 4];
    const selectedDisabledIndexes = [];

    while (selectedDisabledIndexes.length < numberOfDisabled) {
      const randomIndex = Math.floor(Math.random() * allIndexes.length);
      if (!selectedDisabledIndexes.includes(allIndexes[randomIndex])) {
        selectedDisabledIndexes.push(allIndexes[randomIndex]);
      }
    }

    setDisabledIndexes(selectedDisabledIndexes);
  }, []);

  const isDisabled = (index) => disabledIndexes.includes(index);

  const formatDepartureTime = (departureTime) => {
    if (!departureTime) return "N/A";
    const [hours, minutes] = departureTime.split(":");
    const date = new Date();
    date.setHours(parseInt(hours));
    date.setMinutes(parseInt(minutes));
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatLandingTime = (departureTime) => {
    if (!departureTime) return "N/A";
    const [hours, minutes] = departureTime.split(":");
    const date = new Date();
    date.setHours(parseInt(hours) + 1);
    date.setMinutes(parseInt(minutes) + 30);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="border h-[200px] flex rounded-lg bg-white p-4 mb-4 justify-between">
      <div className="w-[20%] justify-center flex items-center">
        {airlineLogo ? (
          <img
            src={airlineLogo}
            alt={`${reservation.airline} logo`}
            className="h-12 w-16"
          />
        ) : (
          <span>Logo Not Available</span>
        )}
      </div>

      <div className=" flex w-full flex-col">
        <div className="text-2xl font-medium text-gray-500">
          <p className=" mt-8">
            {formatDepartureTime(reservation.scheduleTime)} -{" "}
            {formatLandingTime(reservation.scheduleTime)}
          </p>{" "}
        </div>{" "}
        <div className="h-1/2">
          <div className="flex mt-2  ">
            <div className="flex w-1/3 flex-col text-start">
              <h6 className="font-bold text-gray-500">{reservation.airline}</h6>
              <button
                className="text-blue-400 ring-blue-400 text-start flex mt-1 font-bold"
                onClick={handleFlightDetailsClick}
              >
                <p>Flight Details</p>
                <GoChevronDown className="mt-1.5" />
              </button>
            </div>
            <div className="w-1/3 text-start">
              <p className="text-gray-500 font-bold">Nonstop</p>
              <p>1h 30m</p>
            </div>
            <div className="w-1/3 mx-auto text-start">
              <p className="font-bold text-gray-500">
                {reservation.fromCityCode} to {reservation.toCityCode}
              </p>
              <div className="flex gap-2 text-start items-start">
                <p>{reservation.airlineCode}</p>{" "}
                <p>{reservation.flightNumber}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-[80%] space-x-2 rounded-lg mt-2 flex justify-center">
        {[0, 1, 2, 3, 4].map((index) => (
          <div className="h-full" key={index}>
            <button
              className={`border border-slate-200 text-xl font-bold h-full py-2 px-8 rounded-2xl flex-1 ${
                isDisabled(index)
                  ? "bg-stone-200 cursor-not-allowed text-transparent"
                  : isSelected(index)
                  ? "bg-purple-500 text-white"
                  : "text-black"
              }`}
              onClick={() => handleClick(index)}
              disabled={isDisabled(index)}
            >
              ${reservation.price + index * 50}
              <p
                className={`text-sm font-light mt-6 ${
                  isDisabled(index)
                    ? "text-transparent"
                    : isSelected(index)
                    ? "text-white"
                    : ""
                }`}
              >
                {index === 0
                  ? "Main"
                  : index === 1
                  ? "Comfort+"
                  : index === 2
                  ? "Economy"
                  : index === 3
                  ? "Business"
                  : "First Class"}
              </p>
            </button>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <ReservationDetailsModal
          reservation={{ ...reservation, price: selectedPrice }}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

const Reservation = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
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
