// React
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// Antd
import { Dropdown, Modal } from 'antd';

// Local
import images from 'assets/images/index';
import style from './header.module.scss';
import toastNotification from 'handler/toast.handler';
import 'scss/_globalstyle.scss';

// Icon
import { AiOutlineSearch, AiFillHome, AiFillInfoCircle, AiFillDollarCircle, AiFillContacts } from 'react-icons/ai'
import { BiCategory } from 'react-icons/bi';
import { RiUserAddFill, RiLogoutCircleLine, RiDeleteBack2Fill } from 'react-icons/ri';
import { BsCartFill, BsFillBellFill, BsNewspaper } from 'react-icons/bs';
import { FaUserEdit } from 'react-icons/fa';

// Api
import userApi from 'api/modules/user.api';
import cartApi from 'api/modules/cart.api';
import productAppApi from 'api/modules/productApp.api';

const path = [
    { icon: AiFillHome, component: 'Trang chủ', path: '/' },
    { icon: AiFillInfoCircle, component: 'Giới thiệu', path: '/introduce' },
    { icon: AiFillDollarCircle, component: 'Khuyến mãi', path: '/discount' },
    { icon: RiUserAddFill, component: 'Tuyển dụng', path: '/recruit' },
    { icon: AiFillContacts, component: 'Liên hệ', path: '/contact' },
];

const Header = ({ call }) => {
    const [userName, setUserName] = useState(JSON.parse(localStorage.getItem("userName")));
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [user, setUser] = useState({});
    const [cart, setCart] = useState({});
    const [product, setProduct] = useState([]);
    const [showProduct, setShowProduct] = useState(false);
    const [products, setProducts] = useState([]);
    const [productTemp, setProductTemp] = useState([]);
    const [searchText, setSearchText] = useState('');
    const checkUpdateAccount = JSON.parse(localStorage.getItem("updateAccount"));
    let navi = useNavigate();
    const getCartApi = async () => {
        if (JSON.parse(localStorage.getItem("idUser")) !== null) {
            try {
                const response = await cartApi.searchIdUser({
                    idUser: JSON.parse(localStorage.getItem("idUser")),
                });
                setCart(response.cart);
                setProduct(response.cart.product);
            }
            catch (err) {
                console.log(err);
            }
        }
    }
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
            setProduct([]);
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
                    style={{ display: 'flex', alignItems: 'center', fontSize: 18, }}
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
                    style={{ display: 'flex', alignItems: 'center', fontSize: 18, }}
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
                    style={{ display: 'flex', alignItems: 'center', fontSize: 18, }}
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
                    style={{ display: 'flex', alignItems: 'center', fontSize: 18, }}
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
                    style={{ display: 'flex', alignItems: 'center', fontSize: 18, }}
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
        if (JSON.parse(localStorage.getItem("idUser")) !== null) {
            try {
                const response = await userApi.getOne(JSON.parse(localStorage.getItem("idUser")));
                setUser(response);
                setUserName(response.username);
            }
            catch (err) {
                console.log(err);
            }
        }
    }
    const getProductApi = async () => {
        try {
            const response = await productAppApi.getProducts();
            setProducts(response.product);
            setProductTemp(response.product);
        }
        catch (err) {
            console.log(err);
        }
    }
    const handleShow = () => {
        setShowProduct(true);
    }
    const handleHide = () => {
        setShowProduct(false);
    }
    const handleChangeSearchText = (e) => {
        const productName = [];
        productTemp.forEach((item, index) => {
            productName.push(item.name.toLowerCase());
        });
        const searchResult = productTemp.filter((index) => {
            return productName[index].includes(e.target.value);
        })
        setProducts(searchResult);
        setSearchText(e.target.value);
    }
    const handleChangePath = () => {
        setShowProduct(false);
    }
    useEffect(() => {
        getUserApi();
        getCartApi();
        getProductApi();
    }, [checkUpdateAccount, call]);
    return (
        <div className={clsx(style.main)}>
            <header className={clsx(style.header)}>
                <nav className={clsx(style.navHeader)}>
                    <Link to="/" className={clsx(style.navLogo)}>
                        <img src={images.header.logo} alt="logo" />
                    </Link>
                    <section
                        className={clsx(style.navSearch)}
                        onMouseOver={handleShow}
                        onMouseOut={handleHide}
                    >
                        <input
                            type="text"
                            placeholder='Nhập sản phẩm cần tìm . .  .'
                            value={searchText}
                            onChange={handleChangeSearchText}
                        />
                        {
                            showProduct && (
                                <div>
                                    <ul>
                                        {
                                            products.length === 0
                                                ?
                                                <li className={clsx(style.emptyProduct)}>
                                                    <div className={clsx(style.svg)}></div>
                                                    <h1>Không có sản phẩm tương ứng !</h1>
                                                </li>
                                                :
                                                products.map((item, index) => {
                                                    return (
                                                        <li
                                                            key={index}
                                                            onClick={handleChangePath}
                                                        >
                                                            <a href={`/product/detail/${item._id}`}>
                                                                {
                                                                    item?.img
                                                                        ?
                                                                        <img src={`data:image/png;base64,${item.img}`} alt="img" />
                                                                        :
                                                                        <></>
                                                                }
                                                                <p>{item.name}</p>
                                                            </a>
                                                        </li>
                                                    )
                                                })
                                        }
                                    </ul>
                                </div>
                            )
                        }
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
                                                        <img src={images.header.user} alt="img" />
                                                        :
                                                        <img src={`data:image/png;base64,${user.img}`} alt="img" />
                                                    }
                                                </div>
                                                <div className={clsx(style.signSystem__body)}>
                                                    <p>Xin chào</p>
                                                    <p>{userName}</p>
                                                </div>
                                            </section>
                                        </Dropdown>
                                        <section className={clsx(style.logoutQuestion)}>
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
                                <p>{`(${(product.length === 0) ? 0 : product.length}) Sản phẩm`}</p>
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