import React, { useState, useEffect } from "react";
import axios from "axios";

function Guides() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/allData");
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {data.map((data) => (
        <ul key={data._id}>
          <li>{data.name}</li>
          <li>{data.places}</li>
        </ul>
      ))}
    </>
  );
}

export default Guides;
