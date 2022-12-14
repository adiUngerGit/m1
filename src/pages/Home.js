import "./Home.css";
import Item from "../components/Item";
import React, { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";

import axios from "axios";

function Home() {
  const [list, setList] = useState([{ id: 2, name: "", price: 0, img: "" }]);

  useEffect(() => {
    getList();
  }, []);

  async function getList() {
    axios
      .get("http://localhost:9898/api/products/list")
      .then(function(response) {
        setList(response.data.result);
      });
  }

  return (
    <div className="Home">
      <p>products</p>
      {list.map((item) => {
        return (
          <Item
            name={item.name}
            price={item.price}
            img={item.img}
            button={true}
          ></Item>
        );
      })}
      <Link id="link" to="/ShopList">
        Shoping List
      </Link>
    </div>
  );
}

export default Home;
