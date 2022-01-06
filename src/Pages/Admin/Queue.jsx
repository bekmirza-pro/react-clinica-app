import React, { useEffect, useState } from "react";
import "./Admin.css";

const Queue = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9000/admins/orders")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <>
      <h1>Welcome Queue Page</h1>
      <table className="zigzag">
        <thead>
          <tr>
            <th className="header">Queue_id</th>
            <th className="header">Username</th>
            <th className="header">Disease Trends</th>
            <th className="header">Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 &&
            data.map((row, i) => (
              <tr key={i}>
                <td>{row.ocherd_id}</td>
                <td>{row.users_name}</td>
                <td>{row.dis_tend_name}</td>
                <td>
                  <button className="delete_btn">Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default Queue;
