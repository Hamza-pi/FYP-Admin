import React, { useEffect } from "react";
import Card from "../components/Cards";
import { Table } from "antd";
import { Column, Pie } from "@ant-design/plots";
import { PropagateLoader } from "react-spinners";
import { useSelector, useDispatch } from "react-redux";
import { getOrders } from "../features/order/orderSlice";
const Dashboard = () => {
  const dispatch = useDispatch();
  const { orders, isLoading } = useSelector((state) => state.order);

  useEffect(() => {

    dispatch(getOrders())

  },[dispatch]);

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
      dataIndex:"amount"
    },
    {
      title:"Total After Discount",
      dataIndex:"discount"
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
  const data1 = [];
  for (let i = 0; i < orders.length; i++) {
    data1.push({
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

  const override = {
    display: "block",
    margin: "100px 0 0 500px",
    borderColor: "red",
  };
  if (isLoading) {
    return <PropagateLoader color="#fdd333" cssOverride={override} />;
  }

  const data = [
    {
      month: "Jan",
      sales: 38,
    },
    {
      month: "Feb",
      sales: 52,
    },
    {
      month: "Mar",
      sales: 61,
    },
    {
      month: "Apr",
      sales: 145,
    },
    {
      month: "May",
      sales: 48,
    },
    {
      month: "Jun",
      sales: 38,
    },
    {
      month: "Jul",
      sales: 48,
    },
    {
      month: "Aug",
      sales: 28,
    },
    {
      month: "Sept",
      sales: 50,
    },
    {
      month: "Oct",
      sales: 80,
    },
    {
      month: "Nov",
      sales: 60,
    },
    {
      month: "Dec",
      sales: 68,
    },
  ];
  const config = {
    data,
    xField: "month",
    yField: "sales",
    color: "#fdd333",
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "",
      },
      sales: {
        alias: "",
      },
    },
  };
  const pconfig = {
    appendPadding: 10,
    data,
    angleField: "sales",
    colorField: "month",
    radius: 0.8,
    label: {
      type: "outer",
      content: "{name} {percentage}",
    },
    interactions: [
      {
        type: "pie-legend-active",
      },
      {
        type: "element-active",
      },
    ],
  };
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="cards">
        <Card total={1100} percentage={10} icon={"up"} color={"green"} />
        <Card total={100} percentage={40} icon={"down"} color={"red"} />
        <Card total={1300} percentage={50} icon={"up"} color={"green"} />
      </div>
      <h2 className="recent-orders">Income Statistics</h2>
      <div className="dsb-chart">
        <Column {...config} />
        <Pie {...pconfig} />
      </div>
      <h2 className="recent-orders">Recent Orders</h2>
      <Table columns={columns} dataSource={data1} />
    </div>
  );
};

export default Dashboard;
