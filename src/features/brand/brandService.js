import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import { token } from "../../utils/token";

const getBrand = async () => {
  const response = await axios.get(`${baseUrl}brand`);

  return response.data;
};

const addBrand = async(data)=>{
  const response = await axios.post(`${baseUrl}brand/add`,data,{headers:{"Authorization":`Bearer ${token}`}});

  return response.data;
}

const delBrand = async(id)=>{
  const response = await axios.delete(`${baseUrl}brand/delete/${id}`,{headers:{"Authorization":`Bearer ${token}`}});

  return response.data;
}

const editBrand = async(data)=>{
  const {id,title} = data
  const response = await axios.put(`${baseUrl}brand/update/${id}`,{title},{headers:{"Authorization":`Bearer ${token}`}});
  
  return response.data
}


const brandService = {
  getBrand,
  addBrand,
  delBrand,
  editBrand
};
export default brandService;
