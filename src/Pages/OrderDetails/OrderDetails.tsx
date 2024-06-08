import TopPortion from "../ItemPage/Components/TopPortion";
import { ToastContainer } from "react-toastify";
import { useContext } from "react";
import { CartContext } from "../../Store/CartContextProvider";
import MiddlePortion from "./MiddlePortion";

const OrderDetails: React.FC = (): JSX.Element => {
  const { isLogin } = useContext(CartContext);

  if (!isLogin) {
    return (
      <h1 style={{ position: "relative", marginTop: "15rem", left: "35%" }}>
        Please Login to view your Order..
      </h1>
    );
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={4000} />
      <TopPortion item="order-details" />
      <MiddlePortion />
    </>
  );
};

export default OrderDetails;
