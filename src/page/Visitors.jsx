import React, { useEffect, useState } from "react";
import { debounce } from "lodash";
import "../staylcss/visitors.css";
import userIndex from "../service/user/userIndex";
import Empty from "../assets/Empty.png";
import Modal from "../components/Modal";

const Visitors = () => {
  const { getUserList } = userIndex();
  const [visitors, setVisitors] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const fetchVisitors = debounce(async () => {
    try {
      const response = await getUserList();
      console.log("Response data:", response.data);

      console.log("Data array:", response.data.data);

      setVisitors(response.data.data);
    } catch (error) {
      console.error("Error fetching visitors:", error.message);
    }
  }, 500);

  const showModal = () => {
    setIsModal(!isModal);
  };

  useEffect(() => {
    fetchVisitors();
  }, []);

  return (
    <div className="w-full ">
      <div className="w-full flex justify-between">
        <h2>Список посетителей</h2>
        <button onClick={() => showModal()}>Добавить</button>
        {isModal && <Modal showModal={showModal} />}
      </div>
      <div>
        <div className="vistors-list">
          <div className="visitors">
            <p>№</p>
            <p>Посетитель</p>
            <p>Прошло времени</p>
            <p>Статус</p>
            <p>K кому</p>
            <p>Бейджик</p>
          </div>
          {!visitors?.length ? (
            <div className="vistors-empty">
              <img src={Empty} alt="" />
              <h2>Нет данных для отображения</h2>
            </div>
          ) : (
            visitors?.map((visitor, index) => (
              <div className="vistors-list_item" key={index}>
                <p>{index + 1}</p>
                <p>{visitor?.guest_name}</p>
                <p>{visitor?.minute === null ? "0" : visitor?.minute} min</p>
                <p>{visitor?.status}</p>
                <p>
                  {visitor?.comment && visitor?.comment?.length > 20
                    ? visitor?.comment.slice(0, 14) + "..."
                    : visitor?.comment}
                </p>
                <p>{visitor?.begic} </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Visitors;
