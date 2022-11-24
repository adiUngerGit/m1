import "./Item.css";

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
      </div>
    </div>
  );
}

export default Item;
