import Classes from "./ProductSlider.module.css";
import SliderItem from "./SliderItem";
import { useEffect, useState } from "react";
import {
  fetchItems,
  fetchSliderItems,
  fetchSliderItemsImage,
} from "../../axios/api";

const ProductSlider: React.FC = (): JSX.Element => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchSliderProductDetails = async () => {
      let newData = await fetchSliderItems();
      let newData1 = await fetchSliderItemsImage();

      for (let index = 0; index < newData.length; index++) {
        newData[index].images = newData1[index];
      }
      setData(newData);
    };
    fetchSliderProductDetails();
  }, []);

  return (
    <>
      <div className={Classes.container}>
        <div className={Classes.text}>GIFTS UNDER $100</div>
        <div
          id="carouselExampleControls"
          className={`${Classes.carousel1} carousel slide`}
          data-ride="carousel"
        >
          <div className={`carousel_inner ${Classes.carousel_inner_1}`}>
            <SliderItem active={"active"} data={data.slice(0, 4)} />
            <SliderItem active={""} data={data.slice(4, 8)} />
          </div>
          <a
            className={`carousel-control-prev ${Classes.prev_button}`}
            href="#carouselExampleControls"
            role="button"
            data-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Previous</span>
          </a>
          <a
            className={`carousel-control-next ${Classes.next_button}`}
            href="#carouselExampleControls"
            role="button"
            data-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>
    </>
  );
};

export default ProductSlider;
