import React, { useEffect } from "react";
import { Table } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { PropagateLoader } from "react-spinners";
import { getColor,delColor } from "../features/color/colorSlice";
import { getProducts } from "../features/product/productSlice";
import { Link } from "react-router-dom";

const Colors = () => {
  const dispatch = useDispatch();
  const { colors,isLoading } = useSelector((state) => state.color);
  
  useEffect(() => {
      if(colors.length===0){
        dispatch(getColor());
      }
  }, [dispatch,colors.length]);

  const columns = [
    {
      title: "No",
      dataIndex: "_id",
    },
    {
      title: "Color",
      dataIndex: "value",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];
  const data = [];
  for (let i = 0; i < colors.length; i++) {
    data.push({
      key: colors[i]._id,
      _id: i+1,
      value: (
        <div
          className="color-cont"
          style={{ backgroundColor: `${colors[i].value}` }}
        ></div>
      ),
      action: (
        <div className="action">
           <Link to={`/admin/edit-color/${colors[i]._id}`}>
            <BiEdit />
          </Link>
          <button onClick={()=>{
            dispatch(delColor(colors[i]._id));
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
      <h1>Colors List</h1>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default Colors;
