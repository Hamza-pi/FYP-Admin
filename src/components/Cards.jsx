import React from "react";
import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";
const Card = ({ total, percentage, icon, color }) => {
  return (
    <div className="card">
      <div className="total">
        <p>Total</p>
        <h2>${total}</h2>
      </div>
      <div className="comparison">
        <div className="percent" style={{ color: `${color}` }}>
          {icon === "up" ? (
            <BsArrowUpRight style={{ margin: "5px 7px 0 0" }} />
          ) : (
            <BsArrowDownRight style={{ margin: "5px 7px 0 0" }} />
          )}
          <h3>{percentage}%</h3>
        </div>
        <p>Compared to April 2022</p>
      </div>
    </div>
  );
};

export default Card;
