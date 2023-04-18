// Library
import { clsx } from 'clsx';

// Local
import style from './customers.module.scss';
import images from 'assets/images';

// Antd
import { Switch } from 'antd';

// Icon
import { AiFillDelete } from 'react-icons/ai';
import { FaSearch } from 'react-icons/fa';

// React
import { Link } from 'react-router-dom';

// Api
import userApi from 'api/modules/user.api';

// Loading
import { Bars } from 'react-loader-spinner';

// Hooks
import useFetchApi from 'hooks/useFectchApi';
import { useState } from 'react';

const Customers = () => {
  let { loading, data, dataTempUser } = useFetchApi(userApi);
  const [searchText, setSearchText] = useState('');
  const handleSearchText = (e) => {
    const productName = [];
    dataTempUser.forEach((item) => {
      productName.push(item.username.toLowerCase());
    });
    const searchResult = dataTempUser.filter((item, index) => {
      return productName[index].includes(e.target.value.toLowerCase());
    })
    data.user = searchResult;
    setSearchText(e.target.value);
  }
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
                    value={searchText}
                    onChange={handleSearchText}
                  />
                </section>
                {
                  data.user.length === 0
                    ?
                    <section className={clsx(style.customer__customersEmpty)}>
                      <img src={images.dashboard.main.customers.emptyCustomer} alt="empty" />

                      <h1 style={{ color: 'white' }}>Không tìm thấy tên khách hàng tương ứng</h1>
                    </section>
                    :
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
                                  <td style={{ textTransform: 'capitalize', textAlign: 'center' }}>{item.sex}</td>
                                  <td>{`${handleString(item.createdAt)}`}</td>
                                  <td>
                                    <Switch
                                      defaultChecked
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
                }
              </section>
            </section>
          )
      }
    </main>
  )
}

export default Customers;