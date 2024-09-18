import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  return (
    <>
      <button
        className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
        onClick={handleLogout}
      >
        Logout
      </button>
      <div className="flex items-center">
        <div className="relative">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholderText="Gidiş Tarihi"
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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholderText="Dönüş Tarihi"
          />
        </div>
      </div>

      <div className="mt-80">
        <h1 className="">Flights</h1>
        <ul>
          {flights.map((flight, index) => (
            <div className="flex flex-col" key={index}>
              {flight.flightName} - {flight.gate}
              <div>Airport : {flight.route.destinations}</div>
              <div>Kalkış Saati : {flight.scheduleTime}</div>
            </div>
          ))}
        </ul>
      </div>

      <ToastContainer />
    </>
  );
};

export default Flights;
