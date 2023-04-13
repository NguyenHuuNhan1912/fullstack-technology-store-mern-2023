// Library
import { clsx } from 'clsx';

// Local
import style from './recruit.module.scss';
import images from 'assets/images/index';
import './customSlider.scss';

// Antd
import { Row, Col } from 'antd';

// Icon
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs';

// React
import { Link } from 'react-router-dom';

// Swiper modules
import { Navigation, Pagination, A11y, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/effect-coverflow';

// Component
import SelectSpeed from 'component/selectSpeed/SelectSpeed';

// Variables global
const dataBenefits = [
    {
        img: images.recruit.profess,
        title: 'Môi trường chuyên nghiệp',
        des: 'Đến với chúng tôi bạn sẽ được rèn luyện để trở thành những người chuyên nghiệp nhất',
    },
    {
        img: images.recruit.money,
        title: 'Phúc lợi xã hội cao',
        des: 'Hữu Nhân được biết đến là một đơn vị có chế độ đãi ngộ cao dành cho các nhân sự',
    },
    {
        img: images.recruit.develop,
        title: 'Thăng tiến sự nghiệp',
        des: 'Sự nghiệp của bạn sẽ được phát triển và sẽ thật công bằng khi đó là năng lực của bạn',
    },
    {
        img: images.recruit.creation,
        title: 'Tự do sáng tạo',
        des: 'Chúng tôi luôn cho phép các bạn đóng góp ý kiến cá nhân, quan điểm của bản thân',
    }
];
const dataPositionRecruit = [
    {
        img: images.recruit.protect,
        title: 'Nhân viên bảo vệ',
        request: ['Tuổi: từ 18 đến 40', 'Giới tính: Nam', 'Vui vẻ, trung thực', 'Thời gian làm việc cố định'],
        position: 'protect'
    },
    {
        img: images.recruit.manage,
        title: 'Quản lý',
        request: ['Tuổi 30 đến 40 ', 'Có kinh nghiệm', 'quyết đoán', 'Thời gian làm việc cố định'],
        position: 'manager',
    },
    {
        img: images.recruit.adsive,
        title: 'Nhân viên tư vấn',
        request: ['Tuổi từ 18 đến 29', 'Chuyên môn tốt', ' Vui vẻ, sôi động', 'Thời gian làm việc cố định'],
        position: 'adsive',
    },
    {

        img: images.recruit.shipper,
        title: 'Nhân viên giao hàng',
        request: ['Tuổi từ 18 đến 24 ', 'Giới tính: Nam ', 'Nhanh nhẹn, rành đường ', 'Thời gian làm việc cố định '],
        position: 'shipper',
    },
    {

        img: images.recruit.accountant,
        title: 'Kế toán',
        request: ['Tuổi từ 18 đến 24', 'Có kinh nghiệm', 'Trung thực, cẩn thận', 'Thời gian làm việc cố định '],
        position: 'accountant',
    },
    {

        img: images.recruit.marketing,
        title: 'Nhân viên marketing',
        request: ['Tuổi từ 18 đến 24 ', 'Giới tính: Nữ ', 'Vui vẻ, sôi động', 'Thời gian làm việc cố định '],
        position: 'marketing',
    },

];
const Recruit = () => {
    return (
        <main className={clsx(style.main)}>
            <SelectSpeed />
            <section className={clsx(style.recruit)}>
                <section className={clsx(style.recruit__intro)}>
                    <Row gutter={[{ lg: 60, md: 40, sm: 30, xs: 15 }, { lg: 60, md: 40, sm: 30, xs: 15 }]} align={"middle"}>
                        <Col lg={12} xs={24}>
                            <section className={clsx(style.recruit__intro__head)}>
                                <h1>Hữu Nhân tuyển dụng</h1>
                                <p>
                                    Cửa hàng công nghệ Hữu Nhân là một câu chuyện khởi nghiệp đầy cảm xúc
                                    từ anh chàng sinh viên năm cuối trường đại học Cần Thơ. Với khát vọng
                                    vô cùng mãnh liệt và cháy bỗng, chàng sinh viên năm ấy mang cho mình một giấc mộng,
                                    một giấc mộng về công nghệ. Chàng trai ấy đã không ngừng nổ lực để hoàn thành giấc mộng
                                    ấy và ngày hôm nay cửa hàng Công nghệ Hữu Nhân đã ra đời cũng như đã thực hiện được ước mơ và sứ mệnh.
                                </p>
                                <div
                                    onClick={() => { window.scrollTo({ top: 800, behavior: 'smooth' }) }}
                                >
                                    <button className={clsx(style.btnAnimation)}>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span>Xem chi tiết</span>
                                    </button>
                                </div>
                            </section>
                        </Col>
                        <Col lg={12} xs={24}>
                            <section className={clsx(style.recruit__intro__body)}>
                                <img src={images.recruit.me} alt="" />
                            </section>
                        </Col>
                    </Row>
                </section>
                <section className={clsx(style.recruit__benefits)}>
                    <Row gutter={[{ sm: 30, xs: 15 }, { sm: 30, xs: 15 }]}>
                        {
                            dataBenefits.map((item, index) => {
                                return (
                                    <Col xl={6} lg={8} sm={12} xs={24} key={index}>
                                        <section className={clsx(style.recruit__benefits__content)}>
                                            <img src={item.img} alt="img" />
                                            <h1>{item.title}</h1>
                                            <p>{item.des}</p>
                                        </section>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </section>
                <section className={clsx(style.recruit__slider)}>
                    <Swiper
                        modules={[Navigation, Pagination, A11y, Autoplay]}
                        autoplay={{
                            delay: 1500,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true
                        }}
                        speed={1200}
                        loop={true}
                        navigation={{
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        }}
                        pagination={{
                            el: '.swiper-pagination',
                            clickable: true
                        }}
                        spaceBetween={30}
                        slidesPerView={3}
                        slidesPerGroup={1}
                        breakpoints={{
                            1199: {
                                slidesPerView: 3,
                                slidesPerGroup: 1
                            },
                            576: {
                                slidesPerView: 2,
                                slidesPerGroup: 1
                            },
                            320: {
                                slidesPerView: 1.5,
                                slidesPerGroup: 1,
                                spaceBetween: 15
                            }
                        }}
                    >

                        {
                            dataPositionRecruit.map((item, index) => {
                                return (
                                    <SwiperSlide key={index}>
                                        <section className={clsx(style.card)}>
                                            <div className={clsx(style.card__head)}>
                                                <img src={item.img} alt="img" />
                                            </div>
                                            <div className={clsx(style.card__body)}>
                                                <h1>{item.title}</h1>
                                                <div className={clsx(style.des)}>
                                                    {
                                                        item.request.map((item2, index2) => {
                                                            return (
                                                                <p key={index2}>{item2}</p>
                                                            )
                                                        })
                                                    }
                                                </div>
                                                <Link to={`formrecruit/${item.position}`}>
                                                    <button>Ứng tuyển</button>
                                                </Link>
                                            </div>
                                        </section>
                                    </SwiperSlide>
                                )
                            })
                        }
                    </Swiper>
                    <div className="slider-controller slider-controller--recruit">
                        <div className="swiper-button-prev slider-arrow">
                            <BsFillArrowLeftCircleFill />
                        </div>
                        <div className="swiper-button-next slider-arrow">
                            <BsFillArrowRightCircleFill />
                        </div>
                        <div className="swiper-pagination"></div>
                    </div>
                </section>
            </section>
        </main>
    )
}
export default Recruit;
