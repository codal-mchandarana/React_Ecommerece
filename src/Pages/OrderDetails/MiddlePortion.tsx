import EcommerceClient from "../../axios/helper";
import { useEffect, useState } from "react";
import OrderDetailsItem from "./OrderDetailsItem";
import SpinnerComponent from "../Spinner/SpinnerComponent";

const MiddlePortion: React.FC = (): JSX.Element => {
  const [Orderdetails, setOrderdetails] = useState<any>();
  const [Loading, setLoading] = useState(false);

  const fetchOrderDetails = async () => {
    setLoading(true);
    try {
      const products = await EcommerceClient.get("product");
      const productsArray = products?.data;

      const result = await EcommerceClient.get("order/getOrdersAws", {
        withCredentials: true,
      });
      const orders = [];

      for (const element of result.data) {
        const order = [];
        const particularOrder = element.productDetails;

        for (const element1 of particularOrder) {
          let obj = productsArray.find((val: any) => {
            return element1.id == val.id;
          });
          obj.qty = element1.qty;
          obj.date = element.date;
          obj.amount = element.amount;
          order.push(obj);
        }
        orders.push(order);
      }
      setLoading(false);
      setOrderdetails(orders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  return (
    Loading?<SpinnerComponent/>:
    <>
      {Orderdetails &&
        Orderdetails.map((element: any) => {
          return <OrderDetailsItem carts={element} />;
        })}
    </>
  );
};

export default MiddlePortion;
