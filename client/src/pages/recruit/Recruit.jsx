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

// Translate
import { useTranslation } from 'react-i18next';


const Recruit = () => {
    const { t } = useTranslation(['recruit', 'btn']);
    // Variables global
    const dataBenefits = [
        {
            img: images.recruit.profess,
            title: t('recruit.benefits.environment.title'),
            des: t('recruit.benefits.environment.content'),
        },
        {
            img: images.recruit.money,
            title: t('recruit.benefits.social.title'),
            des: t('recruit.benefits.social.content'),
        },
        {
            img: images.recruit.develop,
            title: t('recruit.benefits.develop.title'),
            des: t('recruit.benefits.develop.content'),
        },
        {
            img: images.recruit.creation,
            title: t('recruit.benefits.creative.title'),
            des: t('recruit.benefits.creative.content'),
        }
    ];
    const dataPositionRecruit = [
        {
            img: images.recruit.protect,
            title: t('recruit.candidates.protect.title'),
            request: [t('recruit.candidates.protect.age'), t('recruit.candidates.protect.gender'), t('recruit.candidates.protect.request'), t('recruit.candidates.protect.time')],
            position: 'protect'
        },
        {
            img: images.recruit.manage,
            title: t('recruit.candidates.manager.title'),
            request: [t('recruit.candidates.manager.age'), t('recruit.candidates.manager.gender'), t('recruit.candidates.manager.request'), t('recruit.candidates.manager.time')],
            position: 'manager',
        },
        {
            img: images.recruit.adsive,
            title: t('recruit.candidates.advise.title'),
            request: [t('recruit.candidates.advise.age'), t('recruit.candidates.advise.gender'), t('recruit.candidates.advise.request'), t('recruit.candidates.advise.time')],
            position: 'adsive',
        },
        {

            img: images.recruit.shipper,
            title: t('recruit.candidates.shipper.title'),
            request:  [t('recruit.candidates.shipper.age'), t('recruit.candidates.shipper.gender'), t('recruit.candidates.shipper.request'), t('recruit.candidates.shipper.time')],
            position: 'shipper',
        },
        {

            img: images.recruit.accountant,
            title: t('recruit.candidates.accountant.title'),
            request: [t('recruit.candidates.accountant.age'), t('recruit.candidates.accountant.gender'), t('recruit.candidates.accountant.request'), t('recruit.candidates.accountant.time')],
            position: 'accountant',
        },
        {

            img: images.recruit.marketing,
            title: t('recruit.candidates.accountant.title'),
            request: [t('recruit.candidates.marketing.age'), t('recruit.candidates.marketing.gender'), t('recruit.candidates.marketing.request'), t('recruit.candidates.marketing.time')],
            position: 'marketing',
        },

    ];
    return (
        <main className={clsx(style.main)}>
            <SelectSpeed />
            <section className={clsx(style.recruit)}>
                <section className={clsx(style.recruit__intro)}>
                    <Row gutter={[{ lg: 60, md: 40, sm: 30, xs: 15 }, { lg: 60, md: 40, sm: 30, xs: 15 }]} align={"middle"}>
                        <Col lg={12} xs={24}>
                            <section className={clsx(style.recruit__intro__head)}>
                                <h1>{t('recruit.title')}</h1>
                                <p>
                                    {t('recruit.introduce')}
                                </p>
                                <div
                                    onClick={() => { window.scrollTo({ top: 800, behavior: 'smooth' }) }}
                                >
                                    <button className={clsx(style.btnAnimation)}>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span>{t('btn.see_detail', { ns: 'btn' })}</span>
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
                                                    <button>{t('btn.recruit',{ns: 'btn'})}</button>
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
