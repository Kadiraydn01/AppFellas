import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaPlaneDeparture } from "react-icons/fa";
import { FaPlaneArrival } from "react-icons/fa";
import { FaPlane } from "react-icons/fa";
import foto from "../images/thy1.png";
import { MdAirplaneTicket } from "react-icons/md";

const Flights = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/flights");
        console.log(response.data);

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
  //airline için max 18 sayfa var
  //flight için max 119 sayfa var
  //destination için max 465 sayfa var
  const handleLogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    toast.success("Logout successful 🍀", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

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

  const randomPrice = () => {
    return Math.floor(Math.random() * 1000) + 100;
  };

  return (
    <>
      {/* En üst kısım */}
      <div className="flex justify-between">
        <div className="flex">
          <MdAirplaneTicket className="text-4xl text-purple-500" />
          <div className="text-2xl font-bold mb-6">Flights</div>
        </div>
        <div className="flex  items-center">
          <button
            className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
      {/* DatePicker and Ticket Select */}
      <div>
        <div>{/* Location eklenecek */}</div>

        <div className="flex justify-center items-center">
          <div className="flex justify-center items-center">
            <div className="relative">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholderText="Gidiş Tarihi"
                minDate={new Date()}
              />
            </div>
            <span className="mx-4 text-gray-500">to</span>
            <div className="relative">
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                className="bg-gray-50 border border-gray-300
             text-gray-900 text-sm rounded-lg focus:ring-blue-500
              focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700
               dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholderText="Dönüş Tarihi"
                minDate={startDate}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex container border p-20 bg-purple-200">
        <div className="mt-10 p-8">
          <div className="space-y-4 ">
            {flights.map((flight, index) => (
              <div
                key={index}
                className="bg-white justify-between border  mx-4 border-gray-300 rounded-lg shadow-lg p-6 flex items-start space-x-4 hover:shadow-xl hover:bg-slate-100 transition-shadow duration-300"
              >
                {/* Uçuşun kalkış bilgileri */}
                <div>
                  <div className="flex gap-2 items-center">
                    <FaPlaneDeparture className="text-blue-500 w-4 h-4" />
                    Departure
                  </div>
                  <div className="flex-1">
                    <div className="text-lg font-semibold">
                      {flight.flightName}
                    </div>
                    <div className="text-sm text-gray-600">{flight.gate}</div>

                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      {formatTime(flight.scheduleTime)}
                    </div>
                  </div>
                  <div className="flex gap-2 text-purple-600 font-bold">
                    <h2>Price:</h2>
                    <p>{randomPrice()}$</p>
                  </div>
                </div>
                {/* Orta Alan */}
                <div className="flex mt-3 w-full justify-between items-center ">
                  {/* Sol çizgi */}
                  <div className="border-t-4 border-gray-300 flex-grow mx-12"></div>

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
                  <div className="border-t-4 border-gray-300 flex-grow mx-12"></div>
                </div>

                {/* Uçuşun varış bilgileri */}
                <div className="flex flex-col justify-center items-center">
                  <div className="flex gap-2 items-center">
                    <FaPlaneArrival className="text-green-500 w-4 h-4" />
                    <p>Arrival</p>
                  </div>
                  <div className="flex items-center text-md font-bold text-black">
                    {formatLandingTime(flight.scheduleTime)}
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mt-2">
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
        <ToastContainer />
      </div>
    </>
  );
};

export default Flights;
