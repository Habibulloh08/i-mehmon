import React, { useEffect, useState } from "react";
import SidebarRight from "../components/SidebarRight";
import People from "../assets/icon/people.png";
import Human from "../assets/icon/human.png";
import Copy from "../assets/icon/copy.png";
import Balance from "../assets/icon/balnce.png";
import "../staylcss/home.css";
import WeeklyStatisticsTable from "../components/WeeklyStatisticsTable";
import userIndex from "../service/user/userIndex";
import { debounce } from "lodash";

const Home = () => {
  const { getUserCount } = userIndex();
  const [userData, setUserData] = useState([]);

  const fetchTopList = debounce(async () => {
    try {
      const response = await getUserCount();

      setUserData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(`Error fetching user data: ${error.message}`);
    }
  }, 500);

  useEffect(() => {
    fetchTopList();
  }, []);

  return (
    <div className="w-full  flex">
      <div className="home">
        <h2>Количество посетителей</h2>
        <div>
          <ul className="home-list">
            <li>
              <img src={People} alt="" />
              <div>
                <h1>{userData?.allVisit || 0}</h1>
                <p>всего</p>
              </div>
            </li>
            <li>
              <img src={Human} alt="" />
              <div>
                <h1>{userData?.dayVisit || 0}</h1>
                <p>за сегодня</p>
              </div>
            </li>
            <li>
              <img src={Copy} alt="" />
              <div>
                <h1>{userData?.weekVisit || 0}</h1>
                <p>за неделю</p>
              </div>
            </li>
            <li>
              <img src={Balance} alt="" />
              <div>
                <h1>{userData?.inOfficeVisit || 0}</h1>
                <p>в офисе</p>
              </div>
            </li>
          </ul>
        </div>
        <WeeklyStatisticsTable />
      </div>
      <div className=" border">
        <SidebarRight />
      </div>
    </div>
  );
};

export default Home;
