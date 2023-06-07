import React,{useEffect} from "react";
import {Table} from "antd"
import { useDispatch,useSelector } from "react-redux";
import { getOrders } from "../features/order/orderSlice";
import { BiEdit } from "react-icons/bi";
import { Link } from "react-router-dom";
const Orders = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);
  const columns = [
    {
      title: "No",
      dataIndex: "_id",
    },
    {
      title: "Products",
      dataIndex: "products",
      render:(products)=>{
        return products.map((product,key)=>(
          <div key={key+1} className="order_prdct">
            <p key={product._id}>{product.product.title} <span className="qty" key={key}>{product.quantity}</span></p>
          </div>
        ))
      }
    },
    {
      title:"Total Amout",
      dataIndex:"amount",
      render: (value) => {
        return (
          <>
            ${value}
          </>
        );
      },
    },
    {
      title:"Total After Discount",
      dataIndex:"discount",
      render: (value) => {
        return (
          <>
            ${value}
          </>
        );
      },
    },
    {
      title:"Ordered On",
      dataIndex:"orderDate"
    },
    {
      title:"Ordered By",
      dataIndex:"orderby"
    },
    {
      title:"Status",
      dataIndex:"status"
    },
  ];
  const data = [];
  for (let i = 0; i < orders.length; i++) {
    data.push({
      key: orders[i]._id,
      _id: i+1,
      products:orders[i].orderItems.map((item)=>item),
      amount:orders[i].totalPrice,
      discount:orders[i].totalPriceAfterDiscount,
      orderDate:orders[i].createdAt,
      status:orders[i].orderStatus,
      orderby:orders[i].user.firstname,
    });
  }
  return (
    <div className="orders-container">
      <h1>Orders</h1>
      <Table columns={columns} dataSource={data}/>
    </div>
  );
};

export default Orders;
