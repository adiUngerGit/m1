import "./Item.css";
import React, { component, useState } from "react";
import axios from "axios";

function Item(props) {
  const [select, setSelect] = useState(false);

  function clickAdd(name) {
    const data = { productName: name };
    axios.post("http://localhost:9898/api/orders/update", data);
  }

  function clickSendToSuperMarket(name) {
    const data = { productName: name };
    axios.post("http://localhost:9898/api/orders/update", data);
    setSelect(!select);

    let items = localStorage.getItem("SaveProduct");

    if (items == null) {
      items = [];
    }
    items.push(name);
    localStorage.setItem("SaveProduct", JSON.stringify(name));
  }
  return (
    <div className="App">
      <div id="item">
        <div id="left">
          <p id="name">Title: {props.name}</p>
          <p id="price">Price: {props.price} $</p>
        </div>
        <img src={props.img} alt="this is image" />
        {props.button ? (
          <button id="button" onClick={() => clickAdd(props.name)}>
            add
          </button>
        ) : (
          <button
            id="button"
            onClick={() => clickSendToSuperMarket(props.name)}
            style={{ backgroundColor: select ? "red" : "white" }}
          >
            send to SuperMarket
          </button>
        )}
      </div>
    </div>
  );
}

export default Item;
{
  /* <button id="button" onClick={props.button == "add" ? clickAdd()}>{props.button}</button> */
}
