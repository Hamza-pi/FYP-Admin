import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import {token} from "../../utils/token"

const getOrders = async () => {
  const response = await axios.get(`${baseUrl}user/order`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
const customerService = {
  getOrders,
};
export default customerService;
