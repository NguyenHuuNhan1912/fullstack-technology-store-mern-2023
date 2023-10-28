// Antd
import { Row, Col } from 'antd';

// Library
import { clsx } from 'clsx';

// Icon
import { FaClock, FaPhoneSquareAlt, FaQrcode, FaMoneyBill, FaCartArrowDown, FaCompress, FaFacebookSquare, FaInstagramSquare, FaYoutube, } from 'react-icons/fa';
import { BsBank2, BsFillChatSquareTextFill, BsFillCheckCircleFill } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import { AiFillCopyrightCircle } from 'react-icons/ai';

// Local
import style from './footer.module.scss';
import images from 'assets/images'

// Translate
import { useTranslation } from 'react-i18next';


const Footer = () => {
    const { t } = useTranslation(['information']);

    // Variables Gloabal
    const footerInfor = [
        { des: t('information.street.title') },
        { des: t('information.street.address') },
        { des: t('information.street.number_phone') },
        { des: t('information.street.time_open') },
    ];
    const footerPay = [
        { icon: FaQrcode, des: t('information.payment.qr_code') },
        { icon: FaMoneyBill, des: t('information.payment.cash') },
        { icon: FaClock, des: t('information.payment.installment') },
        { icon: BsBank2, des: t('information.payment.baking') },
    ];
    const footerSupport = [
        { icon: FaCartArrowDown, des: t('information.support.buy_product') },
        { icon: BsFillChatSquareTextFill, des: t('information.support.support_customer') },
        { icon: FaCompress, des: t('information.support.feedback') },
        { icon: BsFillCheckCircleFill, des: t('information.support.guarantee') },
    ];
    const footerBranch = [
        { des: t('information.branch.ag') },
        { des: t('information.branch.kg') },
        { des: t('information.branch.dt') },
        { des: t('information.branch.vl') },
        { des: t('information.branch.sg') },
    ];
    const footerContact = [
        { icon: FaFacebookSquare, path: 'https://www.facebook.com/nguyenhuunhan.frontend/' },
        { icon: FaPhoneSquareAlt, path: 'tel: 0342040063' },
        { icon: FaInstagramSquare, path: 'https://www.instagram.com/nhan.coder.1912/' },
        { icon: FaYoutube, path: 'https://www.youtube.com/@NguyenHuuNhan1010' },
        { icon: MdEmail, path: 'mailto: nguyenhuunhan.coder@gmail.com' },
    ];
    return (
        <footer className={clsx(style.footer)}>
            <Row gutter={[{ md: 30, sm: 40, xs: 20 }, { md: 30, sm: 40, xs: 40 }]}>
                <Col xl={8} md={24}>
                    <section className={clsx(style.footer__infor)}>
                        <div className={clsx(style.footer__infor__head)}>
                            <img src={images.footer.logon} alt="logo" />
                            <h1>{t('information.title')}</h1>
                        </div>
                        <div className={clsx(style.footer__infor__body)}>
                            <ul className={clsx(style.navList)}>
                                {
                                    footerInfor.map((item, index) => {
                                        return (
                                            <li key={index} className={clsx(style.navItem)}>
                                                <a href="/">
                                                    <span>{item.des}</span>
                                                </a>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </section>
                </Col>
                <Col xl={4} md={8}>
                    <section className={clsx(style.footer__pay)}>
                        <div className={clsx(style.footer__pay__head)}>
                            <h1>{t('information.street.title')}</h1>
                        </div>
                        <div className={clsx(style.footer__pay__body)}>
                            <ul className={clsx(style.navList)}>
                                {
                                    footerPay.map((item, index) => {
                                        return (
                                            <li key={index} className={clsx(style.navItem)}>
                                                <a href="#">
                                                    <item.icon className={clsx(style.icon)} />
                                                    <span>{item.des}</span>
                                                </a>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </section>
                </Col>
                <Col xl={6} md={8}>
                    <section className={clsx(style.footer__support)}>
                        <section className={clsx(style.footer__support__head)}>
                            <h1>{t('information.support.title')}</h1>
                        </section>
                        <section className={clsx(style.footer__support__body)}>
                            <ul className={clsx(style.navList)}>
                                {
                                    footerSupport.map((item, index) => {
                                        return (
                                            <li key={index} className={clsx(style.navItem)}>
                                                <a href='#'>
                                                    <item.icon className={clsx(style.icon)} />
                                                    <span>{item.des}</span>
                                                </a>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </section>
                    </section>
                </Col>
                <Col xl={6} md={8}>
                    <section className={clsx(style.footer__branch)}>
                        <section className={clsx(style.footer__branch__head)}>
                            <h1>{t('information.branch.title')}</h1>
                        </section>
                        <section className={clsx(style.footer__branch__body)}>
                            <ul className={clsx(style.navList)}>
                                {
                                    footerBranch.map((item, index) => {
                                        return (
                                            <li key={index} className={clsx(style.navItem)}>
                                                <a href="#">
                                                    <p>{item.des}</p>
                                                </a>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </section>
                    </section>
                </Col>
                <Col xl={24} md={24}>
                    <section className={clsx(style.footer__contact)}>
                        <section className={clsx(style.footer__contact__body)}>
                            <ul className={clsx(style.navList)}>
                                {
                                    footerContact.map((item, index) => {
                                        return (
                                            <li key={index} className={clsx(style.navItem)}>
                                                <a href={item.path} target='_blank'>
                                                    <item.icon className={clsx(style.icon)} />
                                                </a>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </section>
                    </section>
                </Col>
                <Col xl={24} md={24}>
                    <section className={clsx(style.footer__copyright)}>
                        <section className={clsx(style.footer__copyright__mt)}>
                            <span>{t('information.dcma')}</span>
                        </section>
                        <section className={clsx(style.footer__copyright__cp)}>
                            <AiFillCopyrightCircle className={clsx(style.icon)} />
                            <span>{t('information.copyright')}</span>
                        </section>
                    </section>
                </Col>
            </Row>
        </footer>
    )
}
export default Footer;