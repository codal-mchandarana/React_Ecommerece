import Classes from "../Wishlist/Wishlist.module.css";
import EcommerceClient from "../../axios/helper";
import { useEffect, useState } from "react";
import OrderItems from "./OrderItems";

const MiddlePortion: React.FC = (): JSX.Element => {
  const [order, setOrder] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const result = await EcommerceClient.get("/user/orders", {
        withCredentials: true,
      });
      console.log(result)
      setOrder(result.data);
    };
    fetchOrders();
  }, []);

  return (
    <>
      <div className={Classes.body}>
        <div className={`${Classes.container} `}>
          {/*<div className={Classes.heading}>MY TOP BEANIE - 3/30/2024</div>*/}
          <div className={Classes.order_header}>
            <div>id</div>
            <div>Order id</div>
            <div>Payment id</div>
            <div>Amount</div>
          </div>
          {order.map((value) => {
            return <OrderItems data={value} />;
          })}
        </div>
      </div>
    </>
  );
};

export default MiddlePortion;
