import "./Item.css";

const shop_list = [];

function clickAdd(name, price) {
  //TODO: add to db
  this.shop_list.push(name);
}

function Item(props) {
  console.log(props.name);

  return (
    <div className="App">
      <div id="item">
        <div id="left">
          <p id="name">{props.name}</p>
          <p id="price">{props.price}</p>
        </div>
        <img src={props.img} alt="this is image" />
        <button id="add" onClick={() => clickAdd(props.name, props.price)}>
          add
        </button>
      </div>
    </div>
  );
}

export default Item;
