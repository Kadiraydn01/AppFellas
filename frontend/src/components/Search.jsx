import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaPlaneDeparture, FaPlaneArrival } from "react-icons/fa";
import { IoAirplaneSharp } from "react-icons/io5";
import { MdDateRange } from "react-icons/md";

const fetchAirports = async () => {
  try {
    const response = await fetch("/airports.json");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const Search = () => {
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [tripType, setTripType] = useState("one-way");
  const [airports, setAirports] = useState([]);
  const [filteredAirports, setFilteredAirports] = useState([]);
  const dropdownRef = useRef(null); // Ref for dropdown

  useEffect(() => {
    const loadAirports = async () => {
      const data = await fetchAirports();
      setAirports(data);
    };
    loadAirports();
  }, []);

  useEffect(() => {
    localStorage.setItem("toCity", toCity);
  }, [toCity]);

  useEffect(() => {
    const filtered = airports.filter((airport) =>
      `${airport.city}-${airport.iata_code}`
        .toLowerCase()
        .includes(toCity.toLowerCase())
    );
    setFilteredAirports(filtered);
  }, [toCity, airports]);

  useEffect(() => {
    // Handle clicks outside of the dropdown
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setFilteredAirports([]); // Close dropdown
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCitySelect = (airport) => {
    setToCity(`${airport.city}-${airport.iata_code}`);
    setFilteredAirports([]); // Clear suggestions
    document.getElementById("toCity").blur();
  };

  const clearFields = () => {
    setFromCity("");
    setToCity("");
    setStartDate(null);
    setEndDate(null);
  };

  const searchFlights = () => {
    console.log("Searching for flights...");
    clearFields();
  };

  return (
    <div>
      <div className="flex justify-between w-full my-8 items-center">
        <div className="flex gap-4 items-center">
          <IoAirplaneSharp className="text-4xl text-purple-600" />
          <h1 className="font-semibold text-xl">BOOK YOUR FLIGHT</h1>
        </div>
        <div className="flex">
          <div
            onClick={() => setTripType("round-trip")}
            className={`cursor-pointer border font-medium p-3 ${
              tripType === "round-trip"
                ? "bg-purple-900 text-white"
                : "bg-slate-200 text-purple-800"
            } rounded-l-3xl`}
          >
            Round Trip
          </div>
          <div
            onClick={() => setTripType("one-way")}
            className={`cursor-pointer border font-medium p-3 ${
              tripType === "one-way"
                ? "bg-purple-900 text-white"
                : "bg-slate-200 text-purple-800"
            } rounded-r-3xl`}
          >
            One Way
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-center items-center text-center space-x-6">
        <div className="flex justify-center items-center space-x-4">
          <div className="relative">
            <FaPlaneDeparture className="absolute left-2 top-1/2 transform -translate-y-1/2 text-purple-600 w-4" />
            <input
              type="text"
              id="fromCity"
              value={fromCity}
              onChange={(e) => setFromCity(e.target.value)}
              placeholder="Amsterdam-AMS"
              disabled={true}
              className="bg-white border px-8 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 pl-10"
            />
          </div>

          <div className="relative">
            <FaPlaneArrival className="absolute left-2 top-1/2 transform -translate-y-1/2 text-purple-600 w-4" />
            <input
              type="text"
              id="toCity"
              value={toCity}
              onChange={(e) => setToCity(e.target.value)}
              placeholder="To City"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 pl-10"
              onFocus={() => {
                if (toCity) {
                  setFilteredAirports(
                    airports.filter((airport) =>
                      `${airport.city}-${airport.iata_code}`
                        .toLowerCase()
                        .includes(toCity.toLowerCase())
                    )
                  );
                }
              }}
            />
            {filteredAirports.length > 0 && (
              <div
                ref={dropdownRef}
                className="absolute z-10 bg-white border border-gray-300 w-full max-h-60 overflow-y-auto"
              >
                {filteredAirports.map((airport) => (
                  <div
                    key={airport.iata_code}
                    onClick={() => handleCitySelect(airport)}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                  >
                    {airport.city}-{airport.iata_code}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-center space-x-5 items-center">
          <div className="flex relative">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg px-8 focus:ring-blue-500 focus:border-blue-500 p-2.5"
              minDate={new Date()}
              dateFormat={"dd/MM/yyyy"}
            />
            <MdDateRange className="absolute left-2 top-1/2 transform -translate-y-1/2 text-purple-600 w-4 h-4" />
          </div>
          <div className="flex relative">
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg px-8 focus:ring-blue-500 focus:border-blue-500 p-2.5"
              minDate={startDate}
              dateFormat={"dd/MM/yyyy"}
              disabled={tripType === "one-way"}
            />
            <MdDateRange className="absolute left-2 top-1/2 transform -translate-y-1/2 text-purple-600 w-4 h-4" />
          </div>
        </div>
      </div>
      <div className="flex justify-start py-6 w-40">
        <button
          className="bg-purple-600 hover:bg-purple-800 text-white font-bold py-3 px-4 rounded-xl"
          onClick={searchFlights}
        >
          Uçuşları Göster
        </button>
      </div>
    </div>
  );
};

export default Search;
