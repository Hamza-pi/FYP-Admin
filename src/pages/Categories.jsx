import React, { useEffect } from "react";
import { Table } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { getCategory,delCategory } from "../features/category/categorySlice";
import { getProducts } from "../features/product/productSlice";
import { PropagateLoader } from "react-spinners";
import { Link } from "react-router-dom";
const Categories = () => {
  const dispatch = useDispatch();
  const { categories,isLoading } = useSelector((state) => state.category);
  
  useEffect(() => {
    if(categories.length===0){
      dispatch(getCategory());
    }
  }, [dispatch,categories.length]);

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
  for (let i = 0; i < categories.length; i++) {
    data.push({
      key: categories[i]._id,
      _id: i+1,
      title: categories[i].title,
      action: (
        <div className="action">
           <Link to={`/admin/edit-category/${categories[i]._id}`}>
            <BiEdit />
          </Link>
          <button onClick={()=>{
            dispatch(delCategory(categories[i]._id));
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
      <h1>Categories List</h1>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default Categories;
