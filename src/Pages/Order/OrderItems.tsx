import Classes from "../Wishlist/Wishlist.module.css";
import calculateOriginalPrice from "../../utils/Calculate";

interface orderItem {
  data: any;
}

const OrderItems: React.FC<orderItem> = ({ data }) => {
  return (
    <>
      <div className={Classes.wishlist_body}>
        <div className={Classes.order_item}>
          <div className={Classes.product_info}>
            <div>{data.id}</div>
          </div>
          <div className={Classes.product_info}>
            <div
              style={{ marginRight: "3rem" }}
              className={Classes.product_details}
            >
              <span>{data.razorpay_order_id}</span>
            </div>
          </div>
          <div className={Classes.product_cost}>
            <span>{data.razorpay_payment_id}</span>
          </div>
          <div className={Classes.actions}>
            <span className={`${Classes.action} text-success`}>
              ${data.amount}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderItems;
