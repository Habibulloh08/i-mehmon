import React, { useEffect, useState } from "react";
import { DatePicker, Space } from "antd";
import axios from "axios";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import userIndex from "../service/user/userIndex";

const { RangePicker } = DatePicker;

const WeeklyStatisticsChart = () => {
  const { getTable, getTopUser } = userIndex();
  const [data, setData] = useState([]);
  const [dateRange, setDateRange] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userTopData, setUserTopData] = useState({
    topMinute: [],
    topGhost: [],
  });

  const convertDataToArray = (dataObject) => {
    return Object.keys(dataObject).map((key) => ({
      name: key,
      uv: dataObject[key],
    }));
  };

  const fetchData = async (start, end) => {
    try {
      const response = await getTable(start, end);

      console.log(response.data);
      const dataArray = convertDataToArray(response.data);
      setData(dataArray);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserTopData = async (start, end) => {
    try {
      const response = await getTopUser(start, end);

      setUserTopData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching user top data:", error.message);
    }
  };

  useEffect(() => {
    fetchData("2023-10-10", "2023-10-25");
    fetchUserTopData("2023-10-10", "2023-10-25");
  }, []);

  const handleDateRangeChange = async (dates) => {
    setLoading(true);
    if (dates && dates.length === 2) {
      const startDate = dates[0].format("YYYY-MM-DD");
      const endDate = dates[1].format("YYYY-MM-DD");
      setDateRange([startDate, endDate]);
      await fetchData(startDate, endDate);
      await fetchUserTopData(startDate, endDate);
    }
  };

  return (
    <div className="w-full">
      <div className="mt-5 w-[95%] border p-5">
        <div className="mb-5 font-semibold text-[20px] flex justify-between w-full">
          Недельная статистика{" "}
          <Space direction="vertical" size={12}>
            <RangePicker onChange={handleDateRangeChange} />
          </Space>
        </div>
        <div className="w-full h-[300px]">
          <ResponsiveContainer>
            {loading ? (
              <p>Loading...</p>
            ) : data && data.length > 0 ? (
              <AreaChart
                data={data}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="uv"
                  stackId="1"
                  stroke="#8884d8"
                  fill="#8884d8"
                />
              </AreaChart>
            ) : (
              <p>Ma'lumotlar mavjud emas</p>
            )}
          </ResponsiveContainer>
        </div>
      </div>
      <div className="flex justify-around items-center mt-5 mb-5">
        <h2>Топ 5 по времени</h2> <h2>Топ 5 по посетителям</h2>
      </div>
      <div className="flex justify-between gap-5 items-center w-[95%]">
        <div className="w-full">
          <div className="user">
            <div className="flex justify-between pl-5 pr-5 items-center h-[100%] text-[16px] font-medium text-white">
              <p>№</p>
              <p>Имя</p>
              <p>Кол-во минут</p>
            </div>
          </div>
          <div className="userTop-list">
            {userTopData.topMinute && userTopData.topMinute.length > 0 ? (
              <div className="">
                {userTopData.topMinute?.map((user, index) => (
                  <div key={index} className="user-item">
                    <div className="flex justify-between items-center pr-5 pl-5 w-[90%] h-[100%] text-[16px] font-medium text-black">
                      <p>{index + 1}</p>
                      <p>{user.name}</p>
                      <p>{user.minute}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="pl-5 pt-2">No data available</p>
            )}
          </div>
        </div>

        <div className="w-[90%]">
          <div className="user">
            <div className="flex justify-between pl-5 pr-5 items-center h-[100%] text-[16px] font-medium text-white">
              <p>№</p>
              <p>Имя</p>
              <p>Кол-во гостей</p>
            </div>
          </div>
          <div className="userTop-list">
            {userTopData.topGhost && userTopData.topGhost.length > 0 ? (
              <div className="">
                {userTopData.topGhost?.map((user, index) => (
                  <div key={index} className="user-item">
                    <div className="flex justify-between items-center pr-5 pl-5 w-[90%] h-[100%] text-[16px] font-medium text-black">
                      <p>{index + 1}</p>
                      <p>{user?.name}</p>
                      <p>{user?.ghostNum}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="pl-5 pt-2">No data available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyStatisticsChart;
