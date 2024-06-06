import { useContext } from "react";
import { CartContext } from "../../Store/CartContextProvider";
import {loadStripe} from '@stripe/stripe-js';
import EcommerceClient from "../../axios/helper";

const CartCheckout = () => {
   
    const {TotalPrice} = useContext(CartContext);

    const handleClick = async(event:any)=>{
        event.preventDefault();
        const stripe = await loadStripe("pk_test_51PNZZDEqEj8PZfPPpYnWzAddH1A5uikuhFmlOgkbnuHkastTtNTJ6ITSoslbTkVbjt5WPkyfE9dXiv3aQ1rKJoZP00RInShcg8");
        const body = {
            amount: TotalPrice,
            eventId: 12,
            eventName: "Purchasing Products",
        }
        // const response = await apiRequest('stripe',"POST",body)
        const response = await EcommerceClient.post('payment/stripe',body);
        console.log(response.data);
        const session = response.data;
        const result = stripe?.redirectToCheckout({sessionId: session.id});
        console.log(result);
    }

    return (
        <>
            <div className="col-md-4">
                <div  style={{boxShadow:"0 26px 58px 0 rgba(0, 0, 0, .22), 0 5px 14px 0 rgba(0, 0, 0, .18)"}} className="card mb-4">
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
                        <button onClick={handleClick} type="button" className="btn btn-dark btn-lg btn-block">Go to checkout</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartCheckout;