// Library
import { clsx } from 'clsx';

// Local
import style from './productApp.module.scss';

// React
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
// Api
import productAppApi from 'api/modules/productApp.api';

// Antd
import { Row, Col } from 'antd';

// Images
import images from 'assets/images';


// Component
import SelectSpeed from 'component/selectSpeed/SelectSpeed';
import productApi from 'api/modules/product.api';

const ProductApp = () => {
  const type = useParams();
  const brand = useParams();
  const [product, setProduct] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [filters, setFilters] = useState({
    type: type.type,
    brand: brand.brand,
    fromPrice: '',
    toPrice: '',
    ram: '',
    screen: '',
  });

  const getApi = async () => {
    try {
      const response = await productApi.filtersProductDetail(filters);
      setProduct(response.products);
    }
    catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const initialFilters = {
      type: type.type,
      brand: brand.brand,
      fromPrice: queryParams.get('fromPrice') || '',
      toPrice: queryParams.get('toPrice') || '',
      ram: queryParams.get('ram') || '',
      screen: queryParams.get('screen') || '',
    };
    setFilters(initialFilters);
    const areAllFiltersPresent =
      initialFilters.type !== '' &&
      initialFilters.brand !== '' &&
      initialFilters.fromPrice !== '' &&
      initialFilters.toPrice !== '' &&
      initialFilters.ram !== '' &&
      initialFilters.screen !== '';
    if (!areAllFiltersPresent) {
      updateURLWithFilters(initialFilters);
    }
  }, [location.search]);

  useEffect(() => {
    getApi();
  }, [filters]);

  // Function to update URL with new query parameters
  const updateURLWithFilters = (newFilters) => {
    const newSearchParams = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, value]) => {
      newSearchParams.set(key, value);
    });
    window.history.replaceState({}, '', `/product/${type.type}/${brand.brand}?${newSearchParams.toString()}`);
  };


  const handleFilterChange = (filtersName, filtersValue, type) => {
    switch (type) {
      case 'price':
        console.log("LOG");
        setFilters((prevFilters) => ({
          ...prevFilters,
          [filtersName.fromPrice]: filtersValue.fromPrice,
          [filtersName.toPrice]: filtersValue.toPrice,
        }));
        updateURLWithFilters({
          ...filters,
          [filtersName.fromPrice]: filtersValue.fromPrice,
          [filtersName.toPrice]: filtersValue.toPrice,
        });
        break;
      case 'ram':
        console.log("LOG");
        setFilters((prevFilters) => ({
          ...prevFilters,
          [filtersName.ram]: filtersValue.ram,
        }));
        updateURLWithFilters({
          ...filters,
          [filtersName.ram]: filtersValue.ram,
        });
        break;
      case 'screen':
        console.log("LOG");
        setFilters((prevFilters) => ({
          ...prevFilters,
          [filtersName.screen]: filtersValue.screen,
        }));
        updateURLWithFilters({
          ...filters,
          [filtersName.screen]: filtersValue.screen,
        });
        break;
      default:
        break;
    }
  };

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
                      <input
                        type="radio"
                        name="price-range"
                        id="range1"
                        onClick={() => {
                          handleFilterChange(
                            { fromPrice: 'fromPrice', toPrice: 'toPrice' },
                            { fromPrice: 1, toPrice: 10000000 },
                            'price'
                          )
                        }
                        }
                      />
                      <label htmlFor="range1">Dưới 10 triệu</label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        name="price-range"
                        id="range2"
                        onClick={() => {
                          handleFilterChange(
                            { fromPrice: 'fromPrice', toPrice: 'toPrice' },
                            { fromPrice: 10000000, toPrice: 20000000 },
                            'price'
                          )
                        }
                        }
                      />
                      <label htmlFor="range2">Từ 10 triệu đến 20 triệu</label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        name="price-range"
                        id="range3"
                        onClick={() => {
                          handleFilterChange(
                            { fromPrice: 'fromPrice', toPrice: 'toPrice' },
                            { fromPrice: 20000000, toPrice: 30000000 },
                            'price'
                          )
                        }
                        }
                      />
                      <label htmlFor="range3">Từ 20 triệu đến 30 triệu</label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        name="price-range"
                        id="range4"
                        onClick={() => {
                          handleFilterChange(
                            { fromPrice: 'fromPrice', toPrice: 'toPrice' },
                            { fromPrice: 40000000, toPrice: 500000000 },
                            'price'
                          )
                        }
                        }
                      />
                      <label htmlFor="range4">Trên 40 triệu</label>
                    </li>
                  </ul>
                </section>
                <section className={clsx(style.color)}>
                  <h1>Theo màu sắc</h1>
                  <ul>
                    <li>
                      <input
                        type="radio"
                        name="color-range"
                        id="range1"
                      />
                      <label htmlFor="range1">Màu vàng</label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        name="color-range"
                        id="range2"
                      />
                      <label htmlFor="range2">Màu xanh</label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        name="color-range"
                        id="range3"
                      />
                      <label htmlFor="range3">Màu đen</label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        name="color-range"
                        id="range4"
                      />
                      <label htmlFor="range4">Màu xám</label>
                    </li>
                  </ul>
                </section>
                <section className={clsx(style.ram)}>
                  <h1>Theo RAM</h1>
                  <ul>
                    <li>
                      <input
                        type="radio"
                        name="ram-range"
                        id="range1"
                        onClick={() => {
                          handleFilterChange(
                            { ram: 'ram' },
                            { ram: '8' },
                            'ram'
                          )
                        }
                        }
                      />
                      <label htmlFor="range1">8 GB</label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        name="ram-range"
                        id="range2"
                        onClick={() => {
                          handleFilterChange(
                            { ram: 'ram', },
                            { ram: '16' },
                            'ram'
                          )
                        }
                        }
                      />
                      <label htmlFor="range2">16 GB</label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        name="ram-range"
                        id="range3"
                        onClick={() => {
                          handleFilterChange(
                            { ram: 'ram' },
                            { ram: '64' },
                            'ram'
                          )
                        }
                        }
                      />
                      <label htmlFor="range3">64 GB</label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        name="ram-range"
                        id="range4"
                        onClick={() => {
                          handleFilterChange(
                            { ram: 'ram' },
                            { ram: '128' },
                            'ram'
                          )
                        }
                        }
                      />
                      <label htmlFor="range4">128 GB</label>
                    </li>
                  </ul>
                </section>
                <section className={clsx(style.screen)}>
                  <h1>Theo kích thước màn hình</h1>
                  <ul>
                    <li>
                      <input
                        type="radio"
                        name="screen-range"
                        id="range1"
                        onClick={() => {
                          handleFilterChange(
                            { screen: 'screen' },
                            { screen: '13' },
                            'screen'
                          )
                        }
                        }
                      />
                      <label htmlFor="range1">13 "</label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        name="screen-range"
                        id="range2"
                        onClick={() => {
                          handleFilterChange(
                            { screen: 'screen' },
                            { screen: '14' },
                            'screen'
                          )
                        }
                        }
                      />
                      <label htmlFor="range2">14 "</label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        name="screen-range"
                        id="range3"
                        onClick={() => {
                          handleFilterChange(
                            { screen: 'screen' },
                            { screen: '15' },
                            'screen'
                          )
                        }
                        }
                      />
                      <label htmlFor="range3">15 "</label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        name="screen-range"
                        id="range4"
                        onClick={() => {
                          handleFilterChange(
                            { screen: 'screen' },
                            { screen: '16' },
                            'screen'
                          )
                        }
                        }
                      />
                      <label htmlFor="range4">16 "</label>
                    </li>
                  </ul>
                </section>
              </div>
            </div>
          </Col>
          <Col md={17}>
            <div className={clsx(style.productApp__product)}>
              {
                product.length > 0 ?
                  <Row gutter={[{ sm: 20, xs: 15 }, { sm: 20, xs: 15 }]}>
                    {

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
                  :
                  <section className={clsx(style.emptyProduct)}>
                    <img src={images.account.emptyOrder} alt="emptyProduct" />
                    <h1>Không tìm thấy sản phẩm</h1>
                  </section>
              }
            </div>
          </Col>
        </Row>
      </section>
    </main>
  )
}

export default ProductApp;