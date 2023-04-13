// Library
import { clsx } from 'clsx';

// Local
import style from './orderAccount.module.scss';
import images from 'assets/images';

// Api
import orderApi from 'api/modules/order.api';

// React
import { useEffect, useState } from 'react';

// Component
import SelectSpeed from 'component/selectSpeed/SelectSpeed';

// Antd
import { Row, Col } from 'antd';

// React
import { Link } from 'react-router-dom';

// Icon
import { AiOutlineRollback } from 'react-icons/ai';

// Variables global

const status = ['pending-Đang xử lý', 'processing-Đang giao', 'delivered-Đã giao', 'cancel-Hủy đơn hàng'];
const OrderAccount = (statusOrder) => {
    const [orders, setOrders] = useState([]);
    const handleStatus = (str) => {
        const newStr = str.slice(str.indexOf("-") + 1, str.length);
        return newStr;
    }
    const convertStatus = (statusOrder) => {
        const result = status.filter((item, index) => {
            return item.includes(statusOrder);
        });
        return handleStatus(result[0]);
    }
    const getApiOrders = async () => {
        try {
            const response = await orderApi.searchCart({
                idUser: JSON.parse(localStorage.getItem("idUser")),
            });
            setOrders(response.order);
        }
        catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getApiOrders();
    }, []);
    const handlePercent = (price, discount) => {
        return price - (price * (discount / 100));
    }
    const handleString = (str) => {
        const newStr = str.slice(0, str.indexOf("T"));
        return newStr;
    }
    return (
        <main className={clsx(style.main)}>
            <SelectSpeed />
            <section className={clsx(style.orderAccount)}>
                {
                    orders.length > 0 ?
                        (
                            <>
                                <section className={clsx(style.orderAccount__head)}>
                                    <h1>Các sản phẩm bạn đã mua</h1>
                                </section>
                                <section className={clsx(style.orderAccount__body)}>
                                    {
                                        orders.map((item, index) => {
                                            return (
                                                <section key={index} className={clsx(style.inforOrder)}>
                                                    <Row
                                                        gutter={[{ sm: 20, xs: 15 }, { sm: 20, xs: 15 }]}
                                                        align={"middle"}
                                                    >
                                                        <Col xs={24}>
                                                            <section className={clsx(style.inforOrder__head)}>
                                                                <h1>{`Ngày mua: ${handleString(item.cart.createdAt)}`}</h1>
                                                            </section>
                                                        </Col>
                                                        {
                                                            item.cart.product.map((cart, index) => {
                                                                return (
                                                                    <Col xl={12} xs={24} key={index}>
                                                                        <section className={clsx(style.inforOrder__body)}>
                                                                            <img src={`data:image/png;base64,${cart.idRef.img}`} alt="" />
                                                                            <p>{`Tên sản phẩm: ${cart.idRef.name}`}</p>
                                                                            <p className={clsx(style.price)}>{`Giá sản phẩm: ${handlePercent(Number(cart.idRef.price), Number(cart.idRef.discount)).toLocaleString()} đ`}</p>
                                                                            <p>{`Số lượng: ${cart.quantity}`}</p>
                                                                            <p className={clsx(style.finish)}>{`${convertStatus(item.status)}`}</p>
                                                                            <Link to={`/product/detail/${cart.idRef._id}`}>
                                                                                Mua lại
                                                                            </Link>
                                                                        </section>
                                                                    </Col>
                                                                )
                                                            })
                                                        }

                                                    </Row>
                                                </section>
                                            )
                                        })
                                    }
                                </section>
                            </>
                        )
                        :
                        (
                            <section className={clsx(style.orderAccount__empty)}>
                                <img src={images.account.emptyOrder} alt="emptyProduct" />
                                <p>Bạn chưa mua sản phẩm nào !</p>
                                <Link to="/">
                                    <button>
                                        <AiOutlineRollback className={clsx(style.icon)} />
                                        <span>Mua hàng ngay</span>
                                    </button>
                                </Link>
                            </section>
                        )
                }
            </section>
        </main>
    )
}

export default OrderAccount;