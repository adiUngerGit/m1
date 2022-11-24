import "./App.css";
import Item from "./components/Item";

function App() {
  const list = [
    {
      name: "Humburger",
      price: "70",
      img: "https://www.maadanya.co.il/wp-content/uploads/2020/03/13-1.jpg",
    },
    {
      name: "pasta",
      price: "5",
      img: "https://www.jessicagavin.com/wp-content/uploads/2020/07/how-to-cook-pasta-3-1200.jpg",
    },
    {
      name: "Rice",
      price: "30",
      img: "https://m.media-amazon.com/images/I/81Lc91yOehL.jpg",
    },
    {
      name: "Avocado",
      price: "10",
      img: "https://thekitchencommunity.org/wp-content/uploads/2021/03/Can-You-Refrigerate-Avocados-1200x675.jpg",
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
