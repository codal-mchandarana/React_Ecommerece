import { Link } from 'react-router-dom';
import Classes from './middleportion.module.css'

const MiddlePortion: React.FC = () => {
    return (
        <div className={`${Classes.heroSection}`}>
            <div className="row">
                <div className="col-xl-5 col-lg-7 col-md-8">
                    <div className={Classes.hero__text}>
                        <h6>Summer Collection</h6>
                        <h2>Fall - Winter Collections 2030</h2>
                        <p>A specialist label creating luxury essentials. Ethically crafted with an unwavering
                            commitment to exceptional quality.</p>
                        <Link to="/shop" className={Classes.primary_btn}>Shop now <i className="fa-solid fa-arrow-right"></i></Link>
                        <div className={Classes.hero__social}>
                            <a href="#"><i className="fa-brands fa-facebook-f"></i></a>
                            <a href="#"><i className="fa-brands fa-twitter"></i></a>
                            <a href="#"><i className="fa-brands fa-pinterest-p"></i></a>
                            <a href="#"><i className="fa-brands fa-instagram"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default MiddlePortion