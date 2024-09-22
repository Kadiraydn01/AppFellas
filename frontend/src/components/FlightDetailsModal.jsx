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
      <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
        <h2 className="text-2xl font-bold mb-4 text-center text-purple-800">
          Flight Details
        </h2>
        <div className="space-y-2">
          <p>
            <strong>From:</strong> Amsterdam - AMS
          </p>
          <p>
            <strong>To:</strong> {city} - {flight.route.destinations.join(", ")}
          </p>
          <p>
            <strong>Departure Time:</strong> {flight.scheduleTime}
          </p>
          <p>
            <strong>Flight Date:</strong> {formattedDate}
          </p>
          <p>
            <strong>Gate Number:</strong> {flight.gate || "N/A"}
          </p>
          <p>
            <strong>Flight Number:</strong> {flight.flightNumber || "N/A"}
          </p>
        </div>
        <div className="mt-6 flex justify-center">
          <button
            className="bg-purple-600 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded transition duration-200"
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
