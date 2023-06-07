import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";

const login = async (userData) => {
  const response = await axios.post(`${baseUrl}user/admin/login`, userData, {
    headers: { "Content-Type": "application/json" },
  });
  localStorage.setItem("user",JSON.stringify(response.data))
  return response.data;
};
const authService = {
  login,
};
export default authService;
