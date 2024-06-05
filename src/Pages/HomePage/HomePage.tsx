import MiddlePortion from "./Components/MiddlePortion/MiddlePortion"
import ProductSlider from "../ProductSlider/ProductSlider";


const HomePage: React.FC = () => {
    return <>
        <MiddlePortion />
        {/*<div style={{height:"10rem",backgroundColor:'black',background:'url("/img/photo1.jpg")',marginBottom:"5rem"}}></div>*/}
        <ProductSlider/>
    </>
}

export default HomePage;