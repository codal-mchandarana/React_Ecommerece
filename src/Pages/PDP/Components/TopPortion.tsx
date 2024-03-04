import Classes from '../../ItemPage/Components/TopPortion.module.css'

import { Link } from 'react-router-dom';

const TopPortion:React.FC<{item:string}> = ({item}):JSX.Element => {
    return (
        <section className={`${Classes.breadcrumb_option} mt-4`}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className={Classes.breadcrumb__text}>
                            <h4>Shop</h4>
                            <div className={Classes.breadcrumb__links}>
                                <Link to='/'>Home</Link>
                                <Link to='/shop'>Shop</Link>
                                <span>{item}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TopPortion;