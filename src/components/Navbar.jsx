import React from "react";
import Logo from "../assets/Logo.svg";
const Navbar = () => {
  return (
    <nav className="">
      <div className="w-full flex justify-center items-center">
        <img src={Logo} alt="" />
      </div>
      <br />
      <hr />
    </nav>
  );
};

export default Navbar;
