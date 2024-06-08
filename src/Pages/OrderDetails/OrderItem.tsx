import { ProductType } from "../../Interface/Product";
import calculateOriginalPrice from "../../utils/Calculate";
import { useNavigate } from "react-router-dom";

interface card {
    data: ProductType,
    key:number
}

const OrderItem: React.FC<card> = ({key, data }): JSX.Element => {

    const navigate = useNavigate()
    const handlePdpClick = (id: string) => {
        navigate(`/pdp/${id}`)
    }
    return (
        <>
            <div key={key} className="row">
                <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                    {/* Image */}
                    <div
                        className="bg-image hover-overlay hover-zoom ripple rounded"
                        data-mdb-ripple-color="light"
                    >
                        <img
                            src={data.images[0]}
                            className="w-100 object-fit-contain"
                            style={{ cursor: "pointer", height: "5rem" }}
                            alt={data.title}
                            onClick={() => { handlePdpClick(data.id) }}
                        />
                        <a href="#!">
                            <div
                                className="mask"
                                style={{ backgroundColor: "rgba(251, 251, 251, 0.2)" }}
                            />
                        </a>
                    </div>
                </div>
                <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                    <p><strong>{data.title}</strong></p>
                    <p>Brand: {data.brand}</p>
                </div>
                <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                    <div className="d-flex mb-4" style={{ width: '300', height: '40px' }}>
                        
                        <div style={{ width: "3rem" }} className="form-outline">
                            <p className="form-control pl-5"><span style={{ marginLeft: "5px" }}>{data.qty}</span></p>
                            <label className="form-label" htmlFor="form1">
                                Quantity
                            </label>
                        </div>
                        
                    </div>
                </div>
            </div>

        </>
    )
}

export default OrderItem;