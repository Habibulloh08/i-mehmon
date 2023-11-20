import React from "react";
import { RiHomeSmile2Line } from "react-icons/ri";
import { TiThLargeOutline, TiCalendarOutline } from "react-icons/ti";
import { GoPeople } from "react-icons/go";
import { GrTip } from "react-icons/gr";
import { BiLogIn } from "react-icons/bi";
import { LiaCompressSolid } from "react-icons/lia";
import { MdOutlineAccountCircle } from "react-icons/md";
import { CgSupport } from "react-icons/cg";
import "../staylcss/sidebarLeft.css";
import { NavLink, useNavigate } from "react-router-dom";
const SidebarLeft = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.alert("Siz tizimdan muvaffaqiyatli chiqdingiz!");
    navigate("/login");
  };
  return (
    <div className="sedebarleft">
      <div className="sidebarleft-menu">
        <h1>Основное меню</h1>
        <ul className="sidebarleft-list">
          <NavLink to={"/"}>
            <li>
              <RiHomeSmile2Line />
              <p>Главная</p>
            </li>
          </NavLink>
          <NavLink to={"meetings"}>
            <li>
              <TiCalendarOutline />
              <p>Встречи</p>
            </li>
          </NavLink>
          <NavLink to={"empolyees"}>
            <li>
              <GoPeople />
              <p>Сотрудники</p>
            </li>
          </NavLink>
          <NavLink to={"visitors"}>
            <li>
              <GrTip />
              <p>Посетители</p>
            </li>
          </NavLink>
          <NavLink to={"rooms"}>
            <li>
              <TiThLargeOutline />
              <p>Комнаты</p>
            </li>
          </NavLink>
          <NavLink to={"department"}>
            <li>
              <LiaCompressSolid />
              <p>Отдел</p>
            </li>
          </NavLink>
        </ul>
      </div>
      <hr />
      <div className="sidebar-menu_item">
        <h1>Настройки</h1>
        <ul className="sidebar-menu_item--list">
          <NavLink to={"support"}>
            <li>
              <CgSupport className="text-[25px]" /> <p>Помощь</p>
            </li>
          </NavLink>
          {/* <NavLink>
            <li>
              <MdOutlineAccountCircle className="text-[25px]" /> <p>Аккаунт</p>
            </li>
          </NavLink> */}

          <li onClick={handleLogout}>
            <BiLogIn className="text-[25px]" /> <p>Выйти</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SidebarLeft;
