const CartFooter = () => {
    return (
        <>
            <div  style={{boxShadow:"0 26px 58px 0 rgba(0, 0, 0, .22), 0 5px 14px 0 rgba(0, 0, 0, .18)"}} className="card mb-4">
                <div className="card-body">
                    <p>
                        <strong>Expected shipping delivery</strong>
                    </p>
                    <p className="mb-0">12.10.2020 - 14.10.2020</p>
                </div>
            </div>
            <div  style={{boxShadow:"0 26px 58px 0 rgba(0, 0, 0, .22), 0 5px 14px 0 rgba(0, 0, 0, .18)"}} className="card mb-4 mb-lg-0">
                <div className="card-body">
                    <p>
                        <strong>We accept</strong>
                    </p>
                    <img
                        className="me-2"
                        width="45px"
                        src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                        alt="Visa"
                    />
                    <img
                        className="me-2"
                        width="45px"
                        src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                        alt="American Express"
                    />
                    <img
                        className="me-2"
                        width="45px"
                        src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                        alt="Mastercard"
                    />
                </div>
            </div>
        </>
    )
}

export default CartFooter;