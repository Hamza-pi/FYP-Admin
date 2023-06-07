import React,{useEffect} from "react";
import {useDispatch,useSelector} from "react-redux"
import { PropagateLoader } from "react-spinners";
import { Input } from "antd";
import { addBrand,resetMessage } from "../features/brand/brandSlice";
import {useFormik} from "formik"
import {ToastContainer,toast} from "react-toastify"
import * as Yup from "yup"
const AddBrand = () => {
  const dispatch = useDispatch()
  const {isError,message,isLoading}=useSelector(state=>state.brand)

  const formik = useFormik({
    initialValues:{
      title:""
    },
    validationSchema:Yup.object({
      title:Yup.string().required("Brand Name is Required")
    }),
    onSubmit:(values)=>{
      dispatch(addBrand(values))
      formik.resetForm();
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
      <h1>Add Brand</h1>
      <form onSubmit={formik.handleSubmit}>
        <Input
          className="custom-input"
          type="text"
          placeholder="Enter Brand Name"
          value={formik.values.title}
          onChange={formik.handleChange("title")}
        />
        {formik.touched.title&&formik.errors.title?
          <div className="formik-error">{formik.errors.title}</div>:null
        }
        <button className="add-btn" type="submit">Add Brand</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddBrand;
