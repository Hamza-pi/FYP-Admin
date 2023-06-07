import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import { token } from "../../utils/token";

const getColor = async () => {
  const response = await axios.get(`${baseUrl}color`);

  return response.data;
};

const addColor = async(data)=>{
  const response = await axios.post(`${baseUrl}color/add`,data,{headers:{"Authorization":`Bearer ${token}`}});

  return response.data;
}

const delColor = async(id)=>{
  const response = await axios.delete(`${baseUrl}color/delete/${id}`,{headers:{"Authorization":`Bearer ${token}`}});

  return response.data;
}

const editColor = async(data)=>{

  const {id,value}=data

  const response = await axios.put(`${baseUrl}color/update/${id}`,{value},{headers:{"Authorization":`Bearer ${token}`}});

  return response.data;
}


const colorService = {
  getColor,
  addColor,
  delColor,
  editColor
};
export default colorService;
