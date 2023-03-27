import { clsx } from 'clsx';
import style from './formRecruit.module.scss';
import images from 'assets/images/index';
import { Row, Col } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import SelectSpeed from 'component/selectSpeed/SelectSpeed';
import { useParams } from 'react-router-dom';
import {useState} from 'react';
import recruitApi from 'api/modules/recruit.api';
import toastNotification from 'handler/toast.handler';
const FormRecruit = () => {
    const position = useParams();
    const [dataRecruit, setDataRecruit] = useState({
        sex: '',
        level: '',
        position: position.position
    })
    console.log(dataRecruit);
    const handleClick = () => {
        console.log('click')
        window.scrollTo({
            top: 600,
            behavior: "smooth"
        });
    }
    const formik = useFormik({
        initialValues: {
            name: '',
            birthDay: '',
            numberPhone: '',
            address: '',
            linkFb: '',
            exper: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Họ tên không thể để trống").min(4, "Họ tên ít nhất 5 kí tự"),
            birthDay: Yup.string().required("Ngày tháng năm sinh không thể để trống"),
            numberPhone: Yup.string().required("Số điện thoại không được để trống").matches(/((09|03|07|08|05)+([0-9]{8})\b)/g, "Số điện thoại không đúng định dạng"),
            address: Yup.string().required("Địa chỉ không thể để trống"),
            linkFb: Yup.string().required("Địa chỉ Facebook không thể để trống"),
            exper: Yup.string().required("Kinh nghiệm không thể để trống"),
        }),
        onSubmit: async(values, {resetForm}) => {
            const data = {
                ...values,
                ...dataRecruit,
            }
            try {
                const response = await recruitApi.create(data);
                toastNotification('success', 'Chúng tôi đã ghi nhận thông tin ứng tuyển của bạn !', 1500);
                resetForm();
            }
            catch(err) {
                console.log(err);
            }
        }
    })
    return (
        <main className={clsx(style.main)}>
            <SelectSpeed />
            <section className={clsx(style.formRecruit)}>
                <section className={clsx(style.formRecruit__intro)}>
                    <Row gutter={[{ xl: 0 }, { xl: 0 }]} align={'middle'}>
                        <Col xl={12}>
                            <div className={clsx(style.formRecruit__intro__head)}>
                                <h1>Hãy là một phần của Hữu Nhân</h1>
                                <p>Một môi trường không thể tốt hơn để bạn có thể phát triển. Đến với chúng tôi bạn sẽ đến với một môi trường thân thiện làm việc chuyên nghiệp. Đặc biệt hơn nữa là cùng với chúng tôi viết tiếp những hoài bão, sứ mệnh ở phía trước còn đang dang dỡ</p>
                                <div onClick={handleClick}>
                                    <button className={clsx(style.btnAnimation)}>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span>Xem chi tiết</span>
                                    </button>
                                </div>
                            </div>
                        </Col>
                        <Col xl={12}>
                            <div className={clsx(style.formRecruit__intro__body)}>
                                <img src={images.recruit.formRecruit} alt="alt" />
                            </div>
                        </Col>
                    </Row>
                </section>
                <form className={clsx(style.formRecruit__form)} onSubmit={formik.handleSubmit}>
                    <Row gutter={[{ xl: 20 }, { xl: 20 }]}>
                        <Col xl={24}>
                            <section className={clsx(style.formGroup)}>
                                <h1>Ứng viên ứng tuyển điền vào Form sau</h1>
                            </section>
                        </Col>
                        <Col xl={8}>
                            <section className={clsx(style.formGroup)}>
                                <input
                                    type="text"
                                    name="name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    placeholder='Nhập họ và tên (*)'
                                />
                                {formik.errors.name && <p className={clsx(style.errMsg)}>{formik.errors.name}</p>}
                            </section>
                        </Col>
                        <Col xl={8}>
                            <section 
                                className={clsx(style.formGroup)}
                                onChange={(e) => setDataRecruit({...dataRecruit, sex: e.target.value})}
                            >
                                <select name="sex">
                                    <option value="">Giới tính</option>
                                    <option value="nam">Nam</option>
                                    <option value="nu">Nữ</option>
                                    <option value="khac">Khác</option>
                                </select>
                            </section>
                        </Col>
                        <Col xl={8}>
                            <section className={clsx(style.formGroup)}>
                                <input
                                    type="text"
                                    name="birthDay"
                                    placeholder='Nhập ngày tháng năm sinh (*)'
                                    value={formik.values.birthDay}
                                    onChange={formik.handleChange}
                                />
                                {formik.errors.birthDay && <p className={clsx(style.errMsg)}>{formik.errors.birthDay}</p>}
                            </section>
                        </Col>
                        <Col xl={8}>
                            <section className={clsx(style.formGroup)}>
                                <input
                                    type="text"
                                    name="numberPhone"
                                    placeholder='Nhập số điện thoại (*)'
                                    value={formik.values.numberPhone}
                                    onChange={formik.handleChange}
                                />
                                {formik.errors.numberPhone && <p className={clsx(style.errMsg)}>{formik.errors.numberPhone}</p>}

                            </section>
                        </Col>
                        <Col xl={16}>
                            <section className={clsx(style.formGroup)}>
                                <input
                                    type="text"
                                    name="address"
                                    placeholder='Nhập địa chỉ (*)'
                                    value={formik.values.address}
                                    onChange={formik.handleChange}
                                />
                                {formik.errors.address && <p className={clsx(style.errMsg)}>{formik.errors.address}</p>}
                            </section>
                        </Col>
                        <Col xl={8}>
                            <section 
                                className={clsx(style.formGroup)}
                                onChange={(e) => setDataRecruit({...dataRecruit, level: e.target.value})}
                            >
                                <select name="level">
                                    <option value="">Trình độ học vấn</option>
                                    <option value="Dai hoc">Đại học</option>
                                    <option value="Cao dang">Cao đẳng</option>
                                    <option value="Pho thong">Phổ thông</option>
                                </select>
                            </section>
                        </Col>
                        <Col xl={16}>
                            <section className={clsx(style.formGroup)}>
                                <input
                                    type="text"
                                    name="linkFb"
                                    placeholder='Nhập địa chỉ Facebook (*)'
                                    value={formik.values.linkFb}
                                    onChange={formik.handleChange}
                                />
                                {formik.errors.linkFb && <p className={clsx(style.errMsg)}>{formik.errors.linkFb}</p>}
                            </section>
                        </Col>
                        <Col xl={24}>
                            <section className={clsx(style.formGroup)}>
                                <textarea
                                    name="exper"
                                    cols="30"
                                    rows="10"
                                    placeholder='Kinh nghiệm ở vị trí ứng tuyển (*)'
                                    value={formik.values.exper}
                                    onChange={formik.handleChange}
                                >
                                </textarea>
                                {formik.errors.exper && <p className={clsx(style.errMsg)}>{formik.errors.exper}</p>}
                            </section>
                        </Col>
                        <Col xl={24}>
                            <section className={clsx(style.formGroup)}>
                                <input
                                    type="submit"
                                    name="submit"
                                    value="Ứng tuyển"
                                />
                            </section>
                        </Col>
                    </Row>
                </form>
            </section>
        </main>
    )
}

export default FormRecruit;