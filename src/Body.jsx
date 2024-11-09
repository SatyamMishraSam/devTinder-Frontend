import React from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const Body = () => {
  return (
    <div>
      <NavBar />
      {/* Body children has to run in the outlet */}
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
