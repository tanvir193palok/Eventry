import React from "react";
import Search from "./Search";

const Header = () => {
  return (
    <div className="md:pt-6 flex justify-between">
      <h1 className="font-semibold md:font-bold text-lg md:text-2xl">Discover Events</h1>
      <Search />
    </div>
  );
};

export default Header;
