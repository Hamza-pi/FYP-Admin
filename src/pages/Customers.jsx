import React,{useEffect} from "react";
import { Table } from "antd";
import { useSelector,useDispatch } from "react-redux";
import { getUsers } from "../features/customers/customerSlice";

const Customers = () => {
  const dispatch = useDispatch()
  const { customers } = useSelector((state) => state.customer);
  
  useEffect(() => {
    if(customers.length===0){
      dispatch(getUsers());
    }
  }, [dispatch,customers.length]);

  const columns = [
    {
      title: "No",
      dataIndex: "_id",
    },
    {
      title: "First Name",
      dataIndex: "firstname",
    },
    {
      title: "Last name",
      dataIndex: "lastname",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
    },
  ];

  const data = [];
  for (let i = 0; i < customers.length; i++) {
    if(customers[i].role!=="admin"){
      data.push({
        key: customers[i]._id,
        _id: i+1,
        firstname: customers[i].firstname,
        lastname: customers[i].lastname,
        email: customers[i].email,
        mobile: customers[i].mobile,
      });
    }
  }

  return (
    <div className="orders-container">
      <h1>Customers</h1>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default Customers;
