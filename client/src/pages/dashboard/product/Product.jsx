import { clsx } from 'clsx';
import style from './product.module.scss';
import { AiFillPlusCircle } from 'react-icons/ai';
import { Row, Col } from 'antd';
import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { FaSearchPlus } from 'react-icons/fa';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { RiDeleteBack2Fill } from 'react-icons/ri';
// import ProductAdd from 'component/productAdd/ProductAdd';
import { toast } from 'react-toastify';
import ProductForm from 'component/productForm/ProductForm';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Modal, Switch } from 'antd';
import { Drawer } from 'antd';
import productApi from "api/modules/product.api";
import categoryApi from "api/modules/category.api";
import { Bars } from 'react-loader-spinner';
import images from 'assets/images';
import Pagination from 'component/Pagination/Pagination';
import { responsiveArray } from 'antd/es/_util/responsiveObserver';
import toastNotification from 'handler/toast.handler';

var DEFAULT_SKIP = 0;
var DEFAULT_LIMIT = 15;
var DEFAULT_TYPE = '';
var DEFAULT_PRICE = '';
const Product = () => {
  
  const [product, setProduct] = useState([]);
  const [productField, setProductField] = useState({});
  const [category, setCategory] = useState([]);
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productEdit, setProductEdit] = useState();
  const [brandProductEdit, setBrandProductEdit] = useState([]);
  const [labelField, setLabelField] = useState([]);
  const [id, setId] = useState('');
  const [loading, setLoading] = useState(true);
  const [productType, setProductType] = useState('');
  const [sortPrice, setSortPrice] = useState('');
  const [showPagination, setShowPagination] = useState(true);
  const [pagination, setPagination] = useState({
    page: 0,
    totalPages: 0,
    limit: 0,
    totalProduct: 0,
  })
  const [searchProduct, setSearchProduct] = useState('');
  const handleSearch = (e) => {
    console.log(e.target.value);
    setSearchProduct(e.target.value);
  }
  const getApiFilterName = async (name) => {
    setLoading(true);
    DEFAULT_SKIP = 0;
    try {
      const response = await productApi.filtersName({
        skip: DEFAULT_SKIP,
        limit: DEFAULT_LIMIT,
        name: name,

      });
      setProduct(response.result);
      setPagination({
        page: response.page,
        limit: response.limit,
        totalProduct: response.totalProduct,
        totalPages: response.totalPages,
        length: response.length
      });
      setLoading(false);
    }
    catch(err) {
      console.log(err);
    }
    setShowPagination(false);
  }
  const handleSearchEnter = (e) => {
    if(e.keyCode === 13) {
      console.log(searchProduct);
      setProductType('');
      setSortPrice('');
      getApiFilterName(searchProduct);
      
    }
  }
  const getApiFilter = async (type) => {
    setLoading(true);
    DEFAULT_SKIP = 0;
    try {
      const response = await productApi.getAll({
        skip: DEFAULT_SKIP,
        limit: DEFAULT_LIMIT,
        type: type,
        price: DEFAULT_PRICE,
      });
      setProduct(response.product);
      setPagination({
        page: response.page,
        limit: response.limit,
        totalProduct: response.totalProduct,
        totalPages: response.totalPages,
        length: response.length
      });
      setProductType(response.type);

    }
    catch (err) {
      console.log(err);
    }
    setLoading(false);
  }
  const handleChangeFilterType = (e) => {
    setSearchProduct('');
    DEFAULT_TYPE = e.target.value;
    getApiFilter(e.target.value);
    setShowPagination(true);
  }
  const handleSortPrice = (e) => {
    setSearchProduct('');
    console.log(e.target.value);
    DEFAULT_PRICE = e.target.value;
    setSortPrice(e.target.value);
    getApi();
    setShowPagination(true);
  }
  const handlePageChange = (newPage, type) => {
    console.log(newPage, type);
    if (type === 'next') {
      DEFAULT_SKIP = DEFAULT_SKIP + DEFAULT_LIMIT;
      if (DEFAULT_SKIP < pagination.totalProduct) {
        setPagination({ ...pagination, page: newPage });
        getApi();
      }
      else {
        console.log(DEFAULT_SKIP);
      }
    }
    else {
      if (!(DEFAULT_SKIP <= 0)) {
        DEFAULT_SKIP = DEFAULT_SKIP - DEFAULT_LIMIT;
        setPagination({ ...pagination, page: newPage });
        getApi();
      }
    }
  }
  const showModal = (id) => {
    setIsModalOpen(true);
    setId(id);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    handleDelete(id);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const getApi = async () => {
    setLoading(true);
    try {
      const response = await productApi.getAll({
        skip: DEFAULT_SKIP,
        limit: DEFAULT_LIMIT,
        type: DEFAULT_TYPE,
        price: DEFAULT_PRICE,
      });
      setProduct(response.product);
      setPagination({
        page: response.page,
        limit: response.limit,
        totalProduct: response.totalProduct,
        totalPages: response.totalPages,
        length: response.length
      });
      setProductType(response.type);
    }
    catch (err) {
      console.log(err);
    }
    setLoading(false);
  }
  const getApiCategory = async () => {
    try {
      const response = await categoryApi.getAll();
      setCategory(response.category);
    }
    catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getApi();
    getApiCategory();
    console.log('case usefeect');
  }, []);

  const handleClickAdd = () => {
    setOpen(true);
    setProductEdit(undefined);
    setProductField({});
    setBrandProductEdit([]);
    setLabelField([]);
  }
  const handleClickEdit = (item) => {
    setOpen(true);
    setIsEdit(true);
    setProductEdit(item);
    setProductField(item.information);
    category.forEach((cate, index) => {
      if (cate.name === item.type) {
        setBrandProductEdit(cate.brand);
        setLabelField(Object.keys(item.information));
      }
    })
  }
  const handleDelete = async (id) => {
    console.log(id);
    try {
      await productApi.delete(id);
      getApi();
      setTimeout(() => {
        toastNotification('success', 'Xóa sản phẩm thành công !', 1000);
      }, 800);
    }
    catch (err) {
      console.log(err);
    }
  }
  const updatePublish = async (id, value) => {
    try {
      await productApi.update(id, value);
      getApi();
    }
    catch (err) {
      console.log(err);
    }
  }
  const onChange = (id) => {
    const productItem = product.find((item, index) => {
      return item._id === id;
    })
    if (productItem.publish === '0') {
      productItem.publish = '1';
    }
    else {
      productItem.publish = '0';
    }
    updatePublish(id, productItem)
  };
  return (

    <main className={clsx(style.dbProductWrapper)} >
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
            <>
              <section className={clsx(style.dbProduct)}>
                <Row gutter={[20, 20]}>
                  <Col xl={24}>
                    <section className={clsx(style.dbProduct__upload)}>
                      <Row gutter={[20, 20]}>
                        <Col xl={6}>
                          <div className={clsx(style.formGroup)}>
                            <input
                              type="text"
                              placeholder='Nhập tên sản phẩm cần tìm'
                              value={searchProduct}
                              onChange={handleSearch}
                              onKeyUp={handleSearchEnter}
                            />
                          </div>
                        </Col>
                        <Col xl={6}>
                          <div className={clsx(style.formGroup)}>
                            <select name="type" value={productType} onChange={handleChangeFilterType}>
                              <option value=''>Loại sản phẩm</option>
                              <option value="laptop">Laptop</option>
                              <option value="smartphone">Điện thoại</option>
                              <option value="tablet">Máy tính bảng</option>
                              <option value="smartwatch">Đồng hồ</option>
                              <option value="mouse">Chuột</option>
                              <option value="keyboard">Bàn phím</option>
                            </select>
                          </div>
                        </Col>
                        <Col xl={6}>
                          <div className={clsx(style.formGroup)}>
                            <select 
                              name="price"
                              value={sortPrice}
                              onChange={handleSortPrice}
                            >
                              <option value=''>Lọc theo giá</option>
                              <option value="low">Từ thấp đến cao</option>
                              <option value="hight">Từ cao đến thấp</option>
                            </select>
                          </div>
                        </Col>
                        <Col xl={6}>
                          <div className={clsx(style.formGroup)}>
                            <section className={clsx(style.addProduct)}>
                              <button className={clsx(style.btn, style.btnAdd)} onClick={handleClickAdd}>
                                <AiFillPlusCircle className={clsx(style.icon)} />
                                <span>Thêm sản phẩm</span>
                              </button>
                            </section>
                          </div>
                        </Col>
                      </Row>
                    </section>
                  </Col>
                  <Col xl={24}>
                    <section className={clsx(style.dbProduct__list)}>
                      {
                        !product.length > 0 ? (
                          <section className={style.dbProduct__list__productEmpty}>
                            <img src={images.dashboard.main.product.productEmpty} alt="empty" />
                          </section>
                        ) :
                          (
                            <table>
                              <thead>
                                <tr>
                                  <th>STT</th>
                                  <th style={{ textAlign: 'center' }}>Tên sản phẩm</th>
                                  <th>Loại</th>
                                  <th>Hãng</th>
                                  <th>Giá</th>
                                  <th>Giảm giá</th>
                                  <th>Số lượng</th>
                                  <th style={{ textAlign: 'center' }}>Trạng thái</th>
                                  <th style={{ textAlign: 'center' }}>Công khai</th>
                                  <th className={clsx(style.edit)}>Hiệu chỉnh</th>
                                </tr>
                              </thead>
                              <tbody>
                                {
                                  product.map((item, index) => {
                                    return (
                                      <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>
                                          <section className={clsx(style.nameProduct)}>
                                            <img src={`data:image/png;base64,${item.img}`} alt="img" />
                                            <p>{item.name}</p>
                                          </section>
                                        </td>
                                        <td style={{ textTransform: 'capitalize' }}>{item.type}</td>
                                        <td style={{ textTransform: 'capitalize' }}>{item.brand}</td>
                                        <td>{`${Number(item.price).toLocaleString()}đ`}</td>
                                        <td>{`${item.discount}%`}</td>
                                        <td>{item.quantity}</td>
                                        {
                                          item.quantity > 0 ? (<td className={clsx(style.selling)}><span>Còn hàng</span></td>) :
                                            (<td className={clsx(style.soldOut)}><span>Hết hàng</span></td>)
                                        }
                                        {
                                          item.publish > 0 ?
                                            <td style={{ textAlign: 'center' }}>
                                              <Switch
                                                defaultChecked onChange={() => { onChange(item._id) }}
                                                size="small"
                                              />
                                            </td>
                                            :
                                            (
                                              <td style={{ textAlign: 'center' }}>
                                                <Switch
                                                  onChange={() => { onChange(item._id) }}
                                                  size="small"
                                                />
                                              </td>
                                            )
                                        }
                                        <td>
                                          <section className={clsx(style.editProduct)}>
                                            <Link to={`/dashboard/product/${item._id}`}>
                                              <FaSearchPlus className={clsx(style.icon)} />
                                            </Link>
                                            <AiFillEdit className={clsx(style.icon)} onClick={() => handleClickEdit(item)} />
                                            <AiFillDelete className={clsx(style.icon)} onClick={() => showModal(item._id)} />
                                          </section>
                                        </td>
                                      </tr>
                                    )
                                  })
                                }
                                <tr>
                                </tr>
                              </tbody>
                            </table>
                          )
                      }

                    </section>
                  </Col>
                  <Col xl={24}>
                    <Pagination
                      pagination={pagination}
                      onPageChange={handlePageChange}
                      checkShow ={showPagination}
                    />
                  </Col>
                </Row>
              </section>
              <Drawer
                // title="Basic Drawer" 
                placement="right"
                width={650}
                onClose={onClose}
                closable={false}
                open={open}
                bodyStyle={{
                  padding: 0,
                  margin: 0
                }}
              >
                <ProductForm
                  onClose={onClose}
                  isEdit={isEdit}
                  setIsEdit={setIsEdit}
                  productEdit={productEdit}
                  setProductEdit={setProductEdit}
                  brandProductEdit={brandProductEdit}
                  setBrandProductEdit={setBrandProductEdit}
                  productField={productField}
                  setProductField={setProductField}
                  labelField={labelField}
                  setLabelField={setLabelField}
                  getApi={getApi}
                />
              </Drawer>
              <section className="dbProduct__questionDelete">
                <Modal
                  title="Xóa sản phẩm"
                  open={isModalOpen}
                  onOk={handleOk}
                  onCancel={handleCancel}
                  cancelText="Trở lại"
                  okText="Xóa"
                  centered={true}
                  closeIcon={<RiDeleteBack2Fill />}

                >
                  <p>Bạn có thật sự muốn xóa sản phẩm này ?</p>
                  <p>Bạn sẽ không thể xem lại sản phẩm này nữa nếu bạn xóa !</p>
                </Modal>
              </section>
            </>
          )
      }
    </main>
  )
}

export default Product;