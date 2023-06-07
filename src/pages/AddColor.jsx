import React,{useEffect} from "react";
import {useDispatch,useSelector} from "react-redux"
import { PropagateLoader } from "react-spinners";
import { Input } from "antd";
import { addColor, resetMessage } from "../features/color/colorSlice";
import {useFormik} from "formik"
import {ToastContainer,toast} from "react-toastify"
import * as Yup from "yup"
const AddColor = () => {


  const dispatch = useDispatch()
  const {isError,isSuccess,message,isLoading}=useSelector(state=>state.color)

  const formik = useFormik({
    initialValues:{
      value:"#000000"
    },
    validationSchema:Yup.object({
      value:Yup.string().required("Color Value is Required")
    }),
    onSubmit:(values)=>{
      dispatch(addColor(values))
      formik.resetForm();
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
  },[isError,isSuccess,message])

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
      <h1>Add Color</h1>
      <form onSubmit={formik.handleSubmit}>
        <Input className="custom-input" type="color" value={formik.values.value} onChange={formik.handleChange("value")}/>
        {formik.touched.value&&formik.errors.value?
          <div className="formik-error">{formik.errors.value}</div>:null
        }
        <button className="add-btn" type="submit">Add Color</button>

      </form>
    </div>
  );
};

export default AddColor;
