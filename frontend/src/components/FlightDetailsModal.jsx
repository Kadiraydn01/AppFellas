import React from "react";

const FlightDetailsModal = ({ flight, onClose }) => {
  const city = localStorage.getItem("toCityName");
  const flightDate = localStorage.getItem("startDate");
  const formattedDate = flightDate.split("T")[0];
  if (!flight) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70"
      onClick={handleOverlayClick}
    >
      <div className="bg-gradient-to-r from-purple-50 to-indigo-100 w-full max-w-lg p-6 rounded-lg shadow-2xl transition-transform transform hover:scale-105">
        <h2 className="text-3xl font-bold mb-4 text-center text-indigo-800">
          Flight Details
        </h2>
        <table className="table-auto w-full justify-between">
          <tbody>
            <tr className="border-b-2 border-indigo-200 bg-indigo-50">
              <td className="font-semibold py-3 text-indigo-900">From:</td>
              <td className="text-center border-l-2 border-indigo-300 text-indigo-700">
                Amsterdam - AMS
              </td>
            </tr>
            <tr className="border-b-2 border-indigo-200 bg-white">
              <td className="font-semibold py-3 text-indigo-900">To:</td>
              <td className="text-center border-l-2 border-indigo-300 text-indigo-700">
                {city} - {flight.route.destinations.join(", ")}
              </td>
            </tr>
            <tr className="border-b-2 border-indigo-200 bg-indigo-50">
              <td className="font-semibold py-3 text-indigo-900">
                Departure Time:
              </td>
              <td className="text-center border-l-2 border-indigo-300 text-indigo-700">
                {flight.scheduleTime}
              </td>
            </tr>
            <tr className="border-b-2 border-indigo-200 bg-white">
              <td className="font-semibold py-3 text-indigo-900">
                Flight Date:
              </td>
              <td className="text-center border-l-2 border-indigo-300 text-indigo-700">
                {formattedDate}
              </td>
            </tr>
            <tr className="border-b-2 border-indigo-200 bg-indigo-50">
              <td className="font-semibold py-3 text-indigo-900">
                Gate Number:
              </td>
              <td className="text-center border-l-2 border-indigo-300 text-indigo-700">
                {flight.gate || "N/A"}
              </td>
            </tr>
            <tr className="border-b-2 border-indigo-200 bg-white">
              <td className="font-semibold py-3 text-indigo-900">
                Flight Number:
              </td>
              <td className="text-center border-l-2 border-indigo-300 text-indigo-700">
                {flight.flightNumber || "N/A"}
              </td>
            </tr>
          </tbody>
        </table>
        <div className="mt-6 flex justify-center">
          <button
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-2 px-6 rounded-full shadow-md transition duration-300 transform hover:scale-110"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlightDetailsModal;
