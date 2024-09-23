import Search from "./Search";
import Header from "./Header";
import Flight from "./Flights";
import RightPart from "./RightPart";
import { useState } from "react";

const Flights = () => {
  const [showFlights, setShowFlights] = useState(false);

  //This function will be called when the user clicks on the search button
  const handleSearch = () => {
    setShowFlights(true);
  };
  return (
    <div className="bg-custom-purple1 bg-opacity-45 min-h-screen flex items-center shadow-xl justify-center">
      <div className="w-11/12 my-24 h-10/12 bg-stone-100 border border-gray-300 rounded-3xl shadow-lg">
        <Header />
        <div className="flex flex-row">
          <div className="w-[80%] flex flex-col space-y-4">
            <Search onSearch={handleSearch} />
            <Flight showFlights={showFlights} />
          </div>
          <div className="w-[20%]">
            <RightPart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flights;
