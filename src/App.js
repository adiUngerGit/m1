import "./App.css";
import Item from "./components/Item";

function App() {
  const list = [
    {
      name: "Banana",
      price: "20",
      img: "https://images.immediate.co.uk/production/volatile/sites/30/2017/01/Bananas-218094b-scaled.jpg",
    },
    {
      name: "Apple",
      price: "25",
      img: "https://s3-us-west-2.amazonaws.com/melingoimages/Images/4315.jpg",
    },
    {
      name: "Rice papaer",
      price: "30",
      img: "https://m.media-amazon.com/images/I/81Lc91yOehL.jpg",
    },
    {
      name: "Potatos",
      price: "10",
      img: "https://media.istockphoto.com/id/157430678/photo/three-potatoes.jpg?s=612x612&w=0&k=20&c=qkMoEgcj8ZvYbzDYEJEhbQ57v-nmkHS7e88q8dv7TSA=",
    },
  ];
  return (
    <div className="App">
      {list.map((item) => {
        return <Item name={item.name} price={item.price} img={item.img}></Item>;
      })}
    </div>
  );
}

export default App;
