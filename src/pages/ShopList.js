import "./ShopList.css";
import Item from "../components/Item";
import React, { useEffect, useState } from "react";

import axios from "axios";

function ShopList() {
  const [list, setList] = useState();
  const [sum, setSum] = useState(0);

  useEffect(() => {
    getList();
  }, []);

  async function getList() {
    axios.get("http://localhost:9898/api/orders/list").then(function(response) {
      console.log(response.data.result);
      setList(response.data.result);
      //sum of my card
      let sum_t = 0;
      for (let i = 0; i < response.data.result.length; i++) {
        sum_t += response.data.result[i].products[0].product.price;
      }
      setSum(sum_t);
    });
  }

  //   function getSumOfShopList() {

  //   }
  //   getSumOfShopList();
  return (
    <div className="ShopList">
      <p id="titel">my shoping list</p>
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
      <p>{"sum of all my cart: " + sum + "$"}</p>
      <button
        id="b-send"
        onClick={() => {
          const data = localStorage.getItem("SaveProduct");
          axios.post("http://localhost:9898/api/orders/update", data);
        }}
      >
        I want to buy it!
      </button>
      {/* <p>{localStorage.getItem(JSON.stringify("productToSuperMarket"))}</p> */}
    </div>
  );
}

export default ShopList;
