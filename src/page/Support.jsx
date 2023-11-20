import React from "react";
import SupportImage from "../assets/support.svg";
const Support = () => {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="flex-col translate-x-28 ">
        <img src={SupportImage} alt="" /> <br />
        <p className="text-left text-[24px] w-[60%]">
          Если у вас возниклы вопросы, можете написать об этом админу в Telegram
        </p>
      </div>
    </div>
  );
};

export default Support;
// import api from "../axios";

// const userIndex = () => {
//   const getUserList = async (type, data) => {
//     try {
//       let endpoint;

//       if (type === "counts") {
//         endpoint = "/statistic/get/counts";
//       } else if (type === "visits") {
//         endpoint = "/visit/list";
//       } else {
//         throw new Error("Invalid user list type");
//       }

//       const response = await api.get(endpoint, {
//         ...data,
//       });

//       return response.data;
//     } catch (error) {
//       throw new Error(`Error fetching user data: ${error.message}`);
//     }
//   };

//   return { getUserList };
// };

// export default userIndex;
// if (
//   response &&
//   typeof response === "object" &&
//   Object.keys(response).length > 0
// ) {
//   setUserData(response);
// } else {
//   console.error("Invalid response format:", response);
// }