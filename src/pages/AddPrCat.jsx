import React,{useEffect} from "react";
import { Input } from "antd";
import {addCategory, resetMessage} from "../features/category/categorySlice.js"
import { ToastContainer,toast } from "react-toastify";
import { PropagateLoader } from "react-spinners";
import {useDispatch,useSelector} from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
const AddPrCat = () => {

  const dispatch = useDispatch();
  const {isError,isSuccess,message,isLoading} = useSelector(state=>state.category)
  
  const formik = useFormik({
    initialValues:{
      title:"",
    },
    validationSchema:Yup.object({
      title:Yup.string().required("Category Name is Required")
    }),
    onSubmit:(values)=>{
      dispatch(addCategory(values))
      formik.resetForm()
      setTimeout(()=>{
        dispatch(resetMessage())
      },2000)
    }
  })

  useEffect(()=>{
    if(isSuccess&&message){
      toast.success(message)
    }
    else if(isError&&message){
      toast.error(message)
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
      <h1>Add Product Category</h1>
      <form onSubmit={formik.handleSubmit}>
        <Input
          className="custom-input"
          type="text"
          placeholder="Enter Category Name"
          value={formik.values.title}
          onChange={formik.handleChange("title")}
        />
        {formik.touched.title&&formik.errors.title?
          <div className="formik-error">{formik.errors.title}</div>:null
        }
        <button className="add-btn" type="submit">Add Category</button>
      </form>
    </div>
  );
};

export default AddPrCat;
