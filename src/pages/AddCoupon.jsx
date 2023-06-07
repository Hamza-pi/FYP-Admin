import React,{useEffect} from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import {Input } from "antd";
import {ToastContainer,toast} from "react-toastify";
import {useDispatch,useSelector} from "react-redux"
import { PropagateLoader } from "react-spinners";
import { addCoupon, resetMessage } from "../features/coupon/couponSlice";
const AddCoupon = () => {

  const dispatch = useDispatch()
  const {isError,message,isLoading}=useSelector(state=>state.coupon)

  useEffect(()=>{
    if(message!==""){
      toast.success(message)
    }
    else if(isError&&message){
      toast.error(message)
    }
  },[isError,message])

  const formik = useFormik({
    initialValues:{
      name:"",
      expiry:null,
      discount:0
    },
    validationSchema:Yup.object({
      name:Yup.string().required("Please Enter Name Of Coupon"),
      expiry:Yup.date().required("Please Select Expiry Date"),
      discount:Yup.number().min(1).required("Please Give The Discount Of Coupon")
    }),
    onSubmit:(values)=>{
      dispatch(addCoupon(values))
      formik.resetForm()
      setTimeout(()=>{
        dispatch(resetMessage())
      },2000)
    }
  })

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
      <h1>Create Coupon</h1>
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
        <button className="add-btn" type="submit">Create Coupon</button>
      </form>
    </div>
  );
};

export default AddCoupon;
