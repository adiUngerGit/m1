import "./ShopList.css";
import "./Item";

const list = getShopingList();
const sum = getShopingSum();

function getShopingList() {
  return [{ name: "a" }, { name: "b" }];
}
function getShopingSum() {
  return 100;
}
function ShopList() {
  return (
    <div className="ShopList">
      {list.map((item) => {
        return <p>{item.name}</p>;
      })}
      <p>Amount to pay={sum}</p>
    </div>
  );
}

export default ShopList;
