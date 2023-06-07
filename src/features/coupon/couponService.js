import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import { token } from "../../utils/token";

const getAllCoupons =async ()=>{
    const response = await axios.get(`${baseUrl}coupon/`,{headers:{'Authorization':`Bearer ${token}`}})
    return response.data
}

const addCoupon = async(data)=>{
    const response = await axios.post(`${baseUrl}coupon/add`,data,{headers:{"Authorization":`Bearer ${token}`}});
  
    return response.data;
}

const delCoupon = async(id)=>{
    const response = await axios.delete(`${baseUrl}coupon/delete/${id}`,{headers:{"Authorization":`Bearer ${token}`}});
  
    return response.data;
}

const editCoupon = async(data)=>{
    const {id,values} = data
    
    const response = await axios.put(`${baseUrl}coupon/update/${id}`,values,{headers:{"Authorization":`Bearer ${token}`}});
  
    return response.data;
}

const couponService = {
    getAllCoupons,
    addCoupon,
    delCoupon,
    editCoupon
}

export default couponService