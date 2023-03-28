import clsx from 'clsx';
// import {SearchOutlined} from '@ant-design/icons';
import { AiOutlineSearch, AiFillHome, AiFillInfoCircle, AiFillDollarCircle, AiFillContacts } from 'react-icons/ai'
import { BiCategory } from 'react-icons/bi';
import { RiUserAddFill, RiLogoutCircleLine, RiDeleteBack2Fill } from 'react-icons/ri';
import { BsCartFill, BsFillBellFill, BsNewspaper } from 'react-icons/bs';

// import { useRef, useState } from 'react';
import { Dropdown, Modal } from 'antd';
import { FaUserEdit } from 'react-icons/fa';
import images from 'assets/images/index';
import 'scss/_globalstyle.scss';
import style from './header.module.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import cartApi from 'api/modules/cart.api';
import { useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import toastNotification from 'handler/toast.handler';
import userApi from 'api/modules/user.api';


const path = [
    { icon: AiFillHome, component: 'Trang chủ', path: '/' },
    { icon: AiFillInfoCircle, component: 'Giới thiệu', path: '/introduce' },
    { icon: AiFillDollarCircle, component: 'Khuyến mãi', path: '/discount' },
    { icon: RiUserAddFill, component: 'Tuyển dụng', path: '/recruit' },
    { icon: AiFillContacts, component: 'Liên hệ', path: '/contact' },
];
const Header = () => {
    const [userName, setUserName] = useState(JSON.parse(localStorage.getItem("userName")));
    const [admin, setAdmin] = useState(JSON.parse(localStorage.getItem("admin")));
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [user, setUser] = useState({});
    
    let navi = useNavigate();
    const checkUpdateAccount = JSON.parse(localStorage.getItem("updateAccount"));
    console.log(checkUpdateAccount);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
        localStorage.removeItem("userName");
        localStorage.removeItem("idUser");
        setUserName(JSON.parse(localStorage.getItem("userName")));
        toastNotification('success', 'Tài khoản của bạn đã được đăng xuất !', 1000);
        setTimeout(() => {
            navi('/');
        }, 1000)
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const items = [
        {
            key: '1',
            label: (
                <Link

                    style={
                        { display: 'flex', alignItems: 'center', fontSize: 18, }
                    }
                    rel="noopener noreferrer"
                    href="https://www.antgroup.com"
                    to="/account"
                >
                    <FaUserEdit />
                    <span style={{ marginLeft: 8 }}>Thông tin tài khoản</span>
                </Link>
            ),
        },
        {
            key: '2',
            label: (
                <Link
                    style={
                        { display: 'flex', alignItems: 'center', fontSize: 18, }
                    }
                    rel="noopener noreferrer"
                    to="/account/order"
                >
                    <BsCartFill />
                    <span style={{ marginLeft: 8 }}>Quản lý đơn hàng</span>
                </Link>
            ),
        },
        {
            key: '3',
            label: (
                <Link
                    style={
                        { display: 'flex', alignItems: 'center', fontSize: 18, }
                    }
                    rel="noopener noreferrer"
                    to="/account/noti"
                >
                    <BsFillBellFill />
                    <span style={{ marginLeft: 8 }}>Thông báo</span>
                </Link>
            ),
        },
        {
            key: '4',
            label: (
                <Link
                    style={
                        { display: 'flex', alignItems: 'center', fontSize: 18, }
                    }
                    rel="noopener noreferrer"
                    to="/account/news"
                >
                    <BsNewspaper />
                    <span style={{ marginLeft: 8 }}>Bảng tin</span>
                </Link>
            ),
        },
        {
            key: '5',
            label: (
                <section
                    style={
                        { display: 'flex', alignItems: 'center', fontSize: 18, }
                    }
                    rel="noopener noreferrer"
                    href="https://www.luohanacademy.com"
                    onClick={showModal}
                >
                    <RiLogoutCircleLine />
                    <span style={{ marginLeft: 8 }}>Đăng xuất</span>
                </section>
            ),
        },
    ];
    const getUserApi = async () => {
        if(JSON.parse(localStorage.getItem("idUser")) !== null) {
            console.log('call component header !');
            try {
                const response = await userApi.getOne(JSON.parse(localStorage.getItem("idUser")));
                setUser(response);
            }
            catch (err) {
                console.log(err);
            }
        }
    }
    useEffect(() => {
        getUserApi();
    }, [checkUpdateAccount]);
    console.log('re-render');
    return (
        <div>
            <header className={clsx(style.header)}>
                <nav className={clsx(style.navHeader)}>
                    <Link to="/" className={clsx(style.navLogo)}>
                        <img src={images.header.logo} alt="logo" />
                    </Link>
                    <section className={clsx(style.navSearch)}>
                        <input
                            type="text"
                            placeholder='Nhập sản phẩm cần tìm . .  .'
                        />
                        <AiOutlineSearch className={clsx(style.icon)} />
                    </section>
                    <section className={clsx(style.navFunction)}>
                        {
                            (userName === null) ?
                                (
                                    <Link to="/signin" className={clsx(style.signSystem)}>
                                        <div className={clsx(style.signSystem__head)}>
                                            <img src={images.header.user} alt="alt" />
                                        </div>
                                        <div className={clsx(style.signSystem__body)}>
                                            <p>Đăng nhập</p>
                                            <p>Đăng kí</p>
                                        </div>
                                    </Link>
                                ) :
                                (
                                    <>
                                        <Dropdown
                                            menu={{ items, }}
                                            placement="bottom"
                                        >
                                            <section className={clsx(style.signSystem)}>
                                                <div className={clsx(style.signSystem__head)}>
                                                    {
                                                        !user?.img 
                                                        ?
                                                        (
                                                            <img src={images.header.user} alt="img" />
                                                        )
                                                        : 
                                                        (
                                                            <img src={`data:image/png;base64,${user.img}`} alt="img" />

                                                        )
                                                    }
                                                </div>
                                                <div className={clsx(style.signSystem__body)}>
                                                    <p>Xin chào</p>
                                                    <p>{userName}</p>
                                                </div>
                                            </section>
                                        </Dropdown>
                                        <section className="logoutQuestion">
                                            <Modal
                                                title="Đăng xuất"
                                                open={isModalOpen}
                                                onOk={handleOk}
                                                onCancel={handleCancel}
                                                cancelText="Trở lại"
                                                okText="Đăng xuất"
                                                centered={true}
                                                closeIcon={<RiDeleteBack2Fill />}
                                            >
                                                <p>Bạn có thật sự muốn đăng xuất ?</p>
                                            </Modal>
                                        </section>
                                    </>
                                )
                        }

                        <Link to="tel: 0342040063" className={clsx(style.hotline)}>
                            <div className={clsx(style.hotline__head)}>
                                <img src={images.header.hotline} alt={clsx(style.hotline)} />
                            </div>
                            <div className={clsx(style.hotline__body)}>
                                <p>Hotline</p>
                                <p>0342040063</p>
                            </div>
                        </Link>
                        <Link to="/cart" className={clsx(style.cart)}>
                            <div className={clsx(style.cart__head)}>
                                <img src={images.header.cart} alt="cart" />
                            </div>
                            <div className={clsx(style.cart__body)}>
                                <p>Giỏ hàng</p>
                                <p>{`(0) Sản phẩm`}</p>
                            </div>
                        </Link>
                    </section>
                </nav>
                <nav className={clsx(style.navHeaderPage)}>
                    <section className={clsx(style.navHeaderPage__category)}>
                        <BiCategory className={clsx(style.icon)} />
                        <h1>Danh mục sản phẩm</h1>
                    </section>
                    <section className={clsx(style.navHeaderPage__path)}>
                        <ul className={clsx(style.pathList)}>
                            {
                                path.map((item, index) => {
                                    return (
                                        <li className={clsx(style.pathItem)} key={index}>
                                            <Link to={item.path}>
                                                <item.icon className={clsx(style.icon)} />
                                                <span>{item.component}</span>
                                            </Link>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </section>
                </nav>
            </header>

        </div>

    )
}

export default Header;