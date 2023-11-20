import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../service/axios";


const Login = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const useRegisterApi = () => {
    const login = async (data) =>
      api.post("https://dev.api.i-mehmon.uz/api/login", data);
    return { login };
  };

  const handleLogin = async () => {
    const { login } = useRegisterApi();
    try {
      const data = {
        phone: phone,
        password: password,
      };

      const response = await login(data);

      console.log(response.data);

      if (response.status === 200) {
        const responseData = response.data;
        if (responseData.access_token) {
          setToken(responseData.access_token);
          setError("");
          localStorage.setItem("token", responseData.access_token);
          window.alert(
            "Kirish muvaffaqiyatli amalga oshirildi. Token: " +
              responseData.access_token
          );

          sendTokenToServer(responseData.access_token);
        } else {
          setError("Kirish muvaffaqiyatsiz: Token mavjud emas");
        }
      } else {
        setError(`Kirish muvaffaqiyatsiz: ${response.status}`);
      }
    } catch (error) {
      setError(`Xatolik: ${error.message}`);
    }
  };

  const sendTokenToServer = async (token) => {
    try {
      const response = await api.post(
        "https://dev.api.i-mehmon.uz/api/send-token",
        { token }
      );
      console.log(response.data);
    } catch (error) {
      console.error(`Xatolik: ${error.message}`);
    }
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      window.alert("Siz ro'yxatdan muvaffaqiyatli o'tdingiz!");
      navigate("/");
    }
  }, [token, navigate]);



  return (
    <div>
      <h2>Kirish Formasi</h2>
      <div>
        <label>Telefon:</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div>
        <label>Parol:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>Kirish</button>
      {token && <p>Token: {token}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Login;
