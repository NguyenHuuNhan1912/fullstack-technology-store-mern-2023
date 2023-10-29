// React
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Antd
import { Dropdown, Modal, Button, Select } from 'antd';

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


// Translate
import { useTranslation } from 'react-i18next';
import i18n from 'assets/i18n/i18n';

// Authentication with google and facebook
import { auth } from '../../firebase/config';
import { signOut } from 'firebase/auth'



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
    const { t } = useTranslation(['auth', 'lng', 'layout', 'common']);
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
    const path = [
        { icon: AiFillHome, component: t('layout.main.home',{ns: 'layout'}), path: '/' },
        { icon: AiFillInfoCircle, component: t('layout.main.introduce',{ns: 'layout'}), path: '/introduce' },
        { icon: AiFillDollarCircle, component: t('layout.main.discount',{ns: 'layout'}), path: '/discount' },
        { icon: RiUserAddFill, component: t('layout.main.recruit',{ns: 'layout'}), path: '/recruit' },
        { icon: AiFillContacts, component: t('layout.main.contact',{ns: 'layout'}), path: '/contact' },
    ];
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
        localStorage.removeItem("userName");
        localStorage.removeItem("idUser");
        setUserName(JSON.parse(localStorage.getItem("userName")));
        setTimeout(() => {
            handleLogoutWith();
            setProduct([]);
            navi('/');
        }, 1000);
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
                    <span style={{ marginLeft: 8 }}>{t('layout.main.account.account_information',{ns: 'layout'})}</span>
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
                    <span style={{ marginLeft: 8 }}>{t('layout.main.account.manager_order',{ns: 'layout'})}</span>
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
                    <span style={{ marginLeft: 8 }}>{t('layout.main.account.notification',{ns: 'layout'})}</span>
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
                    <span style={{ marginLeft: 8 }}>{t('layout.main.account.feed',{ns: 'layout'})}</span>
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
                    <span style={{ marginLeft: 8 }}>{t('auth.sign_out')}</span>
                </section>
            ),
        },
    ];
    const handleChange = (value) => {
        console.log(value);
        i18n.changeLanguage(value);
    };

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
        const searchResult = productTemp.filter((item, index) => {
            return productName[index].includes(e.target.value.toLowerCase());
        })
        setProducts(searchResult);
        setSearchText(e.target.value);
    }
    const handleChangePath = () => {
        setShowProduct(false);
    }

    const handleLogoutWith = async (type) => {
        try {
            const logout = await signOut(auth);
            toastNotification('success', 'Tài khoản của bạn đã được đăng xuất !', 1000);
        }
        catch (err) {
            console.log(`Error: ${err}`);
        }
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
                            placeholder={t('common.search_product',{ns: 'common'})}
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
                                                            {
                                                                item.publish !== '1' ?
                                                                    <></>
                                                                    :
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
                                                            }
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
                                            <p>{t('auth.sign_in')}</p>
                                            <p>{t('auth.sign_out')}</p>
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
                                                    <p>{t('common.hello',{ns: 'common'})}</p>
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
                                <p>{t('common.cart',{ns: 'common'})}</p>
                                <p>{`(${(product.length === 0) ? 0 : product.length}) ${t('common.product',{ns: 'common'})}`}</p>
                            </div>
                        </Link>
                        <div>
                            <Select
                                defaultValue="vi"
                                style={{
                                    marginLeft: 20,
                                }}
                                onChange={handleChange}
                                options={[
                                    {
                                        value: "vi",
                                        label: (
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <img style={{ width: '30px', marginRight: '5px' }} src={images.nationalFlag.vi} />
                                                <p>VIE</p>
                                            </div>
                                        ),
                                    },
                                    {
                                        value: "en",
                                        label: (
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <img style={{ width: '30px', marginRight: '5px' }} src={images.nationalFlag.en} />
                                                <p>ENG</p>
                                            </div>
                                        ),
                                    },
                                ]}
                            />
                        </div>
                    </section>
                </nav>
                <nav className={clsx(style.navHeaderPage)}>
                    <section className={clsx(style.navHeaderPage__category)}>
                        <BiCategory className={clsx(style.icon)} />
                        <h1>{t('common.product_portfolio',{ns: 'common'})}</h1>
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