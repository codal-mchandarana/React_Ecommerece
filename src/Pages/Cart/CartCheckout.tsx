import { useContext } from "react";
import { CartContext } from "../../Store/CartContextProvider";
import EcommerceClient from "../../axios/helper";
import { success } from "../../Toast/toast";
import useRazorpay from "react-razorpay";
import { formatDateWithTime } from "../../utils/helpter";

const CartCheckout: React.FC<{ carts: any }> = ({ carts }): JSX.Element => {
  const [Razorpay] = useRazorpay();
  const { TotalPrice } = useContext(CartContext);

  const convertTostring = () => {
    const arr = [];
    for (const product of carts) arr.push({ id: product.id, qty: product.qty });
    return JSON.stringify(arr);
  };

  const handlePayment = async () => {
    try {
      const response = await EcommerceClient.post(
        "payment/order",
        { amount: Math.floor(TotalPrice * 100) },
        {
          headers: {
            "content-type": "application/json",
          },
          withCredentials: true,
        }
      );

      handlePaymentVerify(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePaymentVerify = async (data: any) => {
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY,
      amount: data.amount,
      currency: data.currency,
      name: "ECOMMERCE",
      description: "Test Mode",
      order_id: data.id,
      handler: async (response: any) => {

        try {
          const body = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            amount: data.amount / 100,
          };

          const orderbody = {
            amount: data.amount / 100,
            productDetails: convertTostring(),
            date:formatDateWithTime(new Date())
          };

          const orderresponse = await EcommerceClient.post(
            "order/addOrder",
            orderbody,
            {
              headers: {
                "content-type": "application/json",
              },
              withCredentials: true,
            }
          );

          const res = await EcommerceClient.post("payment/verify", body, {
            headers: {
              "content-type": "application/json",
            },
            withCredentials: true,
          });

          const verifyData = await res;

          if (verifyData.data.message) {
            success(verifyData.data.message);
          }
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#5f63b8",
      },
    };
    const rzp1 = new Razorpay(options);
    rzp1.open();
  };

  return (
    <>
      <div className="col-md-4">
        <div
          style={{
            boxShadow:
              "0 26px 58px 0 rgba(0, 0, 0, .22), 0 5px 14px 0 rgba(0, 0, 0, .18)",
          }}
          className="card mb-4"
        >
          <div className="card-header py-3">
            <h5 className="mb-0">Summary</h5>
          </div>
          <div className="card-body">
            <ul className="list-group list-group-flush">
              <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                Products
                <span>&#8377;{TotalPrice.toFixed(2)}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                Shipping
                <span>Gratis</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                <div>
                  <strong>Total amount</strong>
                  <strong>
                    <p className="mb-0">(including VAT)</p>
                  </strong>
                </div>
                <span>
                  <strong>&#8377;{TotalPrice.toFixed(2)}</strong>
                </span>
              </li>
            </ul>
            <button
              onClick={handlePayment}
              type="button"
              className="btn btn-dark btn-lg btn-block"
            >
              Go to checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartCheckout;
