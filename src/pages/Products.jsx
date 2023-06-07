import React, { useEffect } from "react";
import { Table } from "antd";
import {Link} from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { getProducts,delProduct } from "../features/product/productSlice";
import { PropagateLoader } from "react-spinners";

const Products = () => {
  const dispatch = useDispatch();
  const { products,isLoading } = useSelector((state) => state.product);

  useEffect(() => {
    if(products.length===0){
      dispatch(getProducts());
    }

  },[dispatch,products.length]);

  const columns = [
    {
      title: "No",
      dataIndex: "_id",
    },
    {
      title:"Image",
      dataIndex:"image",
      render: (value) => {
        return (
          <>
            <img src={value} alt="Product Img" width={100} height={100} />
          </>
        );
      },
    },
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (value) => {
        return (
          <>
            <>${value}</>
          </>
        );
      },
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Quantity",
      dataIndex: "qty",
      sorter: (a, b) => a.qty - b.qty,
    },
    {
      title: "Brand",
      dataIndex: "brand",
    },
    {
      title: "Color",
      dataIndex: "color",
    },
    {
      title: "Sold",
      dataIndex: "sold",
      sorter: (a, b) => a.sold - b.sold,
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];
  const data = [];
  for (let i = 0; i < products.length; i++) {
    data.push({
      key: products[i]._id,
      _id: i+1,
      title: products[i].title,
      image:products[i].images[0],
      category:products[i].category.title,
      price: products[i].price,
      qty: products[i].qty,
      brand: products[i].brand.title,
      color: products[i].color.value,
      sold: products[i].sold,
      action: (
        <div className="action">
          <Link to={`/admin/edit-product/${products[i]._id}`}>
            <BiEdit />
          </Link>
          <button onClick={()=>dispatch(delProduct(products[i]._id))}>
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
      <h1>Products List</h1>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default Products;
