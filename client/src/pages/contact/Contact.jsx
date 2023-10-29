// Local
import { clsx } from 'clsx';
import style from './contact.module.scss';
import images from 'assets/images/index';

// Antd
import { Row, Col } from 'antd';

// Validate
import { useFormik } from 'formik';
import * as Yup from 'yup';

// Component
import SelectSpeed from 'component/selectSpeed/SelectSpeed';

// Api
import contactApi from 'api/modules/contact.api';

// Module
import toastNotification from 'handler/toast.handler';

// Translate
import { useTranslation } from 'react-i18next';

const Contact = () => {
    const {t} = useTranslation(['validate', 'btn']);
    const postApi = async (values) => {
        try {
            await contactApi.create(values);
        }
        catch (err) {
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
            name: Yup.string().required(t('validate.error.fullname.not_empty')).min(4, t('validate.error.fullname.at_least_5_character')),
            numberPhone: Yup.string().required(t('validate.error.number_phone.not_number_phone')).matches(/((09|03|07|08|05)+([0-9]{8})\b)/g, t('validate.error.number_phone.invalid')),
            email: Yup.string().required(t('validate.error.email.not_empty_email')).matches(/[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/igm, t('validate.error.email.invalid')),
            content: Yup.string().required(t('validate.error.content.not_empty_content')),
        }),
        onSubmit: (values, { resetForm }) => {
            postApi(values);
            resetForm();
            toastNotification('success', 'Phản hồi của bạn đã được chúng tôi ghi nhận', 1000);
        }
    });

    return (
        <main className={clsx(style.main)}>
            <SelectSpeed />
            <section className={clsx(style.contact)}>
                <Row gutter={[{ lg: 60, md: 40, sm: 30, xs: 15 }, { lg: 60, md: 40, sm: 30, xs: 15 }]} className={clsx(style.row)}>
                    <Col md={12} xs={24}>
                        <form className={clsx(style.contact__form)} onSubmit={formik.handleSubmit}>
                            <section className={clsx(style.formGroup)}>
                                <h1>{t('validate.form.contact.title')}</h1>
                            </section>
                            <section className={clsx(style.formGroup)}>
                                <input
                                    type="text"
                                    name="name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    placeholder={`${t('validate.form.contact.place.fullname')} (*)`}
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
                                    placeholder={`${t('validate.form.contact.place.number_phone')} (*)`}
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
                                    placeholder={`${t('validate.form.contact.place.private_email')} (*)`}
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
                                    placeholder={`${t('validate.form.contact.place.content')} (*)`}
                                    autoComplete='off'
                                >
                                </textarea>
                                {formik.errors.content && <p className={clsx(style.errMsg)}>{formik.errors.content}</p>}
                            </section>
                            <section className={clsx(style.formGroup)}>
                                <input
                                    type="submit"
                                    name="submit"
                                    value={t('btn.send',{ns: 'btn'})}
                                    className={clsx(style.submit)}
                                />
                            </section>
                        </form>
                    </Col>
                    <Col md={12} xs={24}>
                        <section className={clsx(style.contact__me)}>
                            <img src={images.contact.me} alt="me" />
                        </section>
                    </Col>
                </Row>
            </section>
            <section className={clsx(style.map)}>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31399.26642771162!2d105.382635!3d10.349216850000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310a0cec7e649a3d%3A0xff238401d041bc9e!2zdHQuIFBow7ogSMOyYSwgTG9uZyBYdXnDqm4sIEFuIEdpYW5n!5e0!3m2!1sen!2s!4v1663985753328!5m2!1sen!2s"
                    style={{ border: 0 }} allowFullScreen="" loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade">
                </iframe>
            </section>
        </main>
    )
}
export default Contact;
