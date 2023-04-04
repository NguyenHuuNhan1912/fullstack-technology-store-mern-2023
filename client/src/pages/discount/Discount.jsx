import style from './discount.module.scss';
import { clsx } from 'clsx';
import images from 'assets/images/index';
import SelectSpeed from 'component/selectSpeed/SelectSpeed';
import { Row, Col } from 'antd';
import productApi from 'api/modules/product.api';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
const dataType = [
    { img: images.discount.i1, title: 'Săn sale online', },
    { img: images.discount.i2, title: 'Laptop tụ trường', },
    { img: images.discount.i3, title: 'Ưu đãi ngập trời', },
    { img: images.discount.i4, title: 'Bão sale đồng hồ', }
];
const Discount = () => {
    const [product, setProduct] = useState([]);
    const getProduct = async () => {
        try {
            const response = await productApi.fillDiscount();
            setProduct(response.product);
        }
        catch (err) {
            console.log(err);
        }
    }
    const handlePercent = (price, discount) => {
        return price - (price * (discount / 100));
    }
    useEffect(() => {
        getProduct();
    }, []);
    const handleClick = () => {
        console.log('click');
    }
    console.log(product);
    return (
        <main className={clsx(style.main)}>
            <SelectSpeed />
            <section className={clsx(style.discount)}>
                <section className={clsx(style.discount__intro)}>
                    <img src={images.discount.blackFriday} alt="images" />
                </section>
                <section className={clsx(style.discount__type)}>
                    <Row gutter={[{ xl: 30 }, { xl: 30 }]} align="middle">
                        {
                            dataType.map((item, index) => {
                                return (
                                    <Col xl={6} key={index}>
                                        <section>
                                            <img src={item.img} alt="img" />
                                            <h1>{item.title}</h1>
                                        </section>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </section>
                <section className={clsx(style.discount__product)}>
                    <Row gutter={[{ xl: 30 }, { xl: 30 }]}>
                        <Col xl={24}>
                            <section className={clsx(style.discount__product__title)}>
                                <h1>Các sản phẩm được giảm giá</h1>
                            </section>
                        </Col>
                        {
                            product.length > 0 &&
                            (
                                product.map((item, index) => {
                                    return (
                                        <Col xl={6} key={index}>
                                            <Link to={`/product/detail/${item._id}`}>
                                                <section
                                                    className={clsx(style.discount__product__body)}
                                                    onClick={handleClick}
                                                    style={{
                                                        pointerEvents: `${Number(item.quantity) > 0 ? 'initial' : 'none'}`,
                                                        backgroundColor: `${Number(item.quantity) > 0 ? 'initial' : '#dddddd'}`,
                                                    }}
                                                >

                                                    <img src={`data:image/png;base64,${item.img}`} alt="img" />
                                                    <p>{item.name}</p>
                                                    <del>{`${Number(item.price).toLocaleString()} đ`}</del>
                                                    <h1>{`${handlePercent(Number(item.price), Number(item.discount)).toLocaleString()} đ`}</h1>
                                                    <span>{`${item.discount}%`}</span>
                                                    {
                                                        Number(item.quantity) <= 0 &&
                                                        <h1>Hết hàng</h1>
                                                    }
                                                </section>
                                            </Link>

                                        </Col>
                                    )
                                })
                            )
                        }
                    </Row>
                </section>
            </section>
        </main>
    )
}
export default Discount;