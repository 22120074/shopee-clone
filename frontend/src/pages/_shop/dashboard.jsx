import { useSelector } from "react-redux";

export default function Dashboard() {
  const shop = useSelector((state) => state.shop.currentShop);
  console.log(shop);
  return <div>aaaaaaaaaa</div>;
}
