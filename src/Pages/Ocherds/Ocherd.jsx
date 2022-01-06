import React, { useEffect, useState } from "react";

function Ocherds() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9000/diseaseTrends")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const handleQueueSubmit = (evt) => {
    evt.preventDefault();

    const { username, disease_trends } = evt.target.elements;

    fetch("http://localhost:9000/newOcherds", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username.value.trim(),
        disease_trends: disease_trends.value.trim(),
      }),
    }).then((res) => res.json());
  };

  return (
    <>
      <div className="welcome">
        <h1>WELCOME</h1>
        <p>You can subscribe to the queue</p>
      </div>
      <div className="queue_login">
        <form onSubmit={handleQueueSubmit}>
          <label
            className="header_queue"
            htmlFor="chk"
            aria-hidden="true"
            to="/login">
            Queue
          </label>
          <input type="text" name="username" placeholder="username" required />
          <select name="disease_trends" id="disease">
            <option value="#" disabled>
              Disease direction
            </option>
            {data.length > 0 &&
              data.map((row, i) => (
                <option key={i} value={row.dis_tend_id} name="dise_tend_id">
                  {row.dis_tend_name}
                </option>
              ))}
          </select>
          <button type="submit">Queue registration</button>
        </form>
      </div>
    </>
  );
}

export default Ocherds;
