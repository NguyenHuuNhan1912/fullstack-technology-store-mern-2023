import { clsx } from 'clsx';
import style from './customers.module.scss';
import { Row, Col } from 'antd';
import { Modal, Switch } from 'antd';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import images from 'assets/images';
import { useEffect, useState } from 'react';
import userApi from 'api/modules/user.api';
import { Bars } from 'react-loader-spinner';
import {FaSearch} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useFetchApi from 'hooks/useFectchApi';
const Customers = () => {
  const {loading, data} = useFetchApi(userApi);
  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };
  const handleString = (str) => {
      const newStr = str.slice(0, str.indexOf("T"));
      return newStr;
  }
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
                        <th>Ảnh</th>
                        <th>Tên</th>
                        <th>Số điện thoại</th>
                        <th>Email</th>
                        <th>Giới tính</th>
                        <th>Ngày tham gia</th>
                        <th>Trạng thái</th>
                        <th>Hiệu chỉnh</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        data.user.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>
                                {
                                  item?.img 
                                  ? 
                                  <img src={`data:image/png;base64,${item.img}`} alt="img" />
                                  :
                                  <img src={images.header.user} alt="img" />
                                }
                              </td>
                              <td>{item.username}</td>
                              <td>{item.numberPhone}</td>
                              <td>{item.email}</td>
                              <td style={{textTransform: 'capitalize', textAlign: 'center'}}>{item.sex}</td>
                              <td>{`${handleString(item.createdAt)}`}</td>
                              <td>
                                <Switch
                                  defaultChecked onChange={onChange}
                                  size="small"
                                />
                              </td>
                              <td>
                                <section className={clsx(style.actionCustomer)}>
                                  <Link to={`customer-order/${item._id}`}>
                                      <FaSearch className={clsx(style.icon)} /> 
                                  </Link>
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