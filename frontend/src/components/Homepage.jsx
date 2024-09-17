import React, { useState, useEffect } from "react";
import axios from "axios";

const Flights = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <div>
      <h1>Flights</h1>
      <ul>
        {flights.map((flight, index) => (
          <div key={index}>
            {flight.flightName} - {flight.gate}
            <div>Airport : {flight.route.destinations}</div>
            <div>Kalkış Saati : {flight.scheduleTime}</div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Flights;
