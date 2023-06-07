import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import {token} from "../../utils/token"


const getProducts = async () => {
  const response = await axios.get(`${baseUrl}product`);

  return response.data;
};


const addProduct = async (data) => {
  const response = await axios.post(`${baseUrl}product/add`,data,{headers:{"Authorization":`Bearer ${token}`}});

  return response.data;
};

const delProduct = async(id)=>{
  const response = await axios.delete(`${baseUrl}product/delete/${id}`,{headers:{"Authorization":`Bearer ${token}`}});
  return response.data
}

const editProduct=async(data)=>{
  
  const {id,values} = data;

  const response = await axios.put(`${baseUrl}product/update/${id}`,values,{headers:{"Authorization":`Bearer ${token}`}});
 
  console.log(response.data)
}

const productService = {
  getProducts,
  addProduct,
  delProduct,
  editProduct
};
export default productService;
