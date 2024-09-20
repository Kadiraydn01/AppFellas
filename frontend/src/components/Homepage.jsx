import React, { useState, useEffect } from "react";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
import { FaPlaneDeparture, FaPlaneArrival, FaPlane } from "react-icons/fa";
import foto from "../images/thy1.png";

import Search from "./Search";
import Header from "./Header";

const Flights = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [tripType] = useState("oneWay");

  const flightPrice = 250;
  const returnFlightPrice = 350;

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/flights");
        setFlights(response.data.flights || []);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
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
    date.setHours(parseInt(hours));
    date.setMinutes(parseInt(minutes));

    // 2 saat 30 dakika ekle
    date.setHours(date.getHours() + 2);
    date.setMinutes(date.getMinutes() + 30);

    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };
  const getPriceForFlight = () => {
    let basePrice = 0;
    if (tripType === "round-trip") {
      basePrice = flightPrice + returnFlightPrice;
    } else {
      basePrice = flightPrice;
    }
    return basePrice;
  };

  return (
    <>
      <div className="bg-purple-300 min-h-screen flex items-center justify-center">
        <div className="w-10/12 bg-slate-100 border border-gray-300 rounded-lg shadow-lg">
          {/* En üst kısım */}
          <Header />
          <div className="bg-white flex flex-col justify-between px-6 ">
            {/* Nereden Nereye ve Tarih Seçimi */}
            <Search />
          </div>

          {/* Uçuşlar listesi */}
          <div className="space-y-4 overflow-auto max-h-96">
            {flights.map((flight, index) => (
              <div
                key={index}
                className="bg-white border border-gray-300 rounded-lg shadow-lg p-6 flex items-start space-x-4 hover:shadow-xl hover:bg-slate-100 transition-shadow duration-300"
              >
                {/* Kalkış bilgileri */}
                <div>
                  <div className="flex gap-2 items-center">
                    <FaPlaneDeparture className="text-blue-500 w-4 h-4" />
                    Departure
                  </div>
                  <div className="text-lg font-semibold">
                    {flight.flightName}
                  </div>
                  <div className="text-sm text-gray-600">{flight.gate}</div>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    {formatTime(flight.scheduleTime)}
                  </div>

                  <div
                    key={flight.flightName}
                    className="flex gap-2 text-purple-600 font-bold mt-2"
                  >
                    <h2>Price:</h2>
                    <p>{getPriceForFlight()}$</p>
                  </div>
                </div>

                {/* Uçuş orta alan */}
                <div className="flex mt-3 w-1/2 justify-between items-center ">
                  {/* Sol çizgi */}
                  <div className="border-t-4 border-gray-300 w-32"></div>

                  {/* Uçuş saati ve uçak */}
                  <div className="flex flex-col justify-center items-center space-x-1 gap-4">
                    <img
                      className="w-12 h-4 bg-white"
                      src={foto}
                      alt="Airline Logo"
                    />
                    <FaPlane className="text-blue-500 w-6 h-6" />
                    <span className="text-gray-500">2h 30m(Nonstop)</span>
                  </div>

                  {/* Sağ çizgi */}
                  <div className="border-t-4 border-gray-300  w-32"></div>
                </div>

                {/* Varış bilgileri */}
                <div className="flex flex-col items-end">
                  <div className="flex gap-2 items-center">
                    <FaPlaneArrival className="text-green-500 w-4 h-4" />
                    Arrival
                  </div>
                  <div className="text-md font-bold text-black">
                    {formatLandingTime(flight.scheduleTime)}
                  </div>
                  <div className="text-sm text-gray-500 mt-2">
                    Airport: {flight.route.destinations}
                  </div>
                  <button className="mt-4 bg-purple-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Rezervasyon
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Flights;
