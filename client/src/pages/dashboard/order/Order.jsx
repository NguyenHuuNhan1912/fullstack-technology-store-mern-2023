import { clsx } from 'clsx';
import style from './order.module.scss';
import images from 'assets/images';
import { Bars } from 'react-loader-spinner';
import { Row, Col } from 'antd';
import { FaSearch } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import orderApi from 'api/modules/order.api';
import { Link } from 'react-router-dom';
import useFetchApi from 'hooks/useFectchApi';
const status = ['pending-Đang xử lý', 'processing-Đang giao', 'delivered-Đã giao', 'cancel-Hủy đơn hàng'];

const Orders = () => {
  let { loading, dataTempOrder } = useFetchApi(orderApi);
  const [orders, setOrders] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [statusOrder, setStatusOrder] = useState('');
  const [editStatus, setEditStatus] = useState('');
  const handleChangeEditStatus = (e, id) => {
    if (e.target.value !== '') {
      setEditStatus(e.target.value);
      updateStatus(id, e.target.value);
    }
    setSearchText('');
  }
  const handleChangeStatus = (e) => {
    if (e.target.value === '') {
      setStatusOrder(e.target.value);
      setOrders(dataTempOrder);
    }
    else {
      updateOrder(e.target.value);
      setStatusOrder(e.target.value);
    }
    setSearchText('');
  }
  const handleSearchText = (e) => {
    const numberPhone = [];
    dataTempOrder.forEach((item) => {
      numberPhone.push(item.numberPhone.toLowerCase());
    });
    const searchResult = dataTempOrder.filter((item, index) => {
      return numberPhone[index].includes(e.target.value.toLowerCase());
    })
    setOrders(searchResult);
    setSearchText(e.target.value);
  }
  const handleString = (str) => {
    const newStr = str.slice(0, str.indexOf("T"));
    return newStr;
  }
  const handleStatus = (str) => {
    const newStr = str.slice(str.indexOf("-") + 1, str.length);
    return newStr;
  }
  const convertStatus = (statusOrder) => {
    const result = status.filter((item) => {
      return item.includes(statusOrder);
    });
    return handleStatus(result[0]);
  }
  const updateOrder = async (status) => {
    try {
      const response = await orderApi.filtersStatus({
        status: status,
      })
      setOrders(response.order);
    }
    catch (err) {
      console.log(err);
    }
  }
  const getApi = async () => {
    try {
      const response = await orderApi.getAll();
      setOrders(response.order);
    }
    catch (err) {
      console.log(err);
    }
  }
  const updateStatus = async (id, status) => {
    try {
      const response = await orderApi.update(id, {
        status: status,
      });
      getApi();
    }
    catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getApi();
  }, []);
  return (
    <main className={clsx(style.main)}>
      {
        loading ? (
          <section className={clsx(style.loading)}>
            <Bars
              height="80"
              width="80"
              color="#049c62"
              ariaLabel="bars-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </section>
        )
          :
          (
            <section className={clsx(style.order)}>
              <section className={clsx(style.order__head)}>
                <Row gutter={[20, 20]}>
                  <Col xl={12}>
                    <section className={clsx(style.formGroup)}>
                      <input
                        type="text"
                        name="name"
                        placeholder='Lọc theo số điện thoại'
                        autoComplete='off'
                        value={searchText}
                        onChange={handleSearchText}
                      />
                    </section>
                  </Col>
                  <Col xl={12}>
                    <div className={clsx(style.formGroup)}>
                      <select
                        name="type"
                        value={statusOrder}
                        onChange={handleChangeStatus}
                      >
                        <option value=''>Lọc theo trạng thái</option>
                        <option value="pending">Đang xử lý</option>
                        <option value="processing">Đang giao</option>
                        <option value="delivered">Đã giao</option>
                        <option value="cancel">Hủy đơn hàng</option>
                      </select>
                    </div>
                  </Col>
                </Row>
              </section>
              <section className={clsx(style.order__body)}>
                {
                   orders.length === 0
                   ?
                   <section className={clsx(style.emptyOrder)}>
                    <img src={images.dashboard.main.order.emptyOrder} alt="" />
                    <h1>Không có đơn hàng tương ứng</h1>
                   </section>
                   :
                  <table>
                    <thead>
                      <tr>
                        <th>STT</th>
                        <th>Địa chỉ</th>
                        <th>Tên</th>
                        <th>Số điện thoại</th>
                        <th>Ngày thanh toán</th>
                        <th>Chi phí</th>
                        <th>Phương thức</th>
                        <th>Trạng thái</th>
                        <th>Hiệu chỉnh</th>
                        <th>Chi tiết</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        orders?.length &&
                        orders.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{item.address}</td>
                              <td>{item.name}</td>
                              <td>{item.numberPhone}</td>
                              <td>{`${handleString(item.createdAt)}`}</td>
                              <td>{`${Number(item.total).toLocaleString()}đ`}</td>
                              <td>{`${item.method}`}</td>
                              <td className={clsx(style.status)}>
                                <span>{`${convertStatus(item.status)}`}</span>
                              </td>
                              <td>
                                <div className={clsx(style.statusUpdate)}>
                                  <select
                                    name='status'
                                    value={item.status || editStatus}
                                    onChange={(e) => { handleChangeEditStatus(e, item._id) }}
                                  >
                                    <option value=''>Trạng thái</option>
                                    <option value="pending">Đang xử lý</option>
                                    <option value="processing">Đang giao</option>
                                    <option value="delivered">Đã giao</option>
                                    <option value="cancel">Hủy đơn hàng</option>
                                  </select>
                                </div>
                              </td>
                              <td>
                                <section className={clsx(style.actionCustomer)}>
                                  <Link to={`order-detail/${item._id}`}>
                                    <FaSearch className={clsx(style.icon)} />
                                  </Link>
                                </section>
                              </td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                }
              </section>
            </section>
          )
      }
    </main>
  )
}

export default Orders;