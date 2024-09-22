import React from "react";
import car from "../images/rent.jpg";
import hotel from "../images/hotel.jpg";
import travel from "../images/travel.jpg";
import { FaCarRear } from "react-icons/fa6";
import { FaHotel } from "react-icons/fa";
import { FaUmbrellaBeach } from "react-icons/fa";

const RightPart = () => {
  return (
    <div className="flex flex-col space-y-10">
      {/* Car Rentals */}
      <div className="relative">
        <img
          src={car}
          alt="Car Rentals"
          className="w-60 h-72 object-cover rounded-3xl"
        />
        <div className="absolute w-60 inset-0  rounded-3xl bg-opacity-40 flex items-end justify-start">
          <div className="text-white text-start mb-4 ml-4">
            <i className="fas fa-car text-4xl mb-2"></i>
            <FaCarRear className="text-2xl font-extralight text-white mb-2" />
            <h2 className="text-xl font-medium">CAR RENTALS</h2>
          </div>
        </div>
      </div>

      {/* Hotels */}
      <div className="relative">
        <img
          src={hotel}
          alt="Hotels"
          className="w-60 h-72 object-cover rounded-3xl"
        />
        <div className="absolute w-60 inset-0  rounded-3xl bg-opacity-40 flex items-end justify-start">
          <div className="text-white text-start mb-2 ml-4">
            <i className="fas fa-hotel text-4xl mb-2"></i>
            <FaHotel className="text-2xl font-extralight text-white mb-2" />
            <h2 className="text-xl font-bold">HOTELS</h2>
          </div>
        </div>
      </div>

      {/* Travel Packages */}
      <div className="relative">
        <img
          src={travel}
          alt="Travel Packages"
          className="w-60 h-72 object-cover rounded-3xl"
        />
        <div className="absolute w-60 inset-0  rounded-3xl bg-opacity-40 flex items-end justify-start">
          <div className="text-white text-start mb-4 ml-4">
            <i className="fas fa-umbrella-beach text-4xl mb-2"></i>
            <FaUmbrellaBeach className="text-2xl font-extralight text-white mb-2" />
            <h2 className="text-xl font-bold">TRAVEL PACKAGES</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightPart;
