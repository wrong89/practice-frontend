// import Slider from "react-slick";

// import "slick-carousel/slick/slick-theme.css";
// import "slick-carousel/slick/slick.css";


// const ImageSlider = ({ }) => {
//     var settings = {
//         infinite: true,
//         speed: 500,
//         slidesToShow: 3,
//         slidesToScroll: 1
//     };
//     return (
//         <Slider {...settings}>
//             <div>
//                 <img src="../../../public/assets/1.jpg" alt="" />
//             </div>
//             <div>
//                 <img src="../../../public/assets/2.jpg" alt="" />
//             </div>
//             <div>
//                 <img src="../../../public/assets/3.jpg" alt="" />
//             </div>
//             <div>
//                 <h3>4</h3>
//             </div>
//             <div>
//                 <h3>5</h3>
//             </div>
//             <div>
//                 <h3>6</h3>
//             </div>
//         </Slider>
//     );
// };

// export default ImageSlider;


import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import cls from "./ImageSlider.module.scss";

const ImageSlider = () => {
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 2,
        autoplay: true,         // автоматическое перелистывание
        autoplaySpeed: 3000,    // каждые 3 секунды
        pauseOnHover: true,     // можно остановить при наведении
        arrows: false,          // отключим стрелки, если не нужны
    };

    return (
        <div className={cls.slider}>
            <Slider {...settings}>
                <div className={cls.slider__slide}>
                    <h3 className={cls.slider__content}>1</h3>
                </div>
                <div className={cls.slider__slide}>
                    <h3 className={cls.slider__content}>2</h3>
                </div>
                <div className={cls.slider__slide}>
                    <h3 className={cls.slider__content}>3</h3>
                </div>
                <div className={cls.slider__slide}>
                    <h3 className={cls.slider__content}>4</h3>
                </div>
                <div className={cls.slider__slide}>
                    <h3 className={cls.slider__content}>5</h3>
                </div>
                <div className={cls.slider__slide}>
                    <h3 className={cls.slider__content}>6</h3>
                </div>
            </Slider>
        </div>
    );
};

export default ImageSlider;
