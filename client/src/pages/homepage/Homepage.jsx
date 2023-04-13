// Local
import './homepage.scss';
import images from 'assets/images/index';

// React
import { useState, } from "react";

// Swiper modules
import { Navigation, Pagination, A11y, Autoplay, EffectFade } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Swiper style
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';

// Component
import SelectSpeed from 'component/selectSpeed/SelectSpeed';
import SliderProduct from "component/SliderProduct/SliderProduct";

// Variables global
const dataIntro = [
    { img: images.homepage.i1 },
    { img: images.homepage.i2 },
    { img: images.homepage.i3 },
    { img: images.homepage.i4 },
    { img: images.homepage.i5 },
    { img: images.homepage.i6 },
    { img: images.homepage.i7 },
    { img: images.homepage.i8 },
    { img: images.homepage.i9 },
];
const dataType = ['laptop', 'smartphone', 'tablet', 'mouse', 'keyboard', 'smartwatch'];
const dataBrand = {
    laptop: [
        [images.homepage.brand.apple, 'apple'],
        [images.homepage.brand.asus, 'asus'],
        [images.homepage.brand.dell, 'dell'],
        [images.homepage.brand.huawei, 'huawei'],
        [images.homepage.brand.lenovo, 'lenovo'],
        [images.homepage.brand.msi, 'msi'],
    ],
    smartphone: [
        [images.homepage.brand.iphone, 'apple'],
        [images.homepage.brand.oppo, 'oppo'],
        [images.homepage.brand.realme, 'realme'],
        [images.homepage.brand.xiaomi, 'xiaomi'],
        [images.homepage.brand.samsung, 'samsung'],
    ],
    tablet: [
        [images.homepage.brand.iphone, 'apple'],
        [images.homepage.brand.huawei, 'huawei'],
        [images.homepage.brand.lenovo, 'lenovo'],
        [images.homepage.brand.samsung, 'samsung'],
    ],
    mouse: [
        [images.homepage.brand.dareu, 'dareu'],
        [images.homepage.brand.logitech, 'logitech'],
        [images.homepage.brand.microsoft, 'microsoft'],
        [images.homepage.brand.rapoo, 'rapoo'],
        [images.homepage.brand.zadez, 'zadez'],
    ],
    keyboard: [
        [images.homepage.brand.logitech, 'logitech'],
        [images.homepage.brand.microsoft, 'microsoft'],
        [images.homepage.brand.razer, 'razer'],
    ],
    smartwatch: [
        [images.homepage.brand.amazfit, 'amazfit'],
        [images.homepage.brand.befit, 'befit'],
        [images.homepage.brand.samsung, 'samsung'],
        [images.homepage.brand.xiaomi, 'xiaomi'],
    ],
}
const Homepage = () => {
    const [show, setShow] = useState(true);
    return (
        <main className="main">
            <SelectSpeed />
            <section className="homepage">
                <div className="homepage__introSlider" onMouseOver={() => setShow(false)} onMouseOut={() => setShow(true)}>
                    <Swiper
                        modules={[Navigation, Pagination, A11y, Autoplay, EffectFade]}
                        grabCursor={true}
                        effect="fade"
                        speed={1200}
                        loop={true}
                        navigation={{ clickable: true }}
                        pagination={{ clickable: true }}
                        spaceBetween={0}
                        slidesPerView={1}
                        slidesPerGroup={1}
                        autoplay={{
                            delay: 1500,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                    >
                        {
                            dataIntro.map((item, index) => {
                                return (
                                    <SwiperSlide key={index}>
                                        <section className="homepage__introSlider__content">
                                            <img src={item.img} alt="img" />
                                        </section>
                                    </SwiperSlide>
                                )
                            })
                        }
                    </Swiper>
                </div>
                <section className="homepage__productSlider">
                    {
                        dataType.map((item, index) => {
                            return (
                                <SliderProduct key={index}
                                    dataBrand={dataBrand}
                                    type={item}
                                />
                            )
                        })
                    }
                </section>
            </section>
        </main>
    )
}
export default Homepage;