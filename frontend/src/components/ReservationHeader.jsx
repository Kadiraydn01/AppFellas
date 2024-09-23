import React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

// This component will be used to display the header of the reservation page
const ReservationHeader = () => {
  return (
    <>
      <div className="flex justify-between px-12 h-[90px] items-center">
        <div className="reservation-header flex space-x-4">
          {/* Butonlar */}
          <button className="border border-gray-300 px-4 py-2 rounded-lg font-bold bg-white">
            Times
          </button>
          <button className="border border-gray-300 px-4 py-2 rounded-lg font-bold bg-white">
            Stops
          </button>
          <button className="border border-gray-300 px-4 py-2 rounded-lg font-bold bg-white">
            Airlines
          </button>
          <button className="border border-gray-300 px-4 py-2 rounded-lg font-bold bg-white">
            Airports
          </button>
          <button className="border border-gray-300 px-4 py-2 rounded-lg font-bold bg-white">
            Amenities
          </button>
          {/* Edit Search butonu */}
          <button className="flex items-center text-blue-600 px-4 py-2 rounded-lg bg-white">
            Edit Search <ArrowDropDownIcon />
          </button>
        </div>
        <div className="flex space-x-4 h-8">
          <Box className="flex space-x-3 h-12" sx={{ "& > legend": { mt: 2 } }}>
            <div className="flex flex-col space-y-1 cursor-pointer">
              <Rating
                className="w-[40px] h-[12px] text-black"
                name="customized-6"
                defaultValue={2}
                max={3}
                readOnly
              />
              <Rating
                className="w-[40px] h-[12px] text-black"
                name="customized-6"
                defaultValue={0}
                max={3}
                readOnly
              />
            </div>
            <div className="flex flex-col space-y-1 cursor-pointer">
              <Rating
                className="w-[40px] h-[12px] text-black"
                name="customized-6"
                defaultValue={3}
                max={3}
                readOnly
              />
              <Rating
                className="w-[40px] h-[12px] text-black"
                name="customized-6"
                defaultValue={0}
                max={3}
                readOnly
              />
            </div>
            <div className="flex flex-col space-y-1 cursor-pointer">
              <Rating
                className="w-[40px] h-[12px] text-black"
                name="customized-6"
                defaultValue={3}
                max={3}
                readOnly
              />
              <Rating
                className="w-[40px] h-[12px] text-black"
                name="customized-6"
                defaultValue={1}
                max={3}
                readOnly
              />
            </div>
            <div className="flex flex-col space-y-1 cursor-pointer">
              <Rating
                className="w-[40px] h-[12px] text-black"
                name="customized-6"
                defaultValue={3}
                max={3}
                readOnly
              />
              <Rating
                className="w-[40px] h-[12px] text-black"
                name="customized-6"
                defaultValue={2}
                max={3}
                readOnly
              />
            </div>
            <div className="flex flex-col space-y-1 cursor-pointer">
              <Rating
                className="w-[40px] h-[12px] text-black"
                name="customized-6"
                defaultValue={3}
                max={3}
                readOnly
              />
              <Rating
                className="w-[40px] h-[12px] text-black"
                name="customized-6"
                defaultValue={3}
                max={3}
                readOnly
              />
            </div>
          </Box>
        </div>
      </div>
    </>
  );
};

export default ReservationHeader;
