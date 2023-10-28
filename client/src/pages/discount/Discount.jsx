// Local
import style from './discount.module.scss';
import images from 'assets/images/index';

// Component
import SelectSpeed from 'component/selectSpeed/SelectSpeed';

// Antd
import { Row, Col } from 'antd';

// Library
import { clsx } from 'clsx';

// Api
import productApi from 'api/modules/product.api';

// React
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

// Translate
import { useTranslation } from 'react-i18next';

const Discount = () => {
    const { t } = useTranslation(['common']);

    // Variables global
    const dataType = [
        { img: images.discount.i1, title: t('common.sale_online')},
        { img: images.discount.i2, title: t('common.laptop_sale')},
        { img: images.discount.i3, title: t('common.endow')},
        { img: images.discount.i4, title: t('common.sale_clock')}
    ];
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
    return (
        <main className={clsx(style.main)}>
            <SelectSpeed />
            <section className={clsx(style.discount)}>
                <section className={clsx(style.discount__intro)}>
                    <img src={images.discount.blackFriday} alt="images" />
                </section>
                <section className={clsx(style.discount__type)}>
                    <Row gutter={[{ sm: 30, xs: 15 }, { sm: 30, xs: 15 }]} align="middle">
                        {
                            dataType.map((item, index) => {
                                return (
                                    <Col lg={6} sm={12} xs={24} key={index}>
                                        <Link to={'/product/laptop/apple'}>
                                            <section>
                                                <img src={item.img} alt="img" />
                                                <h1>{item.title}</h1>
                                            </section>
                                        </Link>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </section>
                <section className={clsx(style.discount__product)}>
                    <Row gutter={[{ sm: 30, xs: 15 }, { sm: 30, xs: 15 }]}>
                        <Col xs={24}>
                            <section className={clsx(style.discount__product__title)}>
                                <h1>{t('common.product_discount')}</h1>
                            </section>
                        </Col>
                        {
                            product.length > 0 &&
                            (
                                product.map((item, index) => {
                                    return (
                                        <Col xl={6} sm={12} xs={24} key={index}>
                                            <Link to={`/product/detail/${item._id}`}>
                                                <section
                                                    className={clsx(style.discount__product__body)}
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
                                                        <h1>{t('common.out_of_stock')}</h1>
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