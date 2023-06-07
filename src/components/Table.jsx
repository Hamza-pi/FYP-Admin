import React from "react";
const Table = ({ colsName, tableData }) => {
  let dataFields = [...colsName];

  return (
    <div className="table-container">
      <table cellSpacing={0}>
        <thead>
          <tr key="no">
            {colsName.map((name, key) => (
              <th key={key}>{name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((data, key) => (
            <tr key={key}>
              {dataFields.map((field, key) => (
                <td key={key}>
                  <span
                    className={
                      field === "Status"
                        ? data[field] === "Delivered"
                          ? "delivered"
                          : data[field] === "Cancelled"
                          ? "cancelled"
                          : data[field] === "Hold"
                          ? "hold"
                          : "simple"
                        : ""
                    }
                  >
                    {data[field]}
                  </span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
