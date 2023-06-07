import React,{useEffect} from 'react'
import Input from 'antd/es/input/Input'
import { useFormik } from 'formik'
import { useSelector,useDispatch } from 'react-redux'
import * as Yup from "yup" 
import {  useParams } from 'react-router-dom'
import { resetMessage, updateBrand } from '../features/brand/brandSlice'
import { PropagateLoader } from "react-spinners";
import {ToastContainer,toast} from "react-toastify"
import { getProducts } from '../features/product/productSlice'

const EditBrand = () => {

  const dispatch = useDispatch();
  const {id} = useParams()
  const {brands,isLoading,message,isError} = useSelector(state=>state.brand)
  const {title} = brands?.find((brand)=>brand._id===id)

  const formik = useFormik({
    initialValues:{
      title:title
    },
    validationSchema:Yup.object({
      title:Yup.string().required("Brand Name is Required")
    }),
    onSubmit:(values)=>{
      dispatch(updateBrand({id,title:values.title}))
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
      <h1>Edit Brand</h1>
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
        <button className="add-btn" type="submit">Upate Brand</button>
      </form>
    </div>
  )
}

export default EditBrand