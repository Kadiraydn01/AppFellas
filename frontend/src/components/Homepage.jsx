import Search from "./Search";
import Header from "./Header";
import Flight from "./Flights";

const Flights = () => {
  return (
    <>
      <div className="bg-custom-purple1 bg-opacity-45 min-h-screen flex items-center shadow-xl justify-center">
        <div className="w-11/12 my-24 h-10/12 bg-stone-100 border border-gray-300 rounded-3xl shadow-lg">
          <Header />
          <Search />
          <Flight />
        </div>
      </div>
    </>
  );
};

export default Flights;
