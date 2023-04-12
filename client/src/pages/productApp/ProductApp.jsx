import { clsx } from 'clsx';
import style from './productApp.module.scss';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import productAppApi from 'api/modules/productApp.api';
import { Row, Col } from 'antd';
import SelectSpeed from 'component/selectSpeed/SelectSpeed';
const ProductApp = () => {
  const type = useParams();
  const brand = useParams();
  const [product, setProduct] = useState([]);
  const getApi = async () => {
    try {
      const response = await productAppApi.getAll({
        type: type.type,
        brand: brand.brand
      });
      setProduct(response.product);
    }
    catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getApi();
  }, []);
  console.log(product);
  return (
    <main className={clsx(style.main)}>
      <SelectSpeed />
      <section className={clsx(style.productApp)}>
        <Row gutter={[{ md: 20, }, { md: 20 }]}>
          <Col md={7}>
            <div className={clsx(style.productApp__fillters)}>
              <div className={clsx(style.productApp__fillters__head)}>
                <h1>Lọc sản phẩm</h1>
              </div>
              <div className={clsx(style.productApp__fillters__body)}>
                <section className={clsx(style.price)}>
                  <h1>Theo giá</h1>
                  <ul>
                    <li>
                      <input type="checkbox" />
                      <span>Dưới 10 triệu</span>
                    </li>
                    <li>
                      <input type="checkbox" />
                      <span>Từ 10 triệu đến 20 triệu</span>
                    </li>
                    <li>
                      <input type="checkbox" />
                      <span>Từ 20 triệu đến 30 triệu</span>
                    </li>
                    <li>
                      <input type="checkbox" />
                      <span>Trên 40 triệu</span>
                    </li>
                  </ul>
                </section>
                <section className={clsx(style.color)}>
                  <h1>Theo màu sặc</h1>
                  <ul>
                    <li>
                      <input type="checkbox" />
                      <span>Màu vàng</span>
                    </li>
                    <li>
                      <input type="checkbox" />
                      <span>Màu bạc</span>
                    </li>
                    <li>
                      <input type="checkbox" />
                      <span>Màu đen</span>
                    </li>
                    <li>
                      <input type="checkbox" />
                      <span>Màu trằng</span>
                    </li>
                  </ul>
                </section>
                <section className={clsx(style.ram)}>
                  <h1>Theo RAM</h1>
                  <ul>
                    <li>
                      <input type="checkbox" />
                      <span>64 GB</span>
                    </li>
                    <li>
                      <input type="checkbox" />
                      <span>128 GB</span>
                    </li>
                    <li>
                      <input type="checkbox" />
                      <span>256 GB</span>
                    </li>
                    <li>
                      <input type="checkbox" />
                      <span>500 GB</span>
                    </li>
                  </ul>
                </section>
                <section className={clsx(style.screen)}>
                  <h1>Theo kích thước màn hình</h1>
                  <ul>
                    <li>
                      <input type="checkbox" />
                      <span>13"</span>
                    </li>
                    <li>
                      <input type="checkbox" />
                      <span>14"</span>
                    </li>
                    <li>
                      <input type="checkbox" />
                      <span>15"</span>
                    </li>
                    <li>
                      <input type="checkbox" />
                      <span>16"</span>
                    </li>
                  </ul>
                </section>
              </div>
            </div>
          </Col>
          <Col md={17}>
            <div className={clsx(style.productApp__product)}>
              <Row gutter={[{ sm: 20, xs: 15 }, { sm: 20, xs: 15 }]}>
                {
                  product.length > 0 &&
                  product.map((item, index) => {
                    return (
                      <Col key={index} xl={6} lg={8} sm={12} xs={24}>
                          <Link to={`/product/detail/${item._id}`}>
                            <div className={clsx(style.productItem)}>
                                <img src={`data:image/png;base64,${item.img}`} alt="img" />
                                <p>{item.name}</p>
                                <h1>{`${Number(item.price).toLocaleString()} đ`}</h1>
                            </div>
                          </Link>
                      </Col>
                    )
                  })
                }

              </Row>
            </div>
          </Col>
        </Row>
      </section>
    </main>
  )
}

export default ProductApp;