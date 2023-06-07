import React, { useEffect } from "react";
import { Table } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { PropagateLoader } from "react-spinners";
import { getBrand,delBrand } from "../features/brand/brandSlice";
import { Link } from "react-router-dom";
import { getProducts } from "../features/product/productSlice";

const Brands = () => {
  const dispatch = useDispatch();
  const { brands,isLoading } = useSelector((state) => state.brand);

  useEffect(() => {
     if(brands.length===0){
      dispatch(getBrand());
     }
  }, [dispatch,brands.length]);

  const columns = [
    {
      title: "No",
      dataIndex: "_id",
    },
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];
  const data = [];
  for (let i = 0; i < brands.length; i++) {
    data.push({
      key: brands[i]._id,
      _id: i+1,
      title: brands[i].title,
      action: (
        <div className="action">
          <Link to={`/admin/edit-brand/${brands[i]._id}`}>
            <BiEdit />
          </Link>
          <button onClick={()=>{
            dispatch(delBrand(brands[i]._id));
            setTimeout(()=>{
              dispatch(getProducts())
            },2000)
          }}>
            <AiFillDelete />
          </button>
        </div>
      ),
    });
  }

  const override = {
    display: "block",
    margin: "100px 0 0 500px",
    borderColor: "red",
  };
  if (isLoading) {
    return <PropagateLoader color="#fdd333" cssOverride={override} />;
  }

  return (
    <div className="orders-container">
      <h1>Brands List</h1>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default Brands;
