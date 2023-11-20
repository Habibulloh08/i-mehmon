// auth.js
export const getToken = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token not available");
  }

  return token;
};
