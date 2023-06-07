import React,{useEffect} from 'react'
import Input from 'antd/es/input/Input'
import { useFormik } from 'formik'
import { useSelector,useDispatch } from 'react-redux'
import * as Yup from "yup" 
import {  useParams } from 'react-router-dom'
import { resetMessage,updateCoupon } from '../features/coupon/couponSlice';
import { PropagateLoader } from "react-spinners";
import {ToastContainer,toast} from "react-toastify"

const EditBrand = () => {

  const dispatch = useDispatch();
  const {id} = useParams()
  const {coupons,isLoading,message,isError} = useSelector(state=>state.coupon)
  const {name,expiry,discount} = coupons?.find((coupon)=>coupon._id===id)


  const formik = useFormik({
    initialValues:{
      name:name,
      expiry:new Date(expiry).toISOString().split('T')[0],
      discount:discount
    },
    validationSchema:Yup.object({
      name:Yup.string().required("Please Enter Name Of Coupon"),
      expiry:Yup.date().required("Please Select Expiry Date"),
      discount:Yup.number().min(1).required("Please Give The Discount Of Coupon")
    }),
    onSubmit:(values)=>{
        dispatch(updateCoupon({id,values}))
        setTimeout(()=>{
          dispatch(resetMessage())
        },2000)
    }
  })


  useEffect(()=>{
    if(message!==""){
      toast.success(message)
    }
    else if(isError&&message){
      toast.error(message)
    }
  },[isError,message])

  const override = {
    display: "block",
    margin: "100px 0 0 500px",
    borderColor: "red",
  };
  if (isLoading) {
    return <PropagateLoader color="#fdd333" cssOverride={override} />;
  }

  return (
    <div className="add-product">
    <ToastContainer/>
      <h1>Edit Coupon</h1>
      <form onSubmit={formik.handleSubmit}>
        <Input
          className="custom-input"
          type="text"
          placeholder="Add Coupon Name"
          value={formik.values.name}
          onChange={formik.handleChange("name")}
        />
         {formik.touched.name&&formik.errors.name?
          <div className="formik-error">{formik.errors.name}</div>:null
        }
        <Input
          className="custom-input"
          type="number"
          placeholder="Enter Coupon Discount"
          value={formik.values.discount}
          onChange={formik.handleChange("discount")}
        />
         {formik.touched.discount&&formik.errors.discount?
          <div className="formik-error">{formik.errors.discount}</div>:null
        }
        <Input
          className="custom-input"
          type="date"
          placeholder="Enter Coupon Expiry"
          value={formik.values.expiry}
          onChange={formik.handleChange("expiry")}
        />
        {formik.touched.expiry&&formik.errors.expiry?
          <div className="formik-error">{formik.errors.expiry}</div>:null
        }
        <button className="add-btn" type="submit">Update Coupon</button>
      </form>
    </div>
  )
}

export default EditBrand