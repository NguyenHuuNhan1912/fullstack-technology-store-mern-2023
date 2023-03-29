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
                    <Row gutter={[{ xl: 20, }, { xl: 20 }]}>
                        {
                            orders.map((item, index) => {
                                return (
                                    <Col xl={8}>
                                        <section key={index} className={clsx(style.inforProduct)}>
                                            <h1 className={clsx(style.inforProduct__head)}>{`Ngày mua: ${handleString(item.cart.createdAt)}`}</h1>
                                            <section className={clsx(style.inforProduct__body)}>
                                                {
                                                    item.cart.product.map((item, index) => {
                                                        return (
                                                            <section key={index}>
                                                                <h1>{`Tên sản phẩm: ${item.idRef.name}`}</h1>
                                                                <h1>{`Giá sản phẩm: ${item.idRef.price}`}</h1>
                                                                <h1>{`Số lượng ${item.quantity}`}</h1>
                                                                <h1>Đã giao</h1>
                                                            </section>

                                                        )
                                                    })
                                                }
                                            </section>
                                        </section>
                                    </Col>            
                                )
                            })
                        }
                    </Row>
                </section>
            </section>
        </main>
    )
}

export default OrderAccount;