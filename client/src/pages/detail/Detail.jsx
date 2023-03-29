import { clsx } from 'clsx';
import style from './detail.module.scss';
import images from 'assets/images/index';
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import productApi from 'api/modules/product.api';
import { Row, Col } from 'antd';
import { AiFillLike, AiFillSetting, AiFillDollarCircle, AiFillQuestionCircle } from 'react-icons/ai';
import { SiSpringsecurity } from 'react-icons/si';
import { FiRotateCw } from 'react-icons/fi';
import { FaHandSparkles, FaHandHoldingUsd } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import SelectSpeed from 'component/selectSpeed/SelectSpeed';
import { toast } from 'react-toastify';
import cartApi from 'api/modules/cart.api';
import toastNotification from 'handler/toast.handler';
import { QuantityCart } from 'layouts/AppLayout/AppLayout';
const dataPolicy = [
  { icon: AiFillLike, title: 'Sản phẩm đạt chuẩn' },
  { icon: SiSpringsecurity, title: 'Cam kết chính hãng 100%' },
  { icon: FiRotateCw, title: 'Đổi trả trong vòng 30 ngày' },
  { icon: AiFillSetting, title: 'Sửa chữa đồng giá 150.000 đ' },
  { icon: FaHandSparkles, title: 'Vệ sinh máy tính' },
  { icon: AiFillDollarCircle, title: 'Giá cực ưu đãi' },
  { icon: AiFillQuestionCircle, title: 'Giải đáp thắc mắc khách hàng' },
  { icon: FaHandHoldingUsd, title: 'Hỗ trợ trả góp lãi suât 0%' },
];
const Detail = () => {
  const id = useParams();
  const [product, setProduct] = useState({});
  const [keysInfor, setKeysInfor] = useState([]);
  const [valuesInfor, setValuesInfor] = useState([]);
  const [cart, setCart] = useState({});
  const updateQuantityCart = useContext(QuantityCart);

  const handlePercent = (price, discount) => {
    return price - (price * (discount / 100));
  }
  const getApi = async () => {
    try {
      const response = await productApi.getOne(id.id);
      setProduct(response);
      setKeysInfor(Object.keys(response.information));
      setValuesInfor(Object.values(response.information));
    }
    catch (err) {
      console.log(err);
    }
  }
  const getIdUserApi = async () => {
    if (JSON.parse(localStorage.getItem("idUser")) !== null) {
      try {
        const response = await cartApi.searchIdUser({
          idUser: JSON.parse(localStorage.getItem("idUser")),
        });
        setCart(response.cart);
      }
      catch (err) {
        console.log(err);
      }
    }
  }
  const updateQuantityProduct = async () => {
    product.quantity = Number(product.quantity) - 1;
    if (product.quantity < 0) {
      toastNotification('error', "Hiện sản phẩm đã bán hết !", 1000);
    }
    else {
      try {
        await productApi.update(product._id, { ...product, quantity: String(product.quantity) });
        getApi();
      }
      catch (err) {
        console.log(err);
      }
    }
  }
  const totalCart = () => {
    let total = 0;
    cart.product.forEach((item, index) => {
      if (item.idRef.price === undefined) {
        total = Number(cart.total) + handlePercent(Number(product.price), Number(product.discount));
      }
      else {
        total += handlePercent(Number(item.idRef.price), Number(product.discount)) * Number(item.quantity);
      }
    });

    return String(total);
  }
  const updateCart = async () => {
    if (!(product.quantity < 0)) {
      const idCart = cart._id;
      const productCart = cart.product;
      console.log("obj se xu ly");
      console.log(productCart);
      console.log("obj se xu ly");
      const obj = {
        idRef: product._id,
        quantity: "1",
      }
      if (productCart.length === 0) {
        productCart.push(obj);
      }
      else {
        const check = productCart.every((item, index) => {
          return item.idRef._id !== product._id;
        });
        if (check === true) {
          productCart.push(obj);
        }
        else {
          productCart.forEach((item, index) => {
            if (item.idRef._id === product._id) {
              const quantity = Number(item.quantity) + 1;
              item.quantity = String(quantity);
            }
          });

        }
      }
      console.log("obj sau khi xu ly");
      console.log(productCart);
      console.log("obj sau khi xu ly");
      cart.product = productCart;
      cart.total = totalCart();

      try {
        const response = await cartApi.update(idCart, cart);
        getIdUserApi();
        toastNotification('success', "Sản phẩm đã được thêm vào giỏ hàng !", 1000);
        updateQuantityCart();

      }
      catch (err) {
        console.log(err);
      }
    }
  }
  const addProductToCart = () => {
    updateQuantityProduct();
    updateCart();
  }

  const checkLogin = () => {
    const userName = JSON.parse(localStorage.getItem("userName"));
    if (userName === null) {
      toastNotification('error', "Hãy đăng nhập để tiếp tục mua hàng nhé !", 1000);
    }
    else {
      addProductToCart();
    }
  }
  useEffect(() => {
    getApi();
    getIdUserApi();
  }, [])
  return (
    <main className={clsx(style.main)}>
      <SelectSpeed />
      <section className={clsx(style.detail)}>
        <Row gutter={[{ xl: 20 }, { xl: 20 }]}>
          {
            product?.img &&
            (
              <>
                <Col xl={7}>
                  <div className={clsx(style.detail__img)}>
                    {
                      (product.img === undefined) ? (
                        <></>
                      ) :
                        (
                          <img src={`data:image/png;base64,${product?.img}`} alt="" />
                        )
                    }

                  </div>
                </Col>
                <Col xl={11}>
                  <div className={clsx(style.detail__infor)}>
                    <ul>
                      <li style={{ textAlign: 'initial' }}>{product?.name}</li>
                      <li>
                        <span>Thương hiệu | </span>
                        <span style={{ textTransform: 'capitalize' }}>{product?.brand}</span>
                      </li>
                      <li>Thông số kĩ thuật</li>
                      {
                        keysInfor.length > 0 &&
                        keysInfor.map((item, index) => {
                          return (
                            <li key={index} style={{ textTransform: 'capitalize' }}>{`${item}: ${valuesInfor[index]}`}</li>
                          )
                        })
                      }
                      <li className={clsx(style.discount)}>
                        <span>{`Còn ${product?.quantity} sản phẩm`}</span>
                        <span>{`Khuyến mãi ${product?.discount}%`}</span>
                      </li>
                      <li>
                        <span>{`${Number(product?.price).toLocaleString()} đ`}</span>
                        <span>{`${handlePercent(Number(product?.price), Number(product?.discount)).toLocaleString()} đ`}</span>
                      </li>
                    </ul>
                    <section className={clsx(style.detail__infor__add)}>
                      <section onClick={checkLogin}>
                        <button className={clsx(style.btnAnimation)}>
                          <span></span>
                          <span></span>
                          <span></span>
                          <span>Thêm vào giỏ hàng</span>
                        </button>
                      </section>
                      <section >
                        <button className={clsx(style.btnAnimation)}>
                          <span></span>
                          <span></span>
                          <span></span>
                          <span>Mua ngay</span>
                        </button>
                      </section>
                    </section>
                  </div>
                </Col>
                <Col xl={6}>
                  <div className={clsx(style.detail__policy)}>
                    <div className={clsx(style.detail__policy__head)}>
                      <img src={images.footer.logon} alt="img" />
                      <section>
                        <span>Công ty cổ phần thương mại dịch vụ Hữu Nhân</span>
                        <img src={images.detail.check} alt="img" />
                      </section>
                    </div>
                    <div className={clsx(style.detail__policy__body)}>
                      <div className={clsx(style.detail__policy__body__title)}>
                        <h1>Chính sách bán hàng</h1>
                      </div>
                      <div className={clsx(style.detail__policy__body__content)}>
                        <ul>
                          {
                            dataPolicy.map((item, index) => {
                              return (
                                <li key={index}>
                                  <item.icon className={clsx(style.icon)} />
                                  <span>{item.title}</span>
                                </li>
                              )
                            })
                          }
                        </ul>
                      </div>
                    </div>
                  </div>
                </Col>
              </>
            )
          }
        </Row>
      </section>
    </main>
  )
};

export default Detail;