// Validate
import { useFormik } from "formik";
import * as Yup from 'yup';

// Icon
import { FaUserAlt, FaLock, FaFacebook, FaGoogle } from 'react-icons/fa';
import { BsFillTelephoneForwardFill } from 'react-icons/bs';
import { FiRotateCw } from 'react-icons/fi';
import { BiArrowBack } from 'react-icons/bi';

// Module
import toastNotification from "handler/toast.handler";

// React
import { Link } from "react-router-dom";

// Library
import clsx from 'clsx';

// Antd
import { Row, Col } from 'antd';

// Local
import images from "assets/images";
import style from './signup.module.scss';

// Component
import SelectSpeed from "component/selectSpeed/SelectSpeed";

// Api
import userApi from "api/modules/user.api";
import cartApi from "api/modules/cart.api";

// React
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Signup = () => {
    const [users, setUsers] = useState('');
    let navi = useNavigate();
    const postApi = async (values) => {
        try {
            const response = await userApi.create(values);
            createCart(response);
        }
        catch (err) {
            console.log(err);
        }
    }
    const createCart = async (userId) => {
        try {
            const response = await cartApi.create({
                user: userId,
                product: [],
            })
        }
        catch (err) {
            console.log(err);
        }
    }
    const formik = useFormik({
        initialValues: {
            username: '',
            numberPhone: '',
            email: '',
            password: '',
            passwordAgain: '',
        },
        validationSchema: Yup.object({
            username: Yup.string().required("Tên tài khoản không được để trống").min(4, "Tên phải ít nhất 5 kí tự"),
            numberPhone: Yup.string().required("Số điện thoại không được để trống").matches(/((09|03|07|08|05)+([0-9]{8})\b)/g, "Số điện thoại không đúng định dạng"),
            email: Yup.string().required("Email không thể để trống").matches(/[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/igm, "Email không đúng định dạng"),
            password: Yup.string().required("Mật khẩu không thể để trống").matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/g, "Mật khẩu không đủ mạnh"),
            passwordAgain: Yup.string().required("Mật khẩu không thể để trống").oneOf([Yup.ref("password"), null], "Mật khẩu nhập lại không khớp"),
        }),
        onSubmit: async (values, { resetForm }) => {
            const valuesLast = {
                username: values.username,
                password: values.password,
                numberPhone: values.numberPhone,
                email: values.email,
            };
            try {
                const response = await userApi.signUp({
                    username: valuesLast.username,
                });
                toastNotification('error', 'Đăng kí tài khoản thất bại, tài khoản đã tồn tại !', 1500);
            }
            catch (err) {
                console.log(err);
                postApi(valuesLast);
                resetForm();
                toastNotification('success', 'Đăng kí tài khoản thành công, trở về để đăng nhập nhé !', 1500);
                setTimeout(() => {
                    navi('/signin');
                }, 1500);
            }
        }
    });

    return (
        <section className={clsx(style.signup)}>
            <SelectSpeed />
            <Row gutter={[{ lg: 60, md: 40, xs: 0 }, { lg: 60, md: 40, xs: 0 }]} className={clsx(style.row)}>
                <Col xl={15} lg={12} xs={0}>
                    <section className={clsx(style.signup__introduce)}>
                        <img src={images.signup.signup} alt="logo" />
                    </section>
                </Col>
                <Col xl={9} lg={12} xs={24}>
                    <form action="#" className={clsx(style.signup__formSignup)} onSubmit={formik.handleSubmit}>
                        <section className={clsx(style.formTitle)}>
                            <h1>Đăng ký</h1>
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
                                type="text"
                                name="numberPhone"
                                value={formik.values.numberPhone}
                                onChange={formik.handleChange}
                                placeholder="Số điện thoại"
                            />
                            <BsFillTelephoneForwardFill className={clsx(style.icon)} />
                            {formik.errors.numberPhone && (<p className={clsx(style.errorMessage)}>{formik.errors.numberPhone}</p>)}
                        </section>

                        <section className={clsx(style.formGroup)} >
                            <input
                                type="text"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                placeholder="Email"
                            />
                            <BsFillTelephoneForwardFill className={clsx(style.icon)} />
                            {formik.errors.numberPhone && (<p className={clsx(style.errorMessage)}>{formik.errors.email}</p>)}
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
                        <section className={clsx(style.formGroup)} >
                            <input
                                type="password"
                                name="passwordAgain"
                                value={formik.values.passwordAgain}
                                onChange={formik.handleChange}
                                placeholder="Nhập lại mật khẩu"
                            />
                            <FiRotateCw className={clsx(style.icon)} />
                            {formik.errors.passwordAgain && (<p className={clsx(style.errorMessage)}>{formik.errors.passwordAgain}</p>)}
                        </section>
                        <section className={clsx(style.formGroup)}>
                            <input
                                type="submit"
                                name="inputSubmit"
                                value="Đăng ký"
                                className={clsx(style.submit)}
                            />
                        </section>
                        <section className={clsx(style.backSignin)}>
                            <Link to="/signin">
                                <BiArrowBack className={clsx(style.icon)} />
                                <span>Quay lại đăng nhập</span>
                            </Link>
                        </section>
                    </form>
                </Col>
            </Row>
        </section>
    )
}
export default Signup;