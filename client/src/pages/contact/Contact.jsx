import { clsx } from 'clsx';
import style from './contact.module.scss';
import images from 'assets/images/index';
import { Row, Col } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import SelectSpeed from 'component/selectSpeed/SelectSpeed';
import contactApi from 'api/modules/contact.api';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useState } from 'react';
import toastNotification from 'handler/toast.handler';
const Contact = () => {
    const postApi = async (values) => {
        try {
            await contactApi.create(values);
        }
        catch(err) {
            console.log(err);
        }
    }
    const formik = useFormik({
        initialValues: {
            name: '',
            numberPhone: '',
            email: '',
            content: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Họ tên không thể để trống").min(4, "Tên phải ít nhất 5 kí tự"),
            numberPhone: Yup.string().required("Số điện thoại không thể để trống").matches(/((09|03|07|08|05)+([0-9]{8})\b)/g, "Số điện thoại không đúng định dạng"),
            email: Yup.string().required("Email không thể để trống").matches(/[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/igm,"Email không đúng định dạng"),
            content: Yup.string().required("Nội dung không thể để trống"),
        }),
        onSubmit: (values, { resetForm }) => {
            console.log(values);
            console.log('submit');
            postApi(values);
            resetForm();
            toastNotification('success', 'Phản hồi của bạn đã được chúng tôi ghi nhận', 1000);
        }
    });
   
    return (
        <main className={clsx(style.main)}>
            <SelectSpeed />
            <section className={clsx(style.contact)}>
                <Row gutter={[{ xl: 80 }, { xl: 80 }]} align={"middle"}>
                    <Col xl={12}>
                        <form className={clsx(style.contact__form)} onSubmit={formik.handleSubmit}>
                            <section className={clsx(style.formGroup)}>
                                <h1>Liên hệ với chúng tôi</h1>
                            </section>
                            <section className={clsx(style.formGroup)}>
                                <input
                                    type="text"
                                    name="name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    placeholder="Nhập họ tên(*)"
                                    autoComplete='off'
                                />
                                {formik.errors.name && <p className={clsx(style.errMsg)}>{formik.errors.name}</p>}
                            </section>
                            <section className={clsx(style.formGroup)}>
                                <input
                                    type="text"
                                    name="numberPhone"
                                    value={formik.values.numberPhone}
                                    onChange={formik.handleChange}
                                    placeholder="Nhập số điện thoại(*)"
                                    autoComplete='off'
                                />
                                {formik.errors.numberPhone && <p className={clsx(style.errMsg)}>{formik.errors.numberPhone}</p>}
                            </section>
                            <section className={clsx(style.formGroup)}>
                                <input
                                    type="email"
                                    name="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    placeholder="Nhập email cá nhân(*)"
                                    autoComplete='off'
                                />
                                {formik.errors.email && <p className={clsx(style.errMsg)}>{formik.errors.email}</p>}
                            </section>
                            <section className={clsx(style.formGroup)}>
                                <textarea
                                    name="content"
                                    cols="30"
                                    rows="3"
                                    value={formik.values.content}
                                    onChange={formik.handleChange}
                                    placeholder="Nhập nội dung(*)"
                                    autoComplete='off'
                                >
                                </textarea>
                                {formik.errors.content && <p className={clsx(style.errMsg)}>{formik.errors.content}</p>}
                            </section>
                            <section className={clsx(style.formGroup)}>
                                <input
                                    type="submit"
                                    name="submit"
                                    value="Gửi"
                                    className={clsx(style.submit)}
                                // onClick={handleClick}
                                />
                            </section>
                        </form>
                    </Col>
                    <Col xl={12}>
                        <section className={clsx(style.contact__me)}>
                            <img src={images.contact.me} alt="me" />
                        </section>
                    </Col>
                </Row>
            </section>
            <section className={clsx(style.map)}>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31399.26642771162!2d105.382635!3d10.349216850000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310a0cec7e649a3d%3A0xff238401d041bc9e!2zdHQuIFBow7ogSMOyYSwgTG9uZyBYdXnDqm4sIEFuIEdpYW5n!5e0!3m2!1sen!2s!4v1663985753328!5m2!1sen!2s"
                    style={{border: 0}} allowFullScreen="" loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade">
                </iframe>
            </section>
        </main>
    )
}
export default Contact;
