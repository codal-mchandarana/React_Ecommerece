import { Link } from 'react-router-dom'
import Classes from '../ItemPage/Components/TopPortion.module.css'

const CartHeader = () => {
    return (
        <>
            <section className={`${Classes.breadcrumb_option} mt-4`}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className={Classes.breadcrumb__text}>
                                <h4>Shop</h4>
                                <div className={Classes.breadcrumb__links}>
                                    <Link to='/'>Home</Link>
                                    <span>Cart</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default CartHeader;