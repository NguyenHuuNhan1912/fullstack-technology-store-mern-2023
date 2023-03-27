import { clsx } from 'clsx';
import style from './productDetail.module.scss';
import { Row, Col } from 'antd';
import { AiFillPlusCircle, AiFillEdit, AiFillDelete } from 'react-icons/ai';
import categoryApi from "api/modules/category.api";
import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import productApi from 'api/modules/product.api';
import images from 'assets/images/index'
import { Link } from 'react-router-dom';
import { Bars } from 'react-loader-spinner';

const ProductDetail = () => {
  const idProduct = useParams();
  const [product, setProduct] = useState();
  const [keyInfor, setKeyInfor] = useState([]);
  const [valueInfor, setValueInfor] = useState([]);
  const [loading, setLoading] = useState(true);
  const getProductDetail = async (id) => {
    setLoading(true);
    try {
      const response = await productApi.getOne(id);
      setProduct(response);
      setKeyInfor(Object.keys(response.information));
      setValueInfor(Object.values(response.information));
    }
    catch (err) {
      console.log(err);
    }
    setLoading(false);
  }
  useEffect(() => {
    getProductDetail(idProduct.id);
  }, []);
  console.log('log');
  console.log(product);
  console.log(keyInfor);
  console.log(valueInfor);
  console.log('log');

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
        ) :
          (
            <section className={clsx(style.productDetail)}>
              <Row gutter={[{ xl: 60 }, { xl: 60 }]} align="middle">
                <Col xl={12}>
                  <div className={clsx(style.productDetail__head)}>
                    <img src={`data:image/png;base64,${product?.img}`} alt="" />
                  </div>
                </Col>
                <Col xl={12}>
                  <div className={clsx(style.productDetail__body)}>
                    <ul>
                      <li><span>{product?.name}</span></li>
                      <li className={clsx(style.typeBrand)}>
                        <span>{product?.type}</span>
                        <span>{product?.brand}</span>
                      </li>
                      <li className={clsx(style.price)}><span>{`${Number(product?.price).toLocaleString()}đ`}</span></li>
                      <li>Số lượng: {product?.quantity}</li>
                      <li><span>{`Khuyến mãi: ${product?.discount}%`}</span></li>
                      {
                        product?.publish > 0 ? (<li>Trạng thái: Cho phép giao dịch</li>) : (<li>Trạng thái: Không cho phép giao dịch</li>)
                      }
                      <li className={clsx(style.infor)}><span>Thông tin chi tiết sản phẩm</span></li>
                      {
                        keyInfor.length > 0 && keyInfor.map((item, index) => {
                          return (
                            <li key={index}>{`${item}: ${valueInfor[index]}`}</li>
                          )
                        })
                      }
                    </ul>
                    <Link to="/dashboard/product">
                      <button>Trở về</button>
                    </Link>
                  </div>
                </Col>
              </Row>
            </section>
          )
      }

    </main>
  )
}

export default ProductDetail;