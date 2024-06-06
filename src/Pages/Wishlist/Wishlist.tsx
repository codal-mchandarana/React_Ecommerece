import MiddlePortion from "./MiddlePortion";
import TopPortion from "../ItemPage/Components/TopPortion";
import { ToastContainer } from "react-toastify";
import { useContext } from "react";
import { CartContext } from "../../Store/CartContextProvider";

const Wishlist: React.FC = (): JSX.Element => {
  const { isLogin } = useContext(CartContext);

  if (!isLogin) {
    return (
      <h1 style={{ position: "relative", marginTop: "15rem", left: "35%" }}>
        Please Login to view your cart..
      </h1>
    );
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={4000} />
      <TopPortion item="wishlist" />
      <MiddlePortion />
    </>
  );
};

export default Wishlist;
