import { Navigation, Pagination, A11y, Autoplay, EffectCreative } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/effect-creative';
import productApi from 'api/modules/product.api';
import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './sliderProduct.scss';

const SliderProduct = ({ dataBrand, type }) => {
  const [product, setProduct] = useState([]);
  const getApi = async () => {
    try {
      const response = await productApi.getAll({
        skip: 0,
        limit: 20,
        type: type,
        price: 'low',
      })
      setProduct(response.product);
    }
    catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getApi();
  }, []);
  console.log(type);
  // console.log(product);
  // console.log(dataBrand);
  return (
    <section className="sliderProduct">
      <section className="sliderProduct__head">
        <h1>{type}</h1>
        <ul>
          {
            dataBrand[type].map((item, index) => {
              return (
                <li key={index}>
                  <Link to={`/product/${type}/${item[1]}`}>
                    <img src={item[0]} alt={type} />
                  </Link>
                </li>
              )
            })
          }
        </ul>
      </section>
      <section className="sliderProduct__body">
        <Swiper
          // install Swiper modules
          modules={[Navigation, Pagination, A11y, Autoplay, EffectCreative]}
          grabCursor={true}
          speed={1200}
          loop={true}
          navigation={{ clickable: true, }}
          spaceBetween={20}
          slidesPerView={4}
          slidesPerGroup={4}
        >
          {
            product.length > 0 &&
            product.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <Link to={`/product/detail/${item._id}`}>
                    <section>
                      <img src={`data:image/png;base64,${item.img}`} alt="img" />
                      <p>{item.name}</p>
                      <h1>{`${Number(item.price).toLocaleString()} đ`}</h1>
                      {
                        Number(item.quantity) <= 0 &&
                        <h1 style={{marginTop: 15}}>Hết hàng</h1>
                      }
                    </section>
                  </Link>
                </SwiperSlide>
              )
            })
          }
        </Swiper>
      </section>
    </section >
  )
}

export default SliderProduct;