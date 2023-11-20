import React, { useState } from "react";
import {
  UserOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { Input } from "antd";
import userIndex from "../service/user/userIndex";

const Modal = ({ showModal }) => {
  const { postUser } = userIndex();
  const [invalidFields, setInvalidFields] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    patronymic: "",
    phone: "",
    role: "",
    department: "",
    password: "",
    confirmPassword: "",
  });
  const requiredFields = [
    "name",
    "surname",
    "phone",
    "password",
    "role_id",
    "department_id",
    "confirmPassword",
  ];

  const handleInputChange = (fieldName, value) => {
    if (fieldName === "role") {
      setFormData({ ...formData, [fieldName]: parseInt(value, 10) });
    } else {
      setFormData({ ...formData, [fieldName]: value });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const invalidFields = requiredFields.filter((field) => !formData[field]);

    if (
      !formData.name ||
      !formData.surname ||
      !formData.phone ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      window.alert("Please fill in all required fields ");
      setInvalidFields(invalidFields);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      window.alert("Passwords do not match");
      setInvalidFields(["password", "confirmPassword"]);
      return;
    }

    setInvalidFields([]);
    const body = {
      name: formData.name,
      surname: formData.surname,
      patronymic: formData.patronymic,
      phone: formData.phone,
      role_id: formData.role,
      department_id: formData.department,
      password: formData.password,
      password_confirmation: formData.confirmPassword,
    };

    try {
      const response = await postUser(body);
      console.log("User added successfully:", response.data);
      showModal(false);
    } catch (error) {
      console.error("Error adding user:", error);
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.errors
      ) {
        const errorMessage = error.response.data.errors[0].message;
        window.alert(`Invalid input: ${errorMessage}`);
      }
    }
  };

  return (
    <div className="modal">
      <div className="modal-item">
        <form action="" className="modal-form" onSubmit={handleFormSubmit}>
          <Input
            placeholder="Имя"
            prefix={<UserOutlined className="site-form-item-icon" />}
            onChange={(e) => handleInputChange("name", e.target.value)}
            style={{ borderColor: invalidFields.includes("name") ? "red" : "" }}
          />
          <Input
            placeholder="Фамилия"
            prefix={<UserOutlined className="site-form-item-icon" />}
            onChange={(e) => handleInputChange("surname", e.target.value)}
            style={{
              borderColor: invalidFields.includes("surname") ? "red" : "",
            }}
          />
          <Input
            placeholder="Отчество"
            prefix={<UserOutlined className="site-form-item-icon" />}
            onChange={(e) => handleInputChange("patronymic", e.target.value)}
            style={{
              borderColor: invalidFields.includes("patronymic") ? "red" : "",
            }}
          />
          <Input
            placeholder="Телефон"
            prefix={<UserOutlined className="site-form-item-icon" />}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            style={{
              borderColor: invalidFields.includes("phone") ? "red" : "",
            }}
          />
          <Input
            placeholder="Роль"
            prefix={<UserOutlined className="site-form-item-icon" />}
            onChange={(e) => handleInputChange("role", e.target.value)}
            style={{
              borderColor: invalidFields.includes("role_id") ? "red" : "",
            }}
          />
          <Input
            placeholder="Отдел"
            prefix={<UserOutlined className="site-form-item-icon" />}
            onChange={(e) => handleInputChange("department", e.target.value)}
            style={{
              borderColor: invalidFields.includes("department_id") ? "red" : "",
            }}
          />
          <Input.Password
            placeholder="Пароль"
            onChange={(e) => handleInputChange("password", e.target.value)}
            style={{
              borderColor: invalidFields.includes("password") ? "red" : "",
            }}
          />
          <Input.Password
            placeholder="Подтвердите пароль"
            style={{
              borderColor: invalidFields.includes("password_confirmation")
                ? "red"
                : "",
            }}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            onChange={(e) =>
              handleInputChange("confirmPassword", e.target.value)
            }
          />
          <div className="flex gap-5">
            <button onClick={() => showModal()}>Отмена</button>
            <button type="submit" onClick={handleFormSubmit}>
              Добавить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
