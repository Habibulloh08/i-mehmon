// import { useNavigate } from "react-router-dom";
// import api from "../axios";

// const useUserList = () => {
//   const navigate = useNavigate();

//   const getToken = () => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       navigate("/login");
//     }

//     return token;
//   };

//   const getUserList = async (type, data) => {
//     try {
//       const token = getToken();
//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       };

//       let endpoint;

//       if (type === "top") {
//         endpoint = "/dashboard/list/top/user/ghost";
//       } else {
//         endpoint = "/dashboard/table/statistic/ghost";
//       }

//       const response = await api.get(endpoint, {
//         params: data,
//         headers: config,
//       });
//       return response.data;
//     } catch (error) {
//       throw new Error(`Error fetching user data: ${error.message}`);
//     }
//   };

//   return { getUserList };
// };

// export default useUserList;
