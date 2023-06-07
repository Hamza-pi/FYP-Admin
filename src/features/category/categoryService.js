import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import {token} from "../../utils/token"

const getCategory = async () => {
  const response = await axios.get(`${baseUrl}category`);

  return response.data;
};

const addCategory = async(data)=>{
  const response = await axios.post(`${baseUrl}category/add`,data,{headers:{"Authorization":`Bearer ${token}`}});

  return response.data;
}

const delCategory = async(id)=>{
  const response = await axios.delete(`${baseUrl}category/delete/${id}`,{headers:{"Authorization":`Bearer ${token}`}});

  return response.data;
}

const editCategory = async(data)=>{
  const {id,title} = data;

  const response = await axios.put(`${baseUrl}category/update/${id}`,{title},{headers:{"Authorization":`Bearer ${token}`}});

  return response.data;

}

const categoryService = {
  getCategory,
  addCategory,
  delCategory,
  editCategory
};
export default categoryService;
