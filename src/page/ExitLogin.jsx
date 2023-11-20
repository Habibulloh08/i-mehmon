import React from "react";
import ExitLoginImg from "../assets/Back.png";
const ExitLogin = () => {
  return (
    <div className="exit-container">
      <div className=" w-[1700px] h-[1150px;] bg-white border-zinc-300 rounded-2xl flex  items-center">
        <div>
          <img src={ExitLoginImg} alt="" className="w-[950px] h-[1150px]" />
        </div>
      </div>
    </div>
  );
};

export default ExitLogin;
