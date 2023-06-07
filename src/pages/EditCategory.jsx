import React,{useEffect} from 'react'
import Input from 'antd/es/input/Input'
import { useFormik } from 'formik'
import { useSelector,useDispatch } from 'react-redux'
import * as Yup from "yup" 
import {  useParams } from 'react-router-dom'
import { resetMessage, updateCategory } from '../features/category/categorySlice'
import { PropagateLoader } from "react-spinners";
import {ToastContainer,toast} from "react-toastify"
import { getProducts } from '../features/product/productSlice'

const EditCategory = () => {

  const dispatch = useDispatch();
  const {id} = useParams()
  const {categories,isLoading,message,isError,isSuccess} = useSelector(state=>state.category)
  const {title} = categories?.find((categ)=>categ._id===id)

  const formik = useFormik({
    initialValues:{
      title:title
    },
    validationSchema:Yup.object({
      title:Yup.string().required("Category Name is Required")
    }),
    onSubmit:(values)=>{
      dispatch(updateCategory({id,title:values.title}))
      setTimeout(()=>{
        dispatch(resetMessage())
        dispatch(getProducts())
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
      <h1>Edit Category</h1>
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
        <button className="add-btn" type="submit">Upate Category</button>
      </form>
    </div>
  )
}

export default EditCategory