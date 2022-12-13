// import "./Home.css";
import Item from "../components/Item";
import React, { useEffect, useState } from "react";

import axios from "axios";
import { json } from "react-router-dom";

function ShopList() {
  const [list, setList] = useState();

  //   getList();
  useEffect(() => {
    getList();
  }, []);

  async function getList() {
    axios.get("http://localhost:9898/api/orders/list").then(function(response) {
      console.log(response.data.result);
      setList(response.data.result);
      console.log("list: " + list);
    });
  }

  //   function getSumOfShopList() {

  //   }
  //   getSumOfShopList();
  return (
    <div className="ShopList">
      {list &&
        list.map((item) => {
          return (
            <Item
              button={false}
              name={item.products[0].product.name}
              price={item.products[0].product.price}
              img={item.products[0].product.img}
            ></Item>
          );
        })}
    </div>
  );
}

export default ShopList;
