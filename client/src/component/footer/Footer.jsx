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

// Variables Gloabal
const footerInfor = [
    { des: 'Xem đường đi chi tiết' },
    { des: 'Địa chỉ: Đường 1010, thị trấn Phú Hòa, huyện Thoại Sơn, tỉnh An Giang' },
    { des: 'Điện thoại: 0342040063' },
    { des: 'Thời gian mở cửa: 8h-22h các ngày trong tuần' },
];
const footerPay = [
    { icon: FaQrcode, des: 'Qr code' },
    { icon: FaMoneyBill, des: 'Tiền mặt' },
    { icon: FaClock, des: 'Trả góp' },
    { icon: BsBank2, des: 'Chuyển khoản' },
];
const footerSupport = [
    { icon: FaCartArrowDown, des: 'Mua hàng: 0342040064' },
    { icon: BsFillChatSquareTextFill, des: 'Hỗ trợ KH: 0342040065' },
    { icon: FaCompress, des: 'Khiếu nại: 0342040066' },
    { icon: BsFillCheckCircleFill, des: 'Bảo hành: 0342040067' },
];
const footerBranch = [
    { des: 'Thị trấn Phú Hòa - An Giang' },
    { des: 'Thành phố Rạch Giá - Kiên Giang' },
    { des: 'Thành phố Hồng Ngự - Đồng Tháp' },
    { des: 'Thành phố Vĩnh Long - Vĩnh Long' },
    { des: 'Thành phố Bến Tre - Bến Tre' },
];
const footerContact = [
    { icon: FaFacebookSquare, path: 'https://www.facebook.com/nguyenhuunhan.frontend/'},
    { icon: FaPhoneSquareAlt, path: 'tel: 0342040063' },
    { icon: FaInstagramSquare, path: 'https://www.instagram.com/nhan.coder.1912/' },
    { icon: FaYoutube, path: 'https://www.youtube.com/@NguyenHuuNhan1010' },
    { icon: MdEmail, path: 'mailto: nguyenhuunhan.coder@gmail.com' },
];
const Footer = () => {
    return (
        <footer className={clsx(style.footer)}>
            <Row gutter={[{ md: 30, sm: 40, xs: 20 }, { md: 30, sm: 40, xs: 40 }]}>
                <Col xl={8} md={24}>
                    <section className={clsx(style.footer__infor)}>
                        <div className={clsx(style.footer__infor__head)}>
                            <img src={images.footer.logon} alt="logo" />
                            <h1>Cửa hàng công nghệ Hữu Nhân</h1>
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
                            <h1>Thanh toán</h1>
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
                            <h1>Tổng đài hỗ trợ</h1>
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
                            <h1>Các chi nhánh của cửa hàng</h1>
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
                            <span>DCMA | PROTECTED</span>
                        </section>
                        <section className={clsx(style.footer__copyright__cp)}>
                            <AiFillCopyrightCircle className={clsx(style.icon)} />
                            <span>2019 - 2023 Hữu Nhân - Cửa hàng công nghệ hàng đầu Việt Nam</span>
                        </section>
                    </section>
                </Col>
            </Row>
        </footer>
    )
}
export default Footer;