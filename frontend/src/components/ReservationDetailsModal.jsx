import React from "react";

// This component will display the details of a reservation
const ReservationDetailsModal = ({ reservation, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 md:w-1/2">
        <h2 className="text-2xl font-bold mb-4">Reservation Details</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <tbody>
            <tr className="bg-gray-100">
              <td className="px-4 py-2 font-bold">Airline:</td>
              <td className="px-4 py-2">
                {reservation.airline} ({reservation.airlineCode})
              </td>
            </tr>
            <tr className="bg-white">
              <td className="px-4 py-2 font-bold">Flight Number:</td>
              <td className="px-4 py-2">{reservation.flightNumber}</td>
            </tr>
            <tr className="bg-gray-100">
              <td className="px-4 py-2 font-bold">From:</td>
              <td className="px-4 py-2">
                {reservation.fromCity} ({reservation.fromCityCode})
              </td>
            </tr>
            <tr className="bg-white">
              <td className="px-4 py-2 font-bold">To:</td>
              <td className="px-4 py-2">
                {reservation.toCity} ({reservation.toCityCode})
              </td>
            </tr>
            <tr className="bg-gray-100">
              <td className="px-4 py-2 font-bold">Departure Date:</td>
              <td className="px-4 py-2">{reservation.departureDate}</td>
            </tr>
            <tr className="bg-white">
              <td className="px-4 py-2 font-bold">Departure Time:</td>
              <td className="px-4 py-2">{reservation.departureTime}</td>
            </tr>
            <tr className="bg-gray-100">
              <td className="px-4 py-2 font-bold">Return Date:</td>
              <td className="px-4 py-2">{reservation.returnDate || "N/A"}</td>
            </tr>
            <tr className="bg-white">
              <td className="px-4 py-2 font-bold">Price:</td>
              <td className="px-4 py-2">${reservation.price}</td>
            </tr>
            <tr className="bg-gray-100">
              <td className="px-4 py-2 font-bold">Full Name:</td>
              <td className="px-4 py-2">{reservation.fullName}</td>
            </tr>
            <tr className="bg-white">
              <td className="px-4 py-2 font-bold">Email:</td>
              <td className="px-4 py-2">{reservation.email}</td>
            </tr>
            <tr className="bg-gray-100">
              <td className="px-4 py-2 font-bold">Phone:</td>
              <td className="px-4 py-2">{reservation.phone}</td>
            </tr>
            <tr className="bg-white">
              <td className="px-4 py-2 font-bold">Reservation Date:</td>
              <td className="px-4 py-2">
                {new Date(reservation.reservationDate).toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>
        <button
          className="mt-6 bg-purple-500 text-white py-2 px-4 rounded shadow hover:bg-purple-600 transition duration-200"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ReservationDetailsModal;
