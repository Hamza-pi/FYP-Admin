import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import {token} from "../../utils/token"
const getUsers = async () => {
  const response = await axios.get(`${baseUrl}user/all_users`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};
const customerService = {
  getUsers,
};
export default customerService;
