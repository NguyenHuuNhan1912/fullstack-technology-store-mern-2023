import { clsx } from 'clsx';
import style from './orderAccount.module.scss';
import orderApi from 'api/modules/order.api';
import { useEffect, useState } from 'react';
import SelectSpeed from 'component/selectSpeed/SelectSpeed';
import { Row, Col } from 'antd';
const OrderAccount = () => {
    const [orders, setOrders] = useState([]);
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
    console.log(orders);
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
                <section className={clsx(style.orderAccount__head)}>
                    <h1>Các sản phẩm bạn đã mua</h1>
                </section>
                <section className={clsx(style.orderAccount__body)}>

                    {
                        orders.map((item, index) => {
                            return (
                                <section key={index} className={clsx(style.inforProduct)}>
                                    <Row 
                                        gutter={[{ xl: 20 }, { xl: 20 }]}
                                        align={"middle"}
                                    >
                                        <Col xl={24}>
                                            <section className={clsx(style.inforProduct__head)}>
                                                <h1>{`Ngày mua: ${handleString(item.cart.createdAt)}`}</h1>
                                            </section>
                                        </Col>
                                        {
                                            item.cart.product.map((item, index) => {
                                                return (
                                                    <Col xl={12}>
                                                        <section key={index} className={clsx(style.inforProduct__body)}>
                                                            <img src={`data:image/png;base64,${item.idRef.img}`} alt="" />
                                                            <p>{`Tên sản phẩm: ${item.idRef.name}`}</p>
                                                            <p className={clsx(style.price)}>{`Giá sản phẩm: ${handlePercent(Number(item.idRef.price), Number(item.idRef.discount)).toLocaleString()} đ`}</p>
                                                            <p>{`Số lượng: ${item.quantity}`}</p>
                                                            <p>Đã giao</p>
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
            </section>
        </main>
    )
}

export default OrderAccount;