import { clsx } from 'clsx';
import style from './customers.module.scss';
import { Row, Col } from 'antd';
import { Modal, Switch } from 'antd';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import userApi from 'api/modules/user.api';
import { Bars } from 'react-loader-spinner';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };
  const getApiCustomers = async () => {
    setLoading(true);
    try {
      const response = await userApi.getAll();
      setCustomers(response.user);
    }
    catch (err) {
      console.log(err);
    }
    setLoading(false);
  }
  useEffect(() => {
    getApiCustomers();
  }, []);
  console.log(customers);
  return (
    <main className={clsx(style.main)}>
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
            <section className={clsx(style.customer)}>
              <section className={clsx(style.customer__filters)}>
                <section className={clsx(style.formGroup)}>
                  <input
                    type="text"
                    name="name"
                    placeholder='Nhập tên khách hàng để tìm kiếm...'
                    autoComplete='off'
                  />
                </section>
                <section className={clsx(style.customer__list)}>
                  <table>
                    <thead>
                      <tr>
                        <th>STT</th>
                        <th>Tên khách hàng</th>
                        <th>Số điện thoại</th>
                        <th>Ngày đăng kí</th>
                        <th style={{ textAlign: 'center' }}>Trạng thái</th>
                        <th style={{ textAlign: 'center' }}>Hiệu chỉnh</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        customers.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{item.username}</td>
                              <td>{item.numberPhone}</td>
                              <td>{item.createdAt}</td>
                              <td style={{ textAlign: 'center' }}>
                                <Switch
                                  defaultChecked onChange={onChange}
                                  size="small"
                                />
                              </td>
                              <td>
                                <section className={clsx(style.editProduct)}>
                                  <AiFillEdit className={clsx(style.icon)} />
                                  <AiFillDelete className={clsx(style.icon)} />
                                </section>
                              </td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                </section>
              </section>
            </section>
          )
      }
    </main>
  )
}

export default Customers;