import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Admin.css";

const Admin = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9000/admins/users")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <>
      <h1>Welcome Admin</h1>
      <table className="zigzag">
        <thead>
          <tr>
            <th className="header">User id</th>
            <th className="header">Username</th>
            <th className="header">Email</th>
            <th className="header">Password</th>
            <th className="header">Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 &&
            data.map((row, i) => (
              <tr key={i}>
                <td>{row.user_id}</td>
                <td>{row.user_name}</td>
                <td>{row.email}</td>
                <td>{row.password}</td>
                <td>
                  <button
                    className="delete_btn"
                    onClick={() => {
                      fetch(
                        "http://localhost:9000/admins/users/" + row.user_id,
                        {
                          method: "DELETE",
                        }
                      )
                        .then((res) => res.json())
                        .then((data) => setData([...data]));
                    }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <Link className="queue" to="/queue">
        QUEUE
      </Link>
    </>
  );
};

export default Admin;
