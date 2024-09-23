import React, { useState } from "react";
import api from "./api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ReservationModal = ({ flight, onClose, price, airline, airlineCode }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });
  const city = localStorage.getItem("toCityName");
  const flightDate = localStorage.getItem("startDate");
  const returnDate = localStorage.getItem("endDate");
  const tripType = localStorage.getItem("tripType");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  console.log("flight", flight);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/reservations/reserve", {
        ...formData,
        flightNumber: flight.flightNumber,
        departureDate: flightDate,
        returnDate: returnDate ? returnDate : null,
        fromCity: "Amsterdam",
        toCity: city,
        price: price,
        airline: airline,
        airlineCode: airlineCode,
        toCityCode: flight.route.destinations[0],
        fromCityCode: "AMS",
        scheduleTime: flight.scheduleTime,
        departureTime: departureTime,
      });
      console.log("Reservation created successfully", response.data);
      toast.success("Created successfully 🍀", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (error) {
      console.error("Error creating reservation", error);
      toast.error("Creating reservation failed", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  const formatLandingTime = (departureTime) => {
    if (!departureTime) return "N/A";
    const [hours, minutes, seconds] = departureTime.split(":");
    const date = new Date();
    date.setHours(parseInt(hours));
    date.setMinutes(parseInt(minutes));
    date.setSeconds(parseInt(seconds));
    date.setHours(date.getHours() - 2);
    date.setMinutes(date.getMinutes() + 15);
    date.setSeconds(date.getSeconds());
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };
  const departureTime = formatLandingTime(flight.scheduleTime);
  console.log("departureTime", departureTime);
  return (
    <div
      className="fixed w-full inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70"
      onClick={handleOverlayClick}
    >
      <div className="bg-white w-full max-w-6xl max-h-[90vh] overflow-y-auto p-10 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center text-purple-800">
          Book Your Flight
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Section 1: Form Fields */}
          <div className="flex gap-4 justify-between mb-6">
            <div>
              <label className="w-80 text-center flex flex-col justify-center text-gray-700 font-semibold ">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="w-80 text-center flex flex-col justify-center text-gray-700 font-semibold">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="w-80 text-center flex flex-col justify-center text-gray-700 font-semibold">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
          </div>

          {/* Section 2: Departure Flight Details */}
          <div className="mb-6 justify-center flex flex-col items-center">
            <h3 className="font-semibold text-lg text-purple-800 mb-2">
              Departure Flight Details
            </h3>
            <table className=" bg-white border border-gray-300 shadow-md">
              <tbody>
                <tr className="bg-gray-100">
                  <td className="border px-2 py-1 font-medium w-[300px]">
                    From:
                  </td>
                  <td className="border px-2 py-1 w-[300px]">{`Amsterdam`}</td>
                </tr>
                <tr>
                  <td className="border px-2 py-1 font-medium">To:</td>
                  <td className="border px-2 py-1">{city}</td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="border px-2 py-1 font-medium">Date:</td>
                  <td className="border px-2 py-1">{flightDate}</td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="border px-2 py-1 font-medium">Time:</td>
                  <td className="border px-2 py-1">{flight.scheduleTime}</td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="border px-2 py-1 font-medium">Airline:</td>
                  <td className="border px-2 py-1">{airline}</td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="border px-2 py-1 font-medium">Code:</td>
                  <td className="border px-2 py-1">{airlineCode}</td>
                </tr>
                <tr>
                  <td className="border px-2 py-1 font-medium">
                    Flight Number:
                  </td>
                  <td className="border px-2 py-1">{flight.flightNumber}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Section 3: Return Flight Details (if applicable) */}
          {tripType === "round-trip" && (
            <div className="mb-6 justify-center flex flex-col items-center">
              <h3 className="font-semibold text-lg text-purple-800 mb-2">
                Return Flight Details
              </h3>
              <table className=" bg-white border border-gray-300 shadow-md">
                <tbody>
                  <tr className="bg-gray-100">
                    <td className="border px-2 py-1 w-[300px] font-medium">
                      From:
                    </td>
                    <td className="border px-2 py-1 w-[300px]">{city}</td>
                  </tr>
                  <tr>
                    <td className="border px-2 py-1 font-medium">To:</td>
                    <td className="border px-2 py-1">{`Amsterdam`}</td>
                  </tr>
                  <tr className="bg-gray-100">
                    <td className="border px-2 py-1 font-medium">Date:</td>
                    <td className="border px-2 py-1">{returnDate}</td>
                  </tr>
                  <tr className="bg-gray-100">
                    <td className="border px-2 py-1 font-medium">Time:</td>
                    <td className="border px-2 py-1">{departureTime}</td>
                  </tr>
                  <tr className="bg-gray-100">
                    <td className="border px-2 py-1 font-medium">Airline:</td>
                    <td className="border px-2 py-1">{airline}</td>
                  </tr>
                  <tr className="bg-gray-100">
                    <td className="border px-2 py-1 font-medium">Code:</td>
                    <td className="border px-2 py-1">{airlineCode}</td>
                  </tr>
                  <tr>
                    <td className="border px-2 py-1 font-medium">
                      Flight Number:
                    </td>
                    <td className="border px-2 py-1">
                      {flight.flightNumber + 32}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* Price Section */}
          <div className="flex justify-center items-center mb-6">
            <table className="min-w-1/3 bg-purple-100 border border-gray-300 shadow-md">
              <tbody>
                <tr>
                  <td className="border px-4 py-2 font-bold text-purple-800">
                    Price:
                  </td>
                  <td className="border px-4 py-2 text-purple-600 font-semibold">
                    {price}€
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-800 text-white font-bold py-4 px-4 rounded-2xl w-1/4"
            >
              Confirm Reservation
            </button>{" "}
          </div>
        </form>
        <ToastContainer />
        <div className="mt-4 text-center">
          <button
            className="text-white bg-red-500 hover:bg-red-800 py-3 px-5 rounded-3xl"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservationModal;
