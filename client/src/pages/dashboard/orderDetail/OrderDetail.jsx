import { clsx } from 'clsx';
import { Row, Col } from 'antd';
import style from './orderDetail.module.scss';
import images from 'assets/images';
import { useEffect, useState } from 'react';
import orderApi from 'api/modules/order.api';
import { useParams } from 'react-router-dom';
import { FaFileInvoiceDollar } from 'react-icons/fa';
import { AiOutlineRollback } from 'react-icons/ai';
import { Link } from 'react-router-dom';
const status = ['pending-Đang xử lý', 'processing-Đang giao', 'delivered-Đã giao', 'cancel-Hủy đơn hàng'];

const OrderDetail = () => {
    const [orderDetail, setOrderDetail] = useState({});
    const [product, setProduct] = useState([]);
    const idOrder = useParams();
    console.log(idOrder.id);
    const handleStatus = (str) => {
        const newStr = str.slice(str.indexOf("-") + 1, str.length);
        return newStr;
    }
    const convertStatus = (statusOrder) => {
        if (statusOrder !== undefined) {
            const result = status.filter((item, index) => {
                return item.includes(statusOrder);
            });
            return handleStatus(result[0]);
        }
    }
    const getApiOrderDetail = async () => {
        try {
            const response = await orderApi.getOne(idOrder.id);
            setOrderDetail(response);
            setProduct(response.cart.product);
        }
        catch (err) {
            console.log(err);
        }
    }
    const handleString = (str) => {
        return (str !== undefined) ? str.slice(0, str.indexOf("T")) : '';
    }
    useEffect(() => {
        getApiOrderDetail();
    }, []);
    console.log(orderDetail);
    console.log(product);
    return (
        <main className={clsx(style.main)}>
            <section className={clsx(style.orderDetail)}>
                <section className={clsx(style.orderDetail__title)}>
                    <section>
                        <FaFileInvoiceDollar className={clsx(style.icon)} />
                        <h1>Hóa đơn chi tiết</h1>
                    </section>
                </section>
                <section className={clsx(style.orderDetail__infor)}>
                    <Row
                        gutter={[{ xl: 20, }, { xl: 20 }]}
                        align="middle"
                    >
                        <Col xl={8}>
                            <section className={clsx(style.orderDetail__infor__date)}>
                                <div className={clsx(style.orderDetail__infor__date__head)}>
                                    <h1>Ngày thanh toán</h1>
                                </div>
                                <div className={clsx(style.orderDetail__infor__date__body)}>
                                    <ul>
                                        <li><span>{`${handleString(orderDetail.createdAt)}`}</span></li>

                                    </ul>
                                </div>
                            </section>
                        </Col>
                        <Col xl={8}>
                            <section className={clsx(style.orderDetail__infor__customer)}>
                                <div className={clsx(style.orderDetail__infor__customer__head)}>
                                    <h1>Thông tin khách hàng</h1>
                                </div>
                                <div className={clsx(style.orderDetail__infor__customer__body)}>
                                    <ul>
                                        <li>
                                            <span>{`Tên: ${orderDetail.name}`}</span>
                                        </li>
                                        <li>
                                            <span>{`Số điện thoại: ${orderDetail.numberPhone}`}</span>
                                        </li>
                                    </ul>
                                </div>
                            </section>
                        </Col>
                        <Col xl={8}>
                            <section className={clsx(style.orderDetail__infor__address)}>
                                <div className={clsx(style.orderDetail__infor__address__head)}>
                                    <h1>Thông tin khách hàng</h1>
                                </div>
                                <section className={clsx(style.orderDetail__infor__address__body)}>
                                    <ul>
                                        <li>
                                            <span>{`Tỉnh: ${orderDetail.province}`}</span>
                                        </li>
                                        <li>
                                            <span>{`Huyện: ${orderDetail.districts}`}</span>
                                        </li>
                                        <li>
                                            <span>{`Xã: ${orderDetail.hometown}`}</span>
                                        </li>
                                        <li>
                                            <span>{`Địa chị cụ thể: ${orderDetail.address}`}</span>

                                        </li>
                                    </ul>
                                </section>
                            </section>
                        </Col>
                    </Row>
                </section>
                <section className={clsx(style.orderDetail__product)}>
                    <table>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Ảnh</th>
                                <th>Tên</th>
                                <th>Số lượng</th>
                                <th>Giảm giá</th>
                                <th>Giá</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                product.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <img src={`data:image/png;base64,${item.idRef.img}`} alt="img" />
                                            </td>
                                            <td>{item.idRef.name}</td>
                                            <td>{item.quantity}</td>
                                            <td>{`${item.idRef.discount}%`}</td>
                                            <td>{`${Number(item.idRef.price).toLocaleString()}đ`}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </section>
                <section className={clsx(style.orderDetail__important)}>
                    <Row
                        gutter={[{ xl: 20 }, { xl: 20 }]}
                        align="middle"
                    >
                        <Col xl={8}>
                            <div className={clsx(style.orderDetail__important__status)}>
                                <h1>Trạng thái</h1>
                                <p className={clsx(style.status)}>{`${convertStatus(orderDetail.status)}`}</p>
                            </div>
                        </Col>
                        <Col xl={8}>
                            <div className={clsx(style.orderDetail__important__code)}>
                                <h1>Phương thức thanh toán</h1>
                                <p>Nhận hàng thu tiền hộ</p>
                            </div>
                        </Col>
                        <Col xl={8}>
                            <div className={clsx(style.orderDetail__important__total)}>
                                <h1>Tổng chi phí</h1>
                                <p className={clsx(style.price)}>{`${Number(orderDetail.total).toLocaleString()}đ`}</p>
                            </div>
                        </Col>
                    </Row>
                </section>
                <section className={clsx(style.orderDetail__back)}>
                    <Link to="/dashboard/orders">
                        <button>
                            <AiOutlineRollback className={clsx(style.icon)} />
                            <span>Trở lại</span>
                        </button>
                    </Link>
                </section>
            </section>
        </main>
    )
}
export default OrderDetail;