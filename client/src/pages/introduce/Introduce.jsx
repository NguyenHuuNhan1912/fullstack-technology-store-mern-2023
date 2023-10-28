// Local
import { clsx } from 'clsx';
import style from './introduce.module.scss';
import image from 'assets/images/index';

// Antd
import { Row, Col } from 'antd';
import { Progress, Steps } from 'antd';

// Aos
import AOS from 'aos';
import 'aos/dist/aos.css';

// Icon
import { RiNumbersFill, RiMoneyDollarCircleFill } from 'react-icons/ri';
import { MdOutline6FtApart } from 'react-icons/md';
import { FaProductHunt, FaSearch, FaAssistiveListeningSystems, FaHandRock } from 'react-icons/fa'
import { AiOutlineSearch, AiFillSetting } from 'react-icons/ai';
import { GoLaw } from 'react-icons/go';
import { BsFillBarChartFill, BsFillTelephonePlusFill, BsFillCartCheckFill, BsPieChartFill } from 'react-icons/bs'
import { TbBuildingSkyscraper } from 'react-icons/tb'

// React
import { useState } from 'react';
import { useEffect } from 'react';

// Component
import SelectSpeed from 'component/selectSpeed/SelectSpeed';

// Translate
import { useTranslation } from 'react-i18next';



