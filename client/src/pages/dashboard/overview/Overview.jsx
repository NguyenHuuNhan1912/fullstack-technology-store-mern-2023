// Library
import { clsx } from 'clsx';

// Local
import style from './overview.module.scss';

// Icon
import { BsStack, BsCartCheckFill, BsCreditCard2FrontFill, BsFillCheckCircleFill} from 'react-icons/bs';
import {BiLoaderCircle} from 'react-icons/bi';
import {FaShippingFast} from 'react-icons/fa';
import {TiDelete} from 'react-icons/ti';


// Antd
import { Row, Col } from 'antd';

// React
import { useState, useEffect } from 'react';

// Api
import orderApi from 'api/modules/order.api';


const Overview = () => {
  const [orders, setOrders] = useState([]);
  const getOrdersApi = async () => {
    try {
      const response = await orderApi.getAll();
      setOrders(response.order);
    } 
    catch(err) {
      console.log(err);
    }
  }
  const getCountStatus  = (type) => {
    const status = orders.filter(item => item.status === type);
    return status.length;
  }
  const getMaxOrders = () => {
    let max = 0;
    orders.forEach((item, index) => {
      let money = Number(item.cart.total);
      if( money > max) {
        max = money;
      }
    })
    return max;
  }
  const getMinOrders = () => {
    let min = 9999999999;
    orders.forEach((item, index) => {
      let money = Number(item.cart.total);
      if( money < min) {
        min = money;
      }
    })
    return min;
  }
  const totalPriceOrders = () => {
    let total = 0;
    orders.forEach(item => total += Number(item.cart.total))
    return total;
  }
  useEffect(() => {
    getOrdersApi();
  }, []);
  return (
    <main className={clsx(style.dbOverview)}>
      <section className={clsx(style.dbOverview__numberOrder)}>
        <Row gutter={[20,20]}>
          <Col xl={24}>
            <div className={clsx(style.dbOverview__numberOrder__titleOrder)}>
              <h1>Đơn đặt hàng</h1>
            </div>
          </Col>
          <Col xl={8}>
            <div className={clsx(style.dbOverview__numberOrder__todayOrder)}>
              <BsStack className={clsx(style.icon)} />
              <h1>Đơn hàng giá trị nhất</h1>
              <strong>{`${getMaxOrders().toLocaleString()} đ`}</strong>
            </div>
          </Col>
          <Col xl={8}>
            <div className={clsx(style.dbOverview__numberOrder__monthOrder)}>
              <BsCartCheckFill className={clsx(style.icon)} />
              <h1>Đơn hàng thấp nhất</h1>
              <strong>{`${getMinOrders().toLocaleString()} đ`}</strong>
            </div>
          </Col>
          <Col xl={8}>
            <div className={clsx(style.dbOverview__numberOrder__totalOrder)}>
              <BsCreditCard2FrontFill className={clsx(style.icon)} />
              <h1>Tổng đơn hàng</h1>
              <strong>{`${totalPriceOrders().toLocaleString()} đ`}</strong>
            </div>
          </Col>
        </Row>
      </section>
      <section className={clsx(style.dbOverview__managementOrder)}>
        <Row gutter={[20,20]}>
          <Col xl={24}>
            <section className={clsx(style.dbOverview__managementOrder__titleOrder)}>
              <h1>Trạng thái đơn hàng</h1>
            </section>
          </Col>
          <Col xl={6}>
            <section className={clsx(style.dbOverview__managementOrder__totalOrder)}>
              <div className={clsx(style.dbOverview__managementOrder__totalOrder__head)}>
                <BsCartCheckFill className={clsx(style.icon)} />
              </div>
              <div className={clsx(style.dbOverview__managementOrder__totalOrder__body)}>
                <p>Số lượng</p>
                <strong>{orders.length}</strong>
              </div>
            </section>
          </Col>
          <Col xl={6}>
            <section className={clsx(style.dbOverview__managementOrder__orderPending)}>
              <div className={clsx(style.dbOverview__managementOrder__orderPending__head)}>
                <BiLoaderCircle className={clsx(style.icon)} />
              </div>
              <div className={clsx(style.dbOverview__managementOrder__orderPending__body)}>
                <p>Đang xử lý</p>
                <strong>{getCountStatus('pending')}</strong>
              </div>
            </section>
          </Col>
          <Col xl={6}>
            <section className={clsx(style.dbOverview__managementOrder__orderProcessing)}>
              <div className={clsx(style.dbOverview__managementOrder__orderProcessing__head)}>
                <FaShippingFast className={clsx(style.icon)} />
              </div>
              <div className={clsx(style.dbOverview__managementOrder__orderProcessing__body)}>
                <p>Đang giao</p>
                <strong>{getCountStatus('processing')}</strong>
              </div>
            </section>
          </Col>
          <Col xl={6}>
            <section className={clsx(style.dbOverview__managementOrder__orderDelivered)}>
              <div className={clsx(style.dbOverview__managementOrder__orderDelivered__head)}>
                <BsFillCheckCircleFill className={clsx(style.icon)} />
              </div>
              <div className={clsx(style.dbOverview__managementOrder__orderDelivered__body)}>
                <p>Đã giao</p>
                <strong>{getCountStatus('delivered')}</strong>
              </div>
            </section>
          </Col>
          <Col xl={6}>
            <section className={clsx(style.dbOverview__managementOrder__orderCancel)}>
              <div className={clsx(style.dbOverview__managementOrder__orderCancel__head)}>
                <TiDelete className={clsx(style.icon)} />
              </div>
              <div className={clsx(style.dbOverview__managementOrder__orderCancel__body)}>
                <p>Hủy đơn hàng</p>
                <strong>{getCountStatus('cancel')}</strong>
              </div>
            </section>
          </Col>
        </Row>
      </section>
    </main>
  )
}

export default Overview;