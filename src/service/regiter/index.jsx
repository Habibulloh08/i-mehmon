import api from "../axios";

const useRegisterApi = () => {
  const login = async (data) =>
    api.post("/login", data);
  return { login };
};

export default useRegisterApi;