const Introduce = () => {
    const { t } = useTranslation('introduce', 'information', 'btn');
    // Variables global
    const dataStatistical = [
        { des: t('introduce.number.content.showroom'), percent: 63 },
        { des: t('introduce.number.content.buy_product'), percent: 90 },
        { des: t('introduce.number.content.customer'), percent: 70 },
        { des: t('introduce.number.content.access'), percent: 85 },
        { des: t('introduce.number.content.feedback'), percent: 95 },
    ];
    const dataProgress = [
        { title: '2018', description: t('introduce.develop.content._2018.title')},
        { title: '2019', description: t('introduce.develop.content._2018.title')},
        { title: '2020', description: t('introduce.develop.content._2019.title') },
        { title: '2021', description: t('introduce.develop.content._2020.title') },
        { title: '2022', description: t('introduce.develop.content._2021.title') },
        { title: '2023', description: t('introduce.develop.content._2022.title') },
    ];
    const dataCard = [
        { img: image.introduce.modernization, title: t('introduce.mission.content.modern') },
        { img: image.introduce.digitizing, title:  t('introduce.mission.content.digitizing') },
        { img: image.introduce.experience, title:  t('introduce.mission.content.ux') },
        { img: image.introduce.strong, title:  t('introduce.mission.content.steady') },
    ];
    const dataAchievement = [
        {
            icon: RiNumbersFill,
            title: t('introduce.achivement.content.top_10.title'),
            des: t('introduce.achivement.content.top_10.content'),
        },
        {
            icon: MdOutline6FtApart,
            title: t('introduce.achivement.content.high_class.title'),
            des: t('introduce.achivement.content.high_class.content'),
        },
        {
            icon: AiOutlineSearch,
            title: t('introduce.achivement.content.search.title'),
            des: t('introduce.achivement.content.search.content'),
        },
        {
            icon: FaProductHunt,
            title: t('introduce.achivement.content.product.title'),
            des: t('introduce.achivement.content.product.content'),
        },
    ];
    const dataOrganization = [
        { icon: GoLaw, title: t('introduce.organization.content.legislation') },
        { icon: RiMoneyDollarCircleFill, title: t('introduce.organization.content.finance') },
        { icon: BsFillBarChartFill, title: t('introduce.organization.content.marketing') },
        { icon: BsFillTelephonePlusFill, title: t('introduce.organization.content.care') },
        { icon: TbBuildingSkyscraper, title: t('introduce.organization.content.infrastructure') },
        { icon: AiFillSetting, title: t('introduce.organization.content.industry') },
        { icon: FaSearch, title: t('introduce.organization.content.administrative_personnel') },
        { icon: BsFillCartCheckFill, title: t('introduce.organization.content.retail_operations') },
        { icon: FaProductHunt, title: t('introduce.organization.contentproduct') },
        { icon: FaAssistiveListeningSystems, title: t('introduce.organization.content.listen') },
        { icon: BsPieChartFill, title: t('introduce.organization.content.believe') },
        { icon: FaHandRock, title: t('introduce.organization.content.striving') },
    ];
    const [current, setCurrent] = useState('');
    const onChange = (value) => {
        setCurrent(value);
    };
    useEffect(() => {
        AOS.init();
    }, [])
    return (
        <main className={clsx(style.main)}>
            <SelectSpeed />
            <section className={clsx(style.introduceWrapper)}>
                <section className={clsx(style.introduce)}>
                    <Row gutter={[{ sm: 30, xs: 15 }, { sm: 30, xs: 15 }]} className={clsx(style.row)}>
                        <Col xl={12}>
                            <div className={clsx(style.introduce__head)}>
                                <h1>{t('information.name_store',{ns: 'information'})}</h1>
                                <p>{t('information.slogan',{ns: 'information'})}</p>
                                <div onClick={() => { window.scrollTo({ top: 800, behavior: 'smooth' }) }}>
                                    <button className={clsx(style.btnAnimation)}>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span>{t('btn.see_detail',{ns: 'btn'})}</span>
                                    </button>
                                </div>
                            </div>
                        </Col>
                        <Col xl={12}>
                            <div className={clsx(style.introduce__body)}>
                                <img src={image.introduce.introduce} alt="introduce" />
                            </div>
                        </Col>
                    </Row>
                </section>
                <section className={clsx(style.statistical)}>
                    <Row gutter={[{ sm: 30, xs: 15 }, { sm: 30, xs: 15 }]} className={clsx(style.row)}>
                        <Col
                            lg={12}
                            md={24}
                            data-aos="fade-right"
                            data-aos-duration="1000"
                            data-aos-easing="ease-in-sine"
                        >
                            <div className={clsx(style.statistical__head)}>
                                <img src={image.introduce.statistical} alt="sta" />
                            </div>
                        </Col>
                        <Col
                            lg={12}
                            md={24}
                            data-aos="fade-left"
                            data-aos-duration="1000"
                            data-aos-easing="ease-in-sine"
                        >
                            <div className={clsx(style.statistical__body)}>
                                <div className={clsx(style.statistical__body__title)}>
                                    <h1>{t('introduce.number.title')}</h1>
                                </div>
                                {
                                    dataStatistical.map((item, index) => {
                                        return (
                                            <div key={index} className={clsx(style.statistical__body__progress)}>
                                                <p>{item.des}</p>
                                                <Progress
                                                    percent={item.percent}
                                                    showInfo={false}
                                                    style={{ padding: 0, margin: 0, }}
                                                    strokeColor={"#049c62"}
                                                />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </Col>
                    </Row>
                </section>
                <section
                    className={clsx(style.steps)}
                    data-aos="zoom-in"
                    data-aos-duration="1000"
                    data-aos-easing="ease-in-sine"
                >
                    <div className={clsx(style.steps__head)}>
                        <h1>{t('introduce.develop.title')}</h1>
                    </div>
                    <div className={clsx(style.steps__body)}>
                        <Steps
                            current={current}
                            onChange={onChange}
                            items={dataProgress}
                        />
                    </div>
                </section>
                <section className={clsx(style.card)}>
                    <Row gutter={[{ sm: 30, xs: 15 }, { sm: 30, xs: 30 }]}>
                        <Col xs={24}>
                            <section className={clsx(style.card__head)}>
                                <h1>{t('introduce.mission.title')}</h1>
                            </section>
                        </Col>
                        {
                            dataCard.map((item, index) => {
                                return (
                                    <Col
                                        xl={6}
                                        sm={12}
                                        xs={24}
                                        data-aos="flip-left"
                                        data-aos-duration="1000"
                                        data-aos-easing="ease-in-sine"
                                        key={index}
                                    >
                                        <section className={clsx(style.card__content)}>
                                            <h1>{item.title}</h1>
                                            <img src={item.img} alt="img" />
                                        </section>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </section>
                <section className={clsx(style.achievement)}>
                    <Row className={clsx(style.row)} >
                        <Col xs={24}>
                            <section className={clsx(style.achievement__head)}>
                                <h1>{t('introduce.achivement.title')}</h1>
                            </section>
                        </Col>
                        <Col xl={12} xs={24}>
                            <section className={clsx(style.achievement__img)}>
                                <img src={image.introduce.achievement} alt="alt" />
                            </section>
                        </Col>
                        <Col xl={12} xs={24}>
                            <Row gutter={[{ sm: 30, xs: 15 }, { sm: 30, xs: 15 }]}>
                                {
                                    dataAchievement.map((item, index) => {
                                        return (
                                            <Col md={12} sm={24} key={index}>
                                                <section className={clsx(style.achievement__content)}>
                                                    <div className={clsx(style.achievement__content__head)}>
                                                        <item.icon className={clsx(style.icon)} />
                                                    </div>
                                                    <div className={clsx(style.achievement__content__body)}>
                                                        <h1>{item.title}</h1>
                                                        <p>{item.des}</p>
                                                    </div>
                                                </section>
                                            </Col>
                                        )
                                    })
                                }
                            </Row>
                        </Col>
                    </Row>
                </section>
                <section className={clsx(style.organization)}>
                    <Row gutter={[{ sm: 30, xs: 15 }, { sm: 30, xs: 15 }]} className={clsx(style.row)}>
                        <Col xs={24}>
                            <section className={clsx(style.organization__head)}>
                                <h1>{t('introduce.organization.title')}</h1>
                            </section>
                        </Col>
                        {
                            dataOrganization.map((item, index) => {
                                return (
                                    <Col xl={6} lg={8} sm={12} xs={24} key={index}>
                                        <section className={clsx(style.organization__body)}>
                                            <item.icon className={clsx(style.icon)} />
                                            <h1>{item.title}</h1>
                                        </section>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </section>
            </section>
        </main>
    )
}
export default Introduce;