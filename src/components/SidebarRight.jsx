import React, { useEffect, useState } from "react";
import { Segmented } from "antd";
import "../staylcss/sidebarRight.css";
import userIndex from "../service/user/userIndex";
import { IoLocationOutline } from "react-icons/io5";
import { IoMdTime } from "react-icons/io";
import { RiAccountCircleLine } from "react-icons/ri";
const SidebarRight = () => {
  const [selectedValue, setSelectedValue] = useState("List");
  const [bronList, setBronList] = useState([]);
  const { getBronList } = userIndex();

  const handleSegmentedChange = (value) => {
    setSelectedValue(value);
  };

  const fetchBron = async () => {
    try {
      const response = await getBronList();
      console.log("Response from API:", response.data);
      setBronList(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };
  const calculateDuration = (startHour, endHour) => {
    const start = new Date(`1970-01-01T${startHour}Z`);
    const end = new Date(`1970-01-01T${endHour}Z`);
    const duration = end - start;

    const hours = Math.floor(duration / (60 * 60 * 1000));
    const minutes = Math.floor((duration % (60 * 60 * 1000)) / (60 * 1000));

    return `${hours} час ${minutes > 0 ? `${minutes} мин` : ""}`;
  };
  useEffect(() => {
    fetchBron();
  }, []);

  return (
    <div className="">
      <div className="w-[100%] border flex justify-between ">
        <Segmented
          className="w-full m-3 pl-16 p-1"
          options={[
            {
              label: (
                <div className="w-[150px] h-[60px] flex items-center justify-center ">
                  <span className="text-[20px] font-medium">Live Сессии</span>
                </div>
              ),
              value: "List",
            },
            {
              label: (
                <div className="w-[150px] h-[60px] flex items-center justify-center ">
                  <span className="text-[20px] font-medium">Последние</span>
                </div>
              ),
              value: "Kanban",
            },
          ]}
          onChange={handleSegmentedChange}
          value={selectedValue}
        />
      </div>
      <div className="h-screen ">
        {selectedValue === "List" && (
          <div className="m-5 overflow-hidden h-[100%]">
            {[1, 2, 3].map((iteration) => (
              <div key={iteration} className="live">
                <div className="live-title">
                  <h2>
                    {bronList[iteration - 1]?.comment ||
                      "Title Title Title Title"}
                  </h2>
                </div>
                <div className="live-list">
                  <ul>
                    <li>
                      <p className="flex items-center gap-1">
                        <IoLocationOutline /> Комната
                      </p>{" "}
                      <span>{bronList[iteration - 1]?.room?.name}</span>
                    </li>
                    <li>
                      <p className="flex items-center gap-1">
                        <RiAccountCircleLine /> Сотрудник
                      </p>{" "}
                      <span>{bronList[iteration - 1]?.user.name}</span>
                    </li>
                    <li>
                      <p className="flex items-center gap-1">
                        <IoMdTime />
                        {`${bronList[iteration - 1]?.start_hour.slice(
                          0,
                          5
                        )} - ${bronList[iteration - 1]?.end_hour.slice(0, 5)}`}
                      </p>{" "}
                      <span>
                        {calculateDuration(
                          bronList[iteration - 1]?.start_hour,
                          bronList[iteration - 1]?.end_hour
                        )}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div>{selectedValue === "Kanban" && <p>Hello from Kanban</p>}</div>
    </div>
  );
};

export default SidebarRight;
// const [formData, setFormData] = useState({
//   name: "",
//   surname: "",
//   patronymic: "",
//   phone: "",
//   role: "",
//   department: "",
//   password: "",
//   confirmPassword: "",
// });
// const handleInputChange = (fieldName, value) => {
//   setFormData({ ...formData, [fieldName]: value });
//   setFormErrors({ ...formErrors, [fieldName]: "" }); // Pastdagi xabar niqobi o'chiriladi
// };
{
  /* <div className="modal">
<div className="modal-item">
  <form action="" className="modal-form" onSubmit={handleFormSubmit}>
    {requiredFields.map((field) => (
      <div key={field}>
        <Input
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          prefix={<UserOutlined className="site-form-item-icon" />}
          onChange={(e) => handleInputChange(field, e.target.value)}
          style={{
            borderColor: formErrors[field] ? "red" : "",
          }}
        />
        {formErrors[field] && (
          <div style={{ color: "red" }}>{formErrors[field]}</div>
        )}
      </div>
    ))}
    <div className="flex gap-5">
      <button onClick={() => showModal()}>Отмена</button>
      <button type="submit" onClick={handleFormSubmit}>
        Добавить
      </button>
    </div>
  </form>
</div>
</div> */
}
