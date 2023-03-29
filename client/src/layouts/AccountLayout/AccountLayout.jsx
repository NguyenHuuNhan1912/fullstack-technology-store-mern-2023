import Header from 'component/header/Header';
import Footer from 'component/footer/Footer';
import { Outlet } from 'react-router-dom';
import { clsx } from 'clsx';
import style from './accountLayout.module.scss';
import { BsCartFill, BsFillBellFill, BsNewspaper } from 'react-icons/bs';
import { FaUserAlt } from 'react-icons/fa';
import { Row, Col } from 'antd';
import { useEffect, useState, createContext } from 'react';
import userApi from 'api/modules/user.api';
import images from 'assets/images';
import { Link } from 'react-router-dom';

const dataNav = [
    { icon: FaUserAlt, title: 'Thông tin tài khoản', path: '/account', type: 'account' },
    { icon: BsCartFill, title: 'Quản lý đơn hàng', path: '/account/order', type: 'order' },
    { icon: BsFillBellFill, title: 'Thông báo', path: '/account/noti', type: 'noti' },
    { icon: BsNewspaper, title: 'Bảng tin', path: '/account/news', type: 'news' },
]
export const UpdateAccount = createContext();
const AccountLayout = () => {
    const [user, setUser] = useState({});
    const [type, setType] = useState(window.location.pathname.slice(window.location.pathname.lastIndexOf('/') + 1, window.location.pathname.length));
    console.log(type);
    const getUserApi = async () => {
        try {
            const response = await userApi.getOne(JSON.parse(localStorage.getItem("idUser")));
            setUser(response);
        }
        catch (err) {
            console.log(err);
        }

    }
    useEffect(() => {
        getUserApi();
    }, []);
    return (
        <UpdateAccount.Provider value={getUserApi}>
            <div className={clsx(style.accountLayout)}>
                <Header

                />
                <main className={clsx(style.main)}>
                    <Row gutter={[{ xl: 30 }, { xl: 30 }]}>
                        <Col xl={6}>
                            <section className={clsx(style.navInfo)}>
                                <ul className={clsx(style.navList)}>
                                    <li className={clsx(style.navItem)}>
                                        <section className={clsx(style.infor)}>
                                            <section className={clsx(style.infor__head)}>
                                                {
                                                    !user?.img
                                                        ?
                                                        (
                                                            <img src={images.header.user} alt="img" />
                                                        )
                                                        :
                                                        (
                                                            <img src={`data:image/png;base64,${user?.img}`} alt="img" />
                                                        )
                                                }
                                            </section>
                                            <section className={clsx(style.infor__body)}>
                                                <p>Tài khoản của</p>
                                                <h1>{user.username}</h1>
                                            </section>
                                        </section>
                                    </li>
                                    {
                                        dataNav.map((item, index) => {
                                            return (
                                                <li className={clsx(style.navItem)} key={index}>
                                                    <Link
                                                        to={item.path}
                                                        style=
                                                        {
                                                            type === item.type
                                                                ?
                                                                { backgroundColor: `#049c62`, color: 'white' }
                                                                :
                                                                {}
                                                        }
                                                        onClick={() => setType(item.type)}
                                                    >
                                                        <item.icon className={clsx(style.icon)} />
                                                        <span>{item.title}</span>
                                                    </Link>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </section>
                        </Col>
                        <Col xl={18}>
                            <Outlet />
                        </Col>
                    </Row>
                </main>
                <Footer />
            </div>
        </UpdateAccount.Provider>
    )
}
export default AccountLayout;