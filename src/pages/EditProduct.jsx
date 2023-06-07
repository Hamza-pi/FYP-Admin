import React,{useEffect,useRef} from 'react'
import {Button, Select, Input} from "antd";
import ReactQuill from 'react-quill';
import { useFormik } from 'formik'
import { useSelector,useDispatch } from 'react-redux'
import * as Yup from "yup" 
import {  useParams } from 'react-router-dom'
import { resetMessage, updateProduct } from '../features/product/productSlice'
import { getColor } from "../features/color/colorSlice";
import { getBrand } from "../features/brand/brandSlice";
import { getCategory } from "../features/category/categorySlice";
import { PropagateLoader } from "react-spinners";
import {ToastContainer,toast} from "react-toastify"

const EditProduct = () => {

  const dispatch = useDispatch();

  const {id} = useParams()
  const {products,isLoading,message,isError,isSuccess} = useSelector(state=>state.product)
  const {colors} = useSelector(state=>state.color);
  const {categories} = useSelector(state=>state.category);
  const {brands} = useSelector(state=>state.brand);

  const {title,description,category,brand,color,price,qty,tags,images} = products?.find((product)=>product._id===id)

  const brandOptions = brands.map((brand)=>{
    const option={
      value:brand._id,
      label:brand.title
    }
    return option
  })
  const colorOptions = colors.map((color)=>{
    const option={
      value:color._id,
      label: <div
      className="color-cont"
      style={{ backgroundColor: `${color.value}` }}
    ></div>
    }
    return option
  })
  const categOptions = categories.map((categ)=>{
    const option={
      value:categ._id,
      label:categ.title
    }
    return option
  })
  const tagOptions = [
    {
      value:"Featured",
      label:"Featured"
    },
    {value:"Popular",label:"Popular"},
    {value:"Special",label:"Special"}
  ]

  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  

  const formik = useFormik({
    initialValues:{
      title:title,
      description:description,
      category:category._id,
      brand:brand._id,
      color:color._id,
      price:price,
      qty:qty,
      tags:tags,
      images:images
    },
    validationSchema:Yup.object({
      title: Yup.string().required("Title is Required"),
      description:Yup.string().required("Description is Required"),
      category:Yup.string().required("Please choose category of product"),
      brand:Yup.string().required("Please choose brand of product"),
      tags:Yup.string().required("Tag is Required"),
      color:Yup.string().required("Please choose color of product"),
      price: Yup.number().required("Price Must be greater then 1").min(1),
      qty:Yup.number().required("Quantity Must be greater then 1").min(1),
      images: Yup.array().max(5).required("Image is required"),
    }),
    onSubmit:(values)=>{
     dispatch(updateProduct({id,values}))
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
    else if(colors.length===0){
      dispatch(getColor())
    }
    else if(categories.length===0){
      dispatch(getCategory())
    }
    else if(brands.length===0){
      dispatch(getBrand())
    }
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current?.createUploadWidget(
      {
        cloudName: "dnjfhrxo2",
        uploadPreset: "ra91jfuu",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          formik.setFieldValue("images",[...formik.values.images,result.info.secure_url])
        }
      }
    );
  },[formik,isSuccess,isError,message,dispatch,colors.length,brands.length,categories.length])

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
    <h1>Edit Product</h1>
    
    <form onSubmit={formik.handleSubmit}>
      <Input
        className="custom-input"
        type="text"
        placeholder="Add Product Title"
        value={formik.values.title}
        onChange={formik.handleChange("title")}
      />
      
        {formik.touched.title && formik.errors.title ? (
        <div className="formik-error">{formik.errors.title}</div>
      ) : null}

      <p style={{padding:"10px 5px",fontWeight:"bolder",fontSize:"15px"}}>Price</p>

      <Input
        className="custom-input"
        type="number"
        placeholder="Enter Product Price"
        value={formik.values.price}
        onChange={formik.handleChange("price")}
      />

        {formik.touched.price && formik.errors.price ? (
        <div className="formik-error">{formik.errors.price}</div>
      ) : null}

      <p style={{padding:"10px 5px",fontWeight:"bolder",fontSize:"15px"}}>Quantity</p>

      <Input
        className="custom-input"
        type="number"
        placeholder="Enter Product Quantity"
        value={formik.values.qty}
        onChange={formik.handleChange("qty")}
      />

        {formik.touched.qty && formik.errors.qty ? (
        <div className="formik-error">{formik.errors.qty}</div>
      ) : null}

      <p style={{padding:"10px 5px",fontWeight:"bolder",fontSize:"15px"}}>Tag</p>

      <Select
        className="select-input"
        placeholder="Select Tag"
        options={tagOptions}
        value={formik.values.tags}
        onChange={formik.handleChange("tags")}
      />

      {formik.touched.tags && formik.errors.tags ? (
        <div className="formik-error">{formik.errors.tags}</div>
      ) : null}

      <p style={{padding:"10px 5px",fontWeight:"bolder",fontSize:"15px"}}>Description</p>

      <ReactQuill theme="snow" value={formik.values.description} onChange={formik.handleChange("description")} />;
      
      {formik.touched.description && formik.errors.description ? (
        <div className="formik-error">{formik.errors.description}</div>
      ) : null}

      <p style={{padding:"10px 5px",fontWeight:"bolder",fontSize:"15px"}}>Brand</p>

      <Select
        className="select-input"
        placeholder="Select Brand"
        value={formik.values.brand}
        onChange={formik.handleChange("brand")}
        options={brandOptions}
      />

      {formik.touched.brand && formik.errors.brand ? (
        <div className="formik-error">{formik.errors.brand}</div>
      ) : null}

      <p style={{padding:"10px 5px",fontWeight:"bolder",fontSize:"15px"}}>Category</p>

      <Select
        className="select-input"
        placeholder="Select Category"
        options={categOptions}
        value={formik.values.category}
        onChange={formik.handleChange("category")}
      />

      {formik.touched.category && formik.errors.category ? (
        <div className="formik-error">{formik.errors.category}</div>
      ) : null}

      <p style={{padding:"10px 5px",fontWeight:"bolder",fontSize:"15px"}}>Color</p>

      <Select
        placeholder="Select Color"
        options={colorOptions}
        className="select-input"
        allowClear
        value={formik.values.color}
        onChange={formik.handleChange("color")}
      />

      {formik.touched.color && formik.errors.color ? (
        <div className="formik-error">{formik.errors.color}</div>
      ) : null}

      <Button onClick={() => widgetRef.current.open()}>Upload Image</Button>

      {formik.values.images.length===0?formik.touched.images && formik.errors.images ? (
        <div className="formik-error">{formik.errors.images}</div>
      ) : null:null}

      <br/>
      <br/>
      <div className="image-container">
        {
          formik.values.images?.map((image,key)=>(
            <img key={key} src={image} alt="prdctimg"/>
          ))
        }
      </div>

      <button className="add-btn" type="submit">Update Product</button>
    </form>
  </div>
  )
}

export default EditProduct