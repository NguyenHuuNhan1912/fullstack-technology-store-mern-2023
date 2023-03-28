import { clsx } from 'clsx';
import style from './category.module.scss';
import { Row, Col } from 'antd';
import { RiDeleteBack2Fill } from 'react-icons/ri';
import { AiFillPlusCircle, AiFillEdit, AiFillDelete } from 'react-icons/ai';
import categoryApi from "api/modules/category.api";
import { useState, useEffect, useRef } from 'react';
import images from 'assets/images/index'
import CategoryForm from 'component/categoryForm/CategoryForm';
import { Drawer } from 'antd';
import { Bars } from 'react-loader-spinner';
import { Modal, Switch } from 'antd';
import toastNotification from 'handler/toast.handler';
const Category = () => {
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState([]);
  const [cateEdit, setCateEdit] = useState();
  const [cateField, setCateField] = useState([]);
  const [cateBrand, setCateBrand] = useState([]);
  const [id, setId] = useState('');
  const [show, setShow] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };
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
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };
  const getApi = async () => {
    setLoading(true);
    try {
      const response = await categoryApi.getAll();
      setCategory(response.category);
    }
    catch (err) {
      console.log(err);
    }
    setLoading(false);
  }
  useEffect(() => {
    getApi();
  }, []);
  // console.log(category);
  const handleClickEdit = (item) => {
    setOpen(true);
    setIsEdit(true);
    setCateEdit(item);
    setCateField(item.field);
    setCateBrand(item.brand);
  }
  const handleClickAdd = () => {
    setOpen(true);
    if (cateEdit) {
      setCateEdit(undefined);
      setCateField([]);
      setCateBrand([]);
    }
  }
  const handleDelete = async (id) => {
    try {
      await categoryApi.delete(id);
      getApi();
      setTimeout(() => {
        toastNotification('success', 'Xóa danh mục thành công !', 1000);
      }, 800);
    }
    catch (err) {
      console.log(err);
    }
  }
  // console.log(category);

  return (

    <main className={clsx(style.dbCategoryWrapper)}>
      {
        loading ?
          (
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
            <>
              <section className={clsx(style.dbCategory)}>
                <section className={clsx(style.dbCategory__upload)}>
                  <Row gutter={[20, 20]}>
                    <Col xl={8}>
                      <section className={clsx(style.formGroup)}>
                        <input
                          type="text"
                          name="name"
                          placeholder='Lọc theo tên'
                        />
                      </section>
                    </Col>
                    <Col xl={8}>
                      <section className={clsx(style.formGroup)}>
                        <input
                          type="text"
                          name="brand"
                          placeholder='Lọc theo hãng'
                        />
                      </section>
                    </Col>
                    <Col xl={8}>
                      <div className={clsx(style.formGroup)}>
                        <section className={clsx(style.addCategory)}>
                          <button className={clsx(style.btn, style.btnAdd)} onClick={handleClickAdd}>
                            <AiFillPlusCircle className={clsx(style.icon)} />
                            <span>Thêm danh mục</span>
                          </button>
                        </section>
                      </div>
                    </Col>
                  </Row>
                </section>
                {
                  !category.length > 0 ?
                    (
                      <section className={style.dbCategory__categoryEmpty}>
                        <img src={images.categoryEmpty} alt="empty" />
                      </section>
                    )
                    :
                    (
                      <section className={clsx(style.dbCategory__list)}>
                        <table>
                          <thead>
                            <tr>
                              <th>STT</th>
                              <th>Hình ảnh</th>
                              <th>Tên</th>
                              <th>Hãng</th>
                              <th>Thông tin</th>
                              <th>Trạng thái</th>
                              <th className={clsx(style.edit)}>Hiệu chỉnh</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              category.map((item, index) => {
                                return (
                                  <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>
                                      <img src={`data:image/png;base64,${item.img}`} alt="img" />
                                    </td>
                                    <td>{item.name}</td>
                                    <td >
                                      <ul>
                                        {
                                          item.brand.map((item, index) => {
                                            return (
                                              <li key={index}>{item}</li>
                                            )
                                          })
                                        }
                                      </ul>
                                    </td>
                                    <td>
                                      <ul>
                                        {
                                          item.field.map((item, index) => {
                                            return (
                                              <li key={index}>{item}</li>
                                            )
                                          })
                                        }
                                      </ul>
                                    </td>
                                    <td style={{textAlign: 'center'}}>
                                      <Switch 
                                        defaultChecked onChange={onChange} 
                                        size="small"
                                      />
                                    </td>
                                    <td>
                                      <section className={clsx(style.editProduct)}>
                                        <AiFillEdit className={clsx(style.icon)} onClick={() => handleClickEdit(item)} />
                                        {/* <AiFillDelete className={clsx(style.icon)} onClick={() => handleDelete(item._id)} /> */}
                                        <AiFillDelete className={clsx(style.icon)} onClick={() => showModal(item._id)} />
                                      </section>
                                    </td>
                                  </tr>
                                )
                              })
                            }
                          </tbody>
                        </table>
                      </section>
                    )
                }

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
                <CategoryForm
                  cateEdit={cateEdit}
                  setCateEdit={setCateEdit}
                  cateBrand={cateBrand}
                  cateField={cateField}
                  setCateBrand={setCateBrand}
                  setCateField={setCateField}
                  isEdit={isEdit}
                  setIsEdit={setIsEdit}
                  getApi={getApi}
                  onClose={onClose}
                />
              </Drawer>
              <section className="dbCategory__questionDelete">
                <Modal
                  title="Xóa danh mục"
                  open={isModalOpen}
                  onOk={handleOk}
                  onCancel={handleCancel}
                  cancelText="Trở lại"
                  okText="Xóa"
                  centered={true}
                  closeIcon={<RiDeleteBack2Fill />}
                >
                  <p>Bạn có thật sự muốn xóa danh mục này ?</p>
                  <p>Bạn sẽ không thể xem lại danh mục này nữa nếu bạn xóa !</p>
                </Modal>
              </section>
            </>
          )
      }
    </main>
  )
}

export default Category;