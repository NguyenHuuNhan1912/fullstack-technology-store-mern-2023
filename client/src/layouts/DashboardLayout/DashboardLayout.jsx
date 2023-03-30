import { Outlet } from "react-router-dom";
import { BsFillSunFill, BsFillBellFill } from 'react-icons/bs';
import { Badge } from 'antd';
import clsx from 'clsx';
import { Link } from "react-router-dom";
import { MdSpaceDashboard } from 'react-icons/md';
import { BsFillCartFill } from 'react-icons/bs';
import { BiCategoryAlt } from 'react-icons/bi';
import { FaUserFriends } from 'react-icons/fa';
import { IoIosTime } from 'react-icons/io';
import { BiLogOutCircle } from 'react-icons/bi';
import style from 'layouts/DashboardLayout/dashboardLayout.module.scss';
import images from 'assets/images/index';
import toastNotification from "handler/toast.handler";
import { Row, Col } from 'antd';
import { useState } from "react";
import { useEffect } from "react";

const data = [
    { 'icon': MdSpaceDashboard, des: 'Tổng quan', path: "/dashboard", title: 'dashboard' },
    { 'icon': BsFillCartFill, des: 'Sản phẩm', path: "/dashboard/product", title: 'product' },
    { 'icon': BiCategoryAlt, des: 'Danh mục', path: "/dashboard/category", title: 'category' },
    { 'icon': FaUserFriends, des: 'Khách hàng', path: "/dashboard/customers", title: 'customers' },
    { 'icon': IoIosTime, des: 'Đặt hàng', path: "/dashboard/orders", title: 'orders' },
];
const DashBoardLayout = () => {
    const [type, setType] = useState(window.location.pathname.slice(window.location.pathname.lastIndexOf('/')+1, window.location.pathname.length));
    const [admin, setAdmin] = useState(JSON.parse(localStorage.getItem("admin")));
    const handleLogout = (e) => {
        console.log('log out');
        localStorage.removeItem("admin");
        toastNotification('success', 'Đăng xuất thành công !', 1000);
    }
    const checkAdmin = () => {
        if(admin !== null && admin===true) {
            toastNotification('success', 'Đăng nhập thành công !', 1000);
        }
        else {
            toastNotification('error', 'Đăng nhập thất bại!', 1000);
        }
    }
    useEffect(() => {
        checkAdmin();
    },[]);
    return (
        <>
            {
                admin===true ?
                (
                    <main className={clsx(style.dashBoard)}>
                        <Row>
                            <Col xl={5}>
                                <aside className={clsx(style.aside)}>
                                    <section className={clsx(style.aside__head)}>
                                        <img src={images.dashboard.aside.dashBoard} alt="alt" />
                                        <span>Quản trị</span>
                                    </section>
                                    <section className={clsx(style.aside__body)}>
                                        <ul className={clsx(style.navList)}>
                                            {
                                                data.map((item, index) => {
                                                    return (
                                                        <li key={index} className={clsx(style.navItem)}>
                                                            <Link 
                                                                title={item.title}
                                                                to={item.path} 
                                                                style=
                                                                    {
                                                                        type===item.title 
                                                                        ? 
                                                                        {backgroundColor: `#14e765`, border: '1px solid #14e765', boxShadow: "0 0 5px #14e765, 0 0 10px #14e765",}
                                                                        : 
                                                                        {}
                                                                    }
                                                                onClick={() => setType(item.title)}
                                                            >
                                                                <item.icon className={clsx(style.icon)} />
                                                                <span>{item.des}</span>
                                                            </Link>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </section>
                                    <section className={clsx(style.aside__logout)}>
                                        <Link to="/" onClick={handleLogout}>
                                            <BiLogOutCircle className={clsx(style.icon)}/>
                                            <span>Đăng xuất</span>
                                        </Link>
                                    </section>
                                </aside>
                            </Col>
                            <Col xl={19} className={clsx(style.mainHeaderOutlet)}>
                                <header className={clsx(style.header)}>
                                    <nav className={clsx(style.navHeader)}>
                                        <section className={clsx(style.theme)}>
                                            <BsFillSunFill className={clsx(style.icon)} />
                                            {/* <BsFillMoonFill className={clsx(style.icon)} /> */}
                                        </section>
                                        <section className={clsx(style.noti)}>
                                            <section className={clsx(style.noti__head)}>
                                                <Badge count={19} size="small">
                                                    <BsFillBellFill className={clsx(style.icon)} />
                                                </Badge>
                                            </section>
                                            <section className={clsx(style.noti__body)}></section>
                                        </section>
                                        <section className={clsx(style.avatar)}>
                                            <section className={clsx(style.avatar__head)}>
                                                <img src={images.dashboard.header.avatar} alt="alt" />
                                            </section>
                                            <section className={clsx(style.avatar__body)}></section>
                                        </section>
                                    </nav>
                                </header>
                                <Outlet />  
                            </Col>
                        </Row>
                    </main>
                )
                : 
                (
                    <section className={clsx(style.checkAdmin)}>
                        
                        <section className={clsx(style.checkAdmin__head)}>
                            <img src={images.dashboard.admin.admin} alt="" />
                        </section>
                        <section className={clsx(style.checkAdmin__body)}>
                            <h1>Bạn chưa có quyền truy cập vào tài khoản quản trị</h1>
                            <Link to="/signin">
                                <button>Đăng nhập</button>
                            </Link>
                        </section>
                    </section>
                )
            }
        </>
    )
}
export default DashBoardLayout;