import React, { useEffect } from "react";
import { Table } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { getAllCoupons ,delCoupon} from "../features/coupon/couponSlice";
import { PropagateLoader } from "react-spinners";
import { Link } from "react-router-dom";

const Coupon = () => {

  const dispatch = useDispatch();
  const { coupons,isLoading } = useSelector((state) => state.coupon);
 
  useEffect(() => {
    if(coupons.length===0){
      dispatch(getAllCoupons()); 
    }   
  }, [dispatch,coupons.length]);

  const columns = [
    {
      title: "No",
      dataIndex: "_id",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title:"Expiry Date",
      dataIndex:"expiry"
    },
    {
      title:"Discount",
      dataIndex:"discount"
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];
  const data = [];
  for (let i = 0; i < coupons.length; i++) {
    data.push({
      key: coupons[i]._id,
      _id: i+1,
      name: coupons[i].name,
      expiry:new Date(coupons[i].expiry).toDateString(),
      discount:coupons[i].discount,
      action: (
        <div className="action">
          <Link to={`/admin/edit-coupon/${coupons[i]._id}`}>
            <BiEdit />
          </Link>
          <button onClick={()=>dispatch(delCoupon(coupons[i]._id))}>
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

export default Coupon;
