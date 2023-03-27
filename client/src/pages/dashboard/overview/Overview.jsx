
import { clsx } from 'clsx';
import style from './overview.module.scss';
import { BsStack, BsCartCheckFill, BsCreditCard2FrontFill, BsFillCheckCircleFill} from 'react-icons/bs';
import {BiLoaderCircle} from 'react-icons/bi';
import {FaShippingFast} from 'react-icons/fa';
import { Row, Col } from 'antd';
const Overview = () => {
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
              <h1>Đặt hàng hôm nay</h1>
              <strong>63.000.000 Đ</strong>
            </div>
          </Col>
          <Col xl={8}>
            <div className={clsx(style.dbOverview__numberOrder__monthOrder)}>
              <BsCartCheckFill className={clsx(style.icon)} />
              <h1>Đặt hàng tháng này</h1>
              <strong>630.000.000 Đ</strong>
            </div>
          </Col>
          <Col xl={8}>
            <div className={clsx(style.dbOverview__numberOrder__totalOrder)}>
              <BsCreditCard2FrontFill className={clsx(style.icon)} />
              <h1>Tổng đơn hàng</h1>
              <strong>190.000.000 Đ</strong>
            </div>
          </Col>
        </Row>
      </section>
      <section className={clsx(style.dbOverview__managementOrder)}>
        <Row gutter={[20,20]}>
          <Col xl={24}>
            <section className={clsx(style.dbOverview__managementOrder__titleOrder)}>
              <h1>Quản lý đơn hàng</h1>
            </section>
          </Col>
          <Col xl={6}>
            <section className={clsx(style.dbOverview__managementOrder__totalOrder)}>
              <div className={clsx(style.dbOverview__managementOrder__totalOrder__head)}>
                <BsCartCheckFill className={clsx(style.icon)} />
              </div>
              <div className={clsx(style.dbOverview__managementOrder__totalOrder__body)}>
                <p>Số lượng</p>
                <strong>248</strong>
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
                <strong>63</strong>
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
                <strong>91</strong>
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
                <strong>19</strong>
              </div>
            </section>
          </Col>
        </Row>
      </section>
    </main>
  )
}

export default Overview;