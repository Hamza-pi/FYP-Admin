import React,{useEffect} from 'react'
import Input from 'antd/es/input/Input'
import { useFormik } from 'formik'
import { useSelector,useDispatch } from 'react-redux'
import * as Yup from "yup" 
import {  useParams } from 'react-router-dom'
import { resetMessage, updateColor } from '../features/color/colorSlice'
import { PropagateLoader } from "react-spinners";
import {ToastContainer,toast} from "react-toastify"
import { getProducts } from '../features/product/productSlice'

const EditColor = () => {

  const dispatch = useDispatch();
  const {id} = useParams()
  const {colors,isLoading,message,isError} = useSelector(state=>state.color)
  const {value} = colors?.find((color)=>color._id===id)

  const formik = useFormik({
    initialValues:{
      value:value
    },
    validationSchema:Yup.object({
      value:Yup.string().required("Color's Value is Required")
    }),
    onSubmit:(values)=>{
      dispatch(updateColor({id,value:values.value}))
      setTimeout(()=>{
        dispatch(resetMessage())
        dispatch(getProducts())
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
      <h1>Edit Color</h1>
      <form onSubmit={formik.handleSubmit}>
        <Input
          className="custom-input"
          type="color"
          value={formik.values.value}
          onChange={formik.handleChange("value")}
        />
        {formik.touched.value&&formik.errors.value?
          <div className="formik-error">{formik.errors.value}</div>:null
        }
        <button className="add-btn" type="submit">Upate Color</button>
      </form>
    </div>
  )
}

export default EditColor