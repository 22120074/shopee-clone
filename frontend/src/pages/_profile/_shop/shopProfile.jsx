import clsx from "clsx";
import { useParams } from "react-router-dom";
import { useGetShopQuery } from "../../../features/api/shopQuery";

export default function ShopProfile() {
  const { shopId } = useParams();
  const { data: shopData, isLoading, isError } = useGetShopQuery(shopId);

  return (
    <div className={clsx("shop-profile")}>
      <h1>Shop Profile - Shop ID: {shopId}</h1>
      {shopData && (
        <div>
          <p>Shop Name: {shopData.nameShop}</p>
          <p>Shop Address: {shopData.address}</p>
        </div>
      )}
    </div>
  );
}
