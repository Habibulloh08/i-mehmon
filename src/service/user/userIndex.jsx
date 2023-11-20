import api from "../axios";

const config = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  },
};

const userIndex = () => {
  const getUserList = () => api.get("/visit/list", config);
  const getUserCount = () => api.get("/statistic/get/counts", config);
  const getTable = (start_date, end_date) =>
    api.get("/dashboard/table/statistic/ghost", {
      ...config,
      params: {
        start_date,
        end_date,
      },
    });
  const getTopUser = (start_date, end_date) =>
    api.get("/dashboard/list/top/user/ghost", {
      ...config,
      params: {
        start_date,
        end_date,
      },
    });
  const getBronList = () => api.get("bron/list", config);
  const postUser = (data) => api.post("manager/user/add", data, config);
  return {
    getUserList,
    getUserCount,
    getTable,
    getTopUser,
    getBronList,
    postUser,
  };
};

export default userIndex;