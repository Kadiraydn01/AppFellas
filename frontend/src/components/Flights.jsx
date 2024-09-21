import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPlaneDeparture, FaPlaneArrival, FaPlane } from "react-icons/fa";
import foto from "../images/thy1.png";

const Flights = () => {
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [displayedFlights, setDisplayedFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState("Lowest Price");
  const [arrivalTime, setArrivalTime] = useState("");
  const [stops] = useState([]);
  const [airlines] = useState([]);
  const [flightsToShow, setFlightsToShow] = useState(10);

  const assignRandomPrices = (flights) => {
    return flights.map((flight) => ({
      ...flight,
      price: Math.floor(Math.random() * 400) + 100,
    }));
  };

  const handleSortAndFilter = (flightsToFilter) => {
    let filteredFlights = [...flightsToFilter];

    if (arrivalTime) {
      filteredFlights = filteredFlights.filter((flight) => {
        const [hours, minutes] = flight.scheduleTime.split(":");
        const scheduleDate = new Date(flight.scheduleDate);
        scheduleDate.setHours(parseInt(hours), parseInt(minutes));
        const flightDepartureHour = scheduleDate.getHours();

        const [start, end] = arrivalTime
          .split("-")
          .map((hour) => parseInt(hour.trim(), 10));
        const isWithinTimeRange =
          flightDepartureHour >= start && flightDepartureHour < end;

        return isWithinTimeRange;
      });
    }

    if (stops.length > 0) {
      filteredFlights = filteredFlights.filter((flight) =>
        stops.includes(flight.stops)
      );
    }

    if (airlines.length > 0) {
      filteredFlights = filteredFlights.filter((flight) =>
        airlines.includes(flight.airline)
      );
    }
    switch (sortOption) {
      case "Lowest Price":
        filteredFlights.sort((a, b) => a.price - b.price);
        break;
      case "Highest Price":
        filteredFlights.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    return filteredFlights;
  };
  const storedDate = localStorage.getItem("startDate");
  const formattedDate = storedDate.split("T")[0];

  const handleArrivalTimeChange = (e) => {
    setArrivalTime(e.target.value);
  };

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/flights?scheduleDate=${formattedDate}`
        );

        const flightsWithPrices = assignRandomPrices(response.data || []);
        console.log(flightsWithPrices);
        setFlights(flightsWithPrices);
        setFilteredFlights(flightsWithPrices);
        setDisplayedFlights(flightsWithPrices.slice(0, flightsToShow));
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    // useEffect tetiklendiğinde veriyi getir
    fetchFlights();
  }, []);
  useEffect(() => {
    const toCity = localStorage.getItem("toCity");

    const filtered = flights.filter((flight) => {
      return flight.route.destinations.includes(toCity);
    });

    setFilteredFlights(filtered);
    setDisplayedFlights(filtered.slice(0, flightsToShow));
  }, [flights, flightsToShow]);

  useEffect(() => {
    const handleFlightSearch = () => {
      const toCity = localStorage.getItem("toCity");
      const filtered = flights.filter((flight) =>
        flight.route.destinations.includes(toCity)
      );
      setFilteredFlights(filtered);
      setDisplayedFlights(filtered.slice(0, flightsToShow));
    };

    window.addEventListener("flightSearch", handleFlightSearch);
    return () => {
      window.removeEventListener("flightSearch", handleFlightSearch);
    };
  }, [flights, flightsToShow]);

  useEffect(() => {
    const filtered = handleSortAndFilter(flights);
    setFilteredFlights(filtered);
    setDisplayedFlights(filtered.slice(0, flightsToShow));
  }, [arrivalTime, stops, airlines, sortOption, flightsToShow, flights]);

  const loadMoreFlights = () => {
    setFlightsToShow((prev) => prev + 10);
  };

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
      hour12: false,
    });
  };

  const formatLandingTime = (departureTime) => {
    if (!departureTime) return "N/A";

    const [hours, minutes] = departureTime.split(":");
    const date = new Date();
    date.setHours(parseInt(hours));
    date.setMinutes(parseInt(minutes));
    date.setHours(date.getHours() + 2);
    date.setMinutes(date.getMinutes() + 30);

    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: false,
    });
  };

  return (
    <div className="my-8 flex w-4/5">
      <div className="space-y-8 justify-center overflow-auto items-center w-2/3 mx-8">
        {displayedFlights.length > 0 ? (
          displayedFlights.map((flight, index) => (
            <div key={index} className="space-y-0">
              <div className="bg-white border border-gray-300 rounded-lg h-56 shadow-lg p-6 flex items-center space-x-4 hover:shadow-xl hover:bg-slate-100 transition-shadow duration-300">
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

                  <div className="flex gap-2 text-purple-600 font-bold mt-2">
                    <h2>Price:</h2>
                    <p>{flight.price}$</p>
                  </div>
                </div>

                <div className="flex mt-3 w-3/4 justify-between items-center">
                  <div className="border-t-4 border-gray-300 w-20"></div>

                  <div className="flex flex-col justify-center items-center gap-4">
                    <img className="w-12 h-4" src={foto} alt="Airline Logo" />
                    <FaPlane className="text-blue-500 w-6 h-6" />
                    <span className="text-gray-500 w-full">
                      2h 30m (Nonstop)
                    </span>
                  </div>

                  <div className="border-t-4 border-gray-300 w-20"></div>
                </div>

                <div className="flex flex-col items-end">
                  <div className="flex gap-2 items-center">
                    <FaPlaneArrival className="text-green-500 w-4 h-4" />
                    Arrival
                  </div>
                  <div className="text-md font-bold text-black">
                    {formatLandingTime(flight.scheduleTime)}
                  </div>
                  <div className="text-sm text-gray-500 mt-2">
                    Airport: {flight.route.destinations.join(", ")}
                  </div>
                  <button className="mt-4 bg-purple-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Reservation
                  </button>
                </div>
              </div>

              <div>
                <button className="bg-slate-200 hover:bg-slate-300 text-purple-800 font-semibold underline py-4 px-4 rounded">
                  Check the details
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No flights available for the selected filters.</p>
        )}

        {/* Load More Button */}
        {displayedFlights.length < filteredFlights.length && (
          <button
            className="mt-4 bg-purple-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={loadMoreFlights}
          >
            Load More Flights
          </button>
        )}
      </div>
      <div className="p-4 w-full max-w-xs max-h-[500px] bg-white shadow-lg rounded-lg">
        {/* Sort By Dropdown */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Sort by:</label>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="w-full border rounded px-3 py-2 text-gray-700"
          >
            <option value="Lowest Price">Lowest Price</option>
            <option value="Highest Price">Highest Price</option>
          </select>
        </div>

        {/* Kalkış Saati Filtresi */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Filter by Departure Time:
          </label>
          <div className="space-y-2">
            <div>
              <input
                type="radio"
                value="0-12"
                checked={arrivalTime === "0-12"}
                onChange={handleArrivalTimeChange}
              />
              <label className="ml-2">12:00 AM - 11:59 AM</label>
            </div>
            <div>
              <input
                type="radio"
                value="12-24"
                checked={arrivalTime === "12-24"}
                onChange={handleArrivalTimeChange}
              />
              <label className="ml-2">12:00 AM - 11:59 PM</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flights;
