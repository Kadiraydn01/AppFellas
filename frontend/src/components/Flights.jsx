import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPlaneDeparture, FaPlaneArrival, FaPlane } from "react-icons/fa";

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

import foto2 from "../images/1.jpg";
import foto3 from "../images/2.jpg";
import foto4 from "../images/3.jpg";
import foto5 from "../images/4.jpg";

import Carousel from "./Carousel";
import FlightDetailsModal from "./FlightDetailsModal";
import ReservationModal from "./ReservationModal";

// This component will show the flights
const Flights = ({ showFlights }) => {
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [displayedFlights, setDisplayedFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState("Lowest Price");
  const [arrivalTime, setArrivalTime] = useState("");
  const [stops, setStops] = useState([]);
  const [airlines, setAirlines] = useState([]);
  const [flightsToShow, setFlightsToShow] = useState(10);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const carouselImages = [foto2, foto3, foto4, foto5];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const priceList = [
    200, 202, 208, 210, 213, 217, 221, 226, 232, 233, 235, 237, 239, 240, 242,
    244, 250, 251, 258, 260, 265, 267, 268, 245, 220, 230, 204, 216, 231, 241,
  ];

  const airlineLogos = {
    "Turkish Airlines": thy, //THY
    Alitalia: alitalia, //AZ
    Lufthansa: lufthansa, //LH
    "Air France": airFrance, //AF
    Brussels: Brussels, //SN
    "Air Italy": AirItaly, //IG
    Siberia: Siberia, //S7
    Pegasus: Pegasus, //PC
    "British Airways": British, //BA
    "Fly Emirates": FlyEmirates, //EK
  };
  const airlineCodes = {
    "Turkish Airlines": "THY",
    Alitalia: "AZ",
    Lufthansa: "LH",
    "Air France": "AF",
    Brussels: "SN",
    "Air Italy": "IG",
    Siberia: "S7",
    Pegasus: "PC",
    "British Airways": "BA",
    "Fly Emirates": "EK",
  };

  // This function will assign airlines to the flights
  const assignAirlines = (flights) => {
    const airlines = Object.keys(airlineLogos);
    return flights.map((flight, index) => ({
      ...flight,
      airline: airlines[index % airlines.length],
    }));
  };

  // This function will open the details modal
  const openDetailsModal = (flight) => {
    setSelectedFlight(flight);
    setIsDetailsModalOpen(true);
  };

  // This function will assign fixed prices to the flights
  const assignFixedPrices = (flights) => {
    return flights.map((flight, index) => ({
      ...flight,
      price: priceList[index % priceList.length],
      logo: airlineLogos[flight.airline] || thy,
    }));
  };

  // This function will open the reservation modal
  const openReservationModal = (flight) => {
    setSelectedFlight(flight);
    setIsModalOpen(true);
  };

  // This function will handle the stops change
  const handleStopsChange = (e) => {
    const stopValue = parseInt(e.target.value);
    setStops([stopValue]); // Sadece seçilen değeri dizide tutar
  };

  // This function will handle the sort and filter
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
        return flightDepartureHour >= start && flightDepartureHour < end;
      });
    }

    if (stops.length > 0) {
      filteredFlights = filteredFlights.filter((flight) => {
        const destinationCount = flight.route.destinations.length;
        let stopCount = 0;

        if (destinationCount === 1) {
          stopCount = 0;
        } else if (destinationCount === 2) {
          stopCount = 1;
        } else if (destinationCount > 2) {
          stopCount = 2;
        }

        return stops.includes(stopCount);
      });
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

  //Take some information from the local storage
  const storedDate = localStorage.getItem("startDate");
  const formattedDate = storedDate.split("T")[0];
  const tripType = localStorage.getItem("tripType");
  const city = localStorage.getItem("toCityName");

  // This function will handle the arrival time change
  const handleArrivalTimeChange = (e) => {
    setArrivalTime(e.target.value);
  };

  useEffect(() => {
    // This function will fetch the flights from the API
    const fetchFlights = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/flights?scheduleDate=${formattedDate}`
        );

        const fetchedFlights = response.data || [];
        const flightsWithAirlines = assignAirlines(fetchedFlights);
        const flightsWithPrices = assignFixedPrices(flightsWithAirlines);

        setFlights(flightsWithPrices);
        setFilteredFlights(flightsWithPrices);
        setDisplayedFlights(flightsWithPrices.slice(0, flightsToShow));
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // This function will filter the flights by destination city
    if (showFlights) {
      const toCity = localStorage.getItem("toCity");
      const filtered = flights.filter((flight) =>
        flight.route.destinations.includes(toCity)
      );
      setFilteredFlights(filtered);
      setDisplayedFlights(filtered.slice(0, flightsToShow));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showFlights, flights]);

  useEffect(() => {
    const toCity = localStorage.getItem("toCity");
    const filtered = flights.filter((flight) =>
      flight.route.destinations.includes(toCity)
    );
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

  useEffect(
    () => {
      const sortedAndFilteredFlights = handleSortAndFilter(filteredFlights);
      setDisplayedFlights(sortedAndFilteredFlights.slice(0, flightsToShow));
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [arrivalTime, stops, airlines, sortOption, flightsToShow, filteredFlights]
  );

  // This function will handle the load more flights
  const loadMoreFlights = () => {
    setFlightsToShow((prev) => prev + 10);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // This function will format the time
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

  // This function will format the landing time
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
      hour12: true,
    });
  };

  const price = 230;
  return (
    <>
      {!showFlights ? (
        <Carousel images={carouselImages} />
      ) : (
        <div className="my-8 flex w-full ">
          <div className="space-y-8 justify-center w-full overflow-auto max-h-[700px] items-center mx-8">
            {displayedFlights.length > 0 ? (
              displayedFlights.map((flight, index) => (
                <div key={index} className="space-y-0">
                  <div className="bg-white border border-gray-300 rounded-lg h-[270px] shadow-lg justify-between flex items-center space-x-4 hover:shadow-xl hover:bg-slate-100 transition-shadow duration-300">
                    <div className="flex flex-col ml-6 h-full justify-evenly">
                      <div className="w-full font-bold text-lg text-slate-900">
                        Amsterdam - {city}
                      </div>
                      <div>
                        <div className="flex gap-2 items-center">
                          <FaPlaneDeparture className="w-4 h-4" />
                          <p className="font-normal text-slate-500">
                            Departure
                          </p>
                        </div>
                        <div className="flex items-center font-black text-lg text-gray-500 mt-1">
                          {formatTime(flight.scheduleTime)}
                        </div>
                        <div>
                          <p className="text-slate-500 font-medium">
                            Airport: AMS
                          </p>
                        </div>
                      </div>
                      <div>
                        <div className="flex text-lg gap-2 text-purple-700 font-bold mt-2">
                          <h2>Price:</h2>
                          <p>
                            $
                            {localStorage.getItem("tripType") === "one-way"
                              ? flight.price
                              : flight.price * 2}
                          </p>
                        </div>

                        <div>
                          <p className="font-medium text-slate-600">
                            {tripType === "round-trip"
                              ? "Round Trip"
                              : "One Way"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex mt-3 w-1/3 mx-auto justify-start items-center">
                      <div className="border-t-4 border-gray-300 w-16"></div>

                      <div className="flex flex-col justify-center text-center items-center gap-4">
                        <img
                          className="w-12 h-10"
                          src={flight.logo}
                          alt={`${flight.airline} Logo`}
                        />
                        <FaPlane className="text-purple-900 w-6 h-6" />
                        <span className="text-gray-500 w-full">
                          2h 30m (Nonstop)
                        </span>
                      </div>

                      <div className="border-t-4 border-gray-300 items-start w-16"></div>
                    </div>

                    <div className="flex flex-col w-1/3 items-start h-full justify-between">
                      <div className="h-20"> </div>
                      <div className="gap-2 items-start mx-auto flex flex-col">
                        <div className="flex gap-4 items-center justify-between ">
                          <FaPlaneArrival className="w-4 h-4" />
                          <p className="font-normal text-slate-500">Arrival</p>
                        </div>
                        <div className="flex items-center font-black text-lg text-gray-500 mt-1">
                          {formatLandingTime(flight.scheduleTime)}
                        </div>
                        <div className="text-slate-500 font-medium">
                          Airport: {flight.route.destinations.join(", ")}
                        </div>
                      </div>
                      <div className="mt-4 flex items-end justify-end w-full">
                        <button
                          className=" bg-purple-900 hover:bg-blue-700 w-[85%]  h-20 text-white font-bold py-2 px-4 rounded"
                          onClick={() => openReservationModal(flight)}
                        >
                          Book Flight
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <button
                      className="bg-slate-200 hover:bg-slate-300 text-purple-800 font-semibold underline py-4 px-4 rounded"
                      onClick={() => openDetailsModal(flight)}
                    >
                      Check the details
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center my-8">
                <div
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                  role="alert"
                >
                  <strong className="font-bold">Oops!</strong>
                  <span className="block sm:inline">
                    No flights available for the selected filters.
                  </span>
                </div>
              </div>
            )}

            {displayedFlights.length < filteredFlights.length &&
              displayedFlights.length > 0 && (
                <button
                  className="mt-4 bg-purple-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={loadMoreFlights}
                >
                  Load More Flights
                </button>
              )}
          </div>

          {isModalOpen && selectedFlight && (
            <ReservationModal
              flight={selectedFlight}
              airline={selectedFlight.airline}
              airlineCode={airlineCodes[selectedFlight.airline]}
              gate={selectedFlight.gate}
              onClose={() => setIsModalOpen(false)}
              price={
                tripType === "round-trip"
                  ? selectedFlight.price * 2
                  : selectedFlight.price
              }
            />
          )}
          {isDetailsModalOpen && selectedFlight && (
            <FlightDetailsModal
              flight={selectedFlight}
              onClose={() => setIsDetailsModalOpen(false)}
            />
          )}

          <div className="p-4 w-full max-w-xs max-h-full space-y-4 overflow-clip bg-stone-100 rounded-lg">
            <div className="mb-4 w-[85%]">
              <label className="block text-gray-700 font-bold mb-2">
                Sort by:
              </label>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="w-full border rounded px-3 py-2 text-gray-700"
              >
                <option value="Lowest Price">Lowest Price</option>
                <option value="Highest Price">Highest Price</option>
              </select>
            </div>

            <div className="mb-4 w-2/3">
              <label className="block text-gray-700 font-bold mb-2">
                Departure Time
              </label>
              <div className="space-y-2">
                <div>
                  <input
                    type="radio"
                    value="5-11"
                    checked={arrivalTime === "5-11"}
                    onChange={handleArrivalTimeChange}
                  />
                  <label className="ml-2">05:00 AM - 11:59 AM</label>
                </div>
                <div>
                  <input
                    type="radio"
                    value="12-18"
                    checked={arrivalTime === "12-18"}
                    onChange={handleArrivalTimeChange}
                  />
                  <label className="ml-2">12:00 PM - 05:59 PM</label>
                </div>
              </div>
            </div>
            <div className="w-[90%]">
              <label className="block text-gray-700 font-bold mb-2">
                Stops
              </label>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <div>
                    <input
                      type="radio"
                      value="0"
                      checked={stops.includes(0)}
                      onChange={handleStopsChange}
                    />
                    <label className="ml-2">Nonstop</label>
                  </div>
                  <span className="text-gray-500">${price}</span>
                </div>

                <div className="flex justify-between">
                  <div>
                    <input
                      type="radio"
                      value="1"
                      checked={stops.includes(1)}
                      onChange={handleStopsChange}
                    />
                    <label className="ml-2">1 Stop</label>
                  </div>
                  <span className="text-gray-500">${price}</span>
                </div>

                <div className="flex justify-between">
                  <div>
                    <input
                      type="radio"
                      value="2"
                      checked={stops.includes(2)}
                      onChange={handleStopsChange}
                    />
                    <label className="ml-2">2+ Stops</label>
                  </div>
                  <span className="text-gray-500">${price}</span>
                </div>
              </div>
            </div>

            <div className="mt-2 w-[90%]">
              <label className="block text-gray-700 font-bold mb-2">
                Airlines Included
              </label>
              <div className="space-y-2">
                {Object.keys(airlineLogos).map((airline) => (
                  <div key={airline} className="flex justify-between">
                    <div>
                      <input
                        type="radio"
                        name="airline"
                        className="form-radio fill-blue-500 text-blue-600 h-4 w-4"
                        value={airline}
                        checked={airlines.includes(airline)}
                        onChange={(e) => {
                          const value = e.target.value;
                          setAirlines([value]);
                        }}
                      />
                      <label className="ml-2">{airline}</label>
                    </div>
                    <span className="text-gray-500">${price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Flights;
