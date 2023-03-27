// Framework
import { useFormik } from "formik";

import { FaUserAlt, FaLock, FaFacebook, FaGoogle } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import clsx from 'clsx';
import * as Yup from 'yup';
import { Row, Col } from 'antd';
import { Link } from "react-router-dom";
// Local
// import images from '../assets/images/index';
import images from "assets/images";
import style from './signin.module.scss';
import SelectSpeed from "component/selectSpeed/SelectSpeed";
import userApi from "api/modules/user.api";
import { toast } from 'react-toastify';
import toastNotification from "handler/toast.handler";
const Signin = () => {
    let navi = useNavigate();
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: Yup.object({
            username: Yup.string().required("Tên tài khoản không được để trống"),
            password: Yup.string().required("Mật khẩu không thể để trống"),
        }),
        onSubmit: async (values, { resetForm }) => {
            console.log(values);
            try {
                const response = await userApi.signIn({ username: values.username, password: values.password });
                localStorage.setItem("userName", JSON.stringify(response.username));
                localStorage.setItem("idUser", JSON.stringify(response._id));
                localStorage.setItem("admin", JSON.stringify(response.admin));
                if (response.admin === true) {
                    toastNotification('success', 'Đăng nhập vào tài tài khoản quản trị thành công !', 1500);
                    setTimeout(() => {
                        resetForm();
                        window.location.replace("http://localhost:3000/dashboard");
                    }, 1500);
                }
                else {
                    toastNotification('success', 'Đăng nhập thành công, trở về trang chủ để mua sản phẩm nhé !', 1500);
                    setTimeout(() => {
                        resetForm();
                        window.location.replace("http://localhost:3000");
                    }, 1500);
                }
            }
            catch (err) {
                if (err === "notUsername") {
                    toastNotification('error', 'Đăng nhập thất bại sai tên tài khoản hãy thử lại !', 1500);
                }
                else {
                    toastNotification('error', 'Đăng nhập thất bại, sai mật khẩu, hãy thử lại !', 1500);
                }
                console.log(err);
            }
        }
    });
    return (
        <section className={clsx(style.signin)}>
            <SelectSpeed />
            <Row gutter={[{ lg: 60, md: 40, xs: 0 }, { lg: 60, md: 40, xs: 0 }]} className={clsx(style.row)}>
                <Col xl={15} lg={12} xs={0}>
                    <section className={clsx(style.signin__introduce)}>
                        <img src={images.signin.login} alt="logo" />
                    </section>
                </Col>
                <Col xl={9} lg={12} xs={24}>
                    <form action="#" className={clsx(style.signin__formSignin)} onSubmit={formik.handleSubmit}>
                        <section className={clsx(style.formTitle)}>
                            <h1>Đăng nhập</h1>
                        </section>
                        <section className={clsx(style.formGroup, style.formGroupUsername)} >
                            <input
                                type="text"
                                name="username"
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                placeholder="Tên tài khoản"
                            />
                            <FaUserAlt className={clsx(style.icon)} />
                            {formik.errors.username && (<p className={clsx(style.errorMessage)}>{formik.errors.username}</p>)}
                        </section>
                        <section className={clsx(style.formGroup)} >
                            <input
                                type="password"
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                placeholder="Mật khẩu"
                            />
                            <FaLock className={clsx(style.icon)} />
                            {formik.errors.password && (<p className={clsx(style.errorMessage)}>{formik.errors.password}</p>)}
                        </section>
                        <section className={clsx(style.formGroup)}>
                            <input
                                type="submit"
                                name="inputSubmit"
                                value="Đăng nhập"
                                className={clsx(style.submit)}
                            />
                        </section>
                        <section className={clsx(style.signup)}>
                            <Link to="/signup">
                                Bạn chưa có tài khoản ?
                            </Link>
                            <a href="#">Quên mật khẩu ?</a>
                        </section>
                        <section className={clsx(style.signinWith)}>
                            <div className={clsx(style.signinWith__title)}>
                                <h1>Hoặc đăng nhập với</h1>
                            </div>
                            <div className={clsx(style.signinWith__wrapper)}>
                                <div className={clsx(style.facebook)}>
                                    <FaFacebook className={clsx(style.icon)} />
                                    <span>facebook</span>
                                </div>
                                <div className={clsx(style.google)}>
                                    <FaGoogle className={clsx(style.icon)} />
                                    <span>google</span>
                                </div>
                            </div>
                        </section>
                    </form>
                </Col>
            </Row>
        </section>
    )
}

export default Signin;