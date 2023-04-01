import { clsx } from 'clsx';
import style from './introduce.module.scss';
import image from 'assets/images/index';
import { Row, Col } from 'antd';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { Progress, Steps, Carousel } from 'antd';
import { useState } from 'react';
import { RiNumbersFill } from 'react-icons/ri';
import { MdOutline6FtApart } from 'react-icons/md';
import { FaProductHunt, FaSearch, FaAssistiveListeningSystems, FaHandRock } from 'react-icons/fa'
import { AiOutlineSearch, AiFillSetting } from 'react-icons/ai';
import {GoLaw} from 'react-icons/go';
import {RiMoneyDollarCircleFill} from 'react-icons/ri';
import {BsFillBarChartFill, BsFillTelephonePlusFill, BsFillCartCheckFill, BsPieChartFill} from 'react-icons/bs'
import {TbBuildingSkyscraper} from 'react-icons/tb'
import SelectSpeed from 'component/selectSpeed/SelectSpeed';
const dataStatistical = [
    { des: '63 showroom trên khắp đất nước Việt Nam', percent: 63 },
    { des: '90.000 sản phẩm đã được bán tại Hữu Nhân', percent: 90 },
    { des: 'Hơn 70.000 khách hàng doanh nghiệp', percent: 70 },
    { des: '85 triệu khách hàng truy cập website Hữu Nhân mỗi năm', percent: 85 },
    { des: '95% khách hàng phản hồi sự hài lòng về sản phẩm', percent: 95 },
];
const dataProgress = [
    { title: '2018', description: 'Khai trương cửa hàng đầu tiên' },
    { title: '2019', description: 'Thành lập trung tâm bảo hành' },
    { title: '2020', description: 'Thành lập cồng ty Hữu Nhân' },
    { title: '2021', description: 'Mở rộng một số cửa hàng tại khu vực phía Nam' },
    { title: '2022', description: 'Tối ưu hệ thống sản xuất phát triển' },
    { title: '2023', description: 'Sẵng sàng cho các bước phát triển mạnh mẽ nhất' },
];
const dataCard = [
    { img: image.introduce.modernization, title: 'Hiện đại hóa' },
    { img: image.introduce.digitizing, title: 'Số hóa' },
    { img: image.introduce.experience, title: 'Trải ngiệm khách hàng' },
    { img: image.introduce.strong, title: 'Chỗ đứng vững chắc' },
];
const dataAchievement = [
    {
        icon: RiNumbersFill,
        title: 'Top 10 nhà bán lẻ hàng đầu Việt Nam',
        des: 'Cửa hàng công nghệ Hữu Nhân luôn nằm trong top 10 những nhà bán lẻ tốt nhất trong những năm trở lại đây',
    },
    {
        icon: MdOutline6FtApart,
        title: 'Đối tác cao cấp',
        des: 'Cửa hàng luôn có những đối tác cao cấp và chất lượng cùng nhau bắt tay để cả đôi bên cùng phát triển và đi lên',
    },
    {
        icon: AiOutlineSearch,
        title: 'Tìm kiếm nhiều nhất',
        des: 'Từ những ngày đầu thành lập cửa hàng Hữu Nhân luôn là từ khóa được tìm kiếm nhiều nhất ',
    },
    {
        icon: FaProductHunt,
        title: 'Sản phẩm tốt nhất',
        des: 'Với sự uy tín của cửa hàng sản phẩm tốt luôn là thứ được cửa hàng rất chú trọng và cửa hàng sẽ cho ra các sản phẩm chất lượng hơn nữa',
    },
];
const dataValue = [
    {
        img: image.introduce.customer,
        title: 'Khách hàng',
        des: 'Khách hàng luôn là cốt lõi và trọng tâm của mọi hoạt động',
    },
    {
        img: image.introduce.integrity,
        title: 'Chính trực',
        des: 'Luôn làm điều đúng, tạo sự công bằng cho khách hàng',
    }, {
        img: image.introduce.care,
        title: 'Quan tâm',
        des: 'Luôn quan tâm và tin tưởng lẫn nhau',
    },
    {
        img: image.introduce.team,
        title: 'Đồng đội',
        des: 'Phối hợp nhịp nhàng cùng tiến về phía trước',
    },
];
const dataOrganization = [
    { icon: GoLaw, title: 'Pháp chế'},
    { icon: RiMoneyDollarCircleFill, title: 'Tài chính'},
    { icon: BsFillBarChartFill, title: 'Marketing'},
    { icon: BsFillTelephonePlusFill, title: 'Chăm sóc khách hàng'},
    { icon: TbBuildingSkyscraper, title: 'Cơ sở vật chất'},
    { icon: AiFillSetting, title: 'Ngành hàng'},
    { icon: FaSearch, title: 'Hành chính nhân sự'},
    { icon: BsFillCartCheckFill, title: 'Vận hành bán lẻ'},
    { icon: FaProductHunt, title: 'Sản phẩm'},
    { icon: FaAssistiveListeningSystems, title: 'Lắng nghe'},
    { icon: BsPieChartFill, title: 'Tin tưởng'},
    { icon: FaHandRock, title: 'Phấn đấu'},
];
const Introduce = () => {
    const [current, setCurrent] = useState('');
    const onChange = (value) => {
        console.log('onChange:', value);
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
                    <Row gutter={[{ xl: 30 }, { xl: 30 }]} align={"middle"}>
                        <Col xl={12}>
                            <div className={clsx(style.introduce__head)}>
                                <h1>Cửa hàng công nghệ Hữu Nhân</h1>
                                <p>Cửa hàng kinh doanh sản phẩm công nghệ hàng đầu Việt Nam</p>
                                <div onClick={() => {window.scrollTo({top: 800, behavior: 'smooth'})}}>
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
                            <div className={clsx(style.introduce__body)}>
                                <img src={image.introduce.introduce} alt="introduce" />
                            </div>
                        </Col>
                    </Row>
                </section>
                <section className={clsx(style.statistical)}>
                    <Row gutter={[{ xl: 30 }, { xl: 30 }]} align={"middle"}>
                        <Col
                            xl={12}
                            data-aos="fade-right"
                            data-aos-duration="1000"
                            data-aos-easing="ease-in-sine"
                        >
                            <div className={clsx(style.statistical__head)}>
                                <img src={image.introduce.statistical} alt="sta" />
                            </div>
                        </Col>
                        <Col xl={12}
                            data-aos="fade-left"
                            data-aos-duration="1000"
                            data-aos-easing="ease-in-sine"
                        >
                            <div className={clsx(style.statistical__body)}>
                                <div className={clsx(style.statistical__body__title)}>
                                    <h1>Những con số biết nói</h1>
                                </div>
                                {
                                    dataStatistical.map((item, index) => {
                                        return (
                                            <div key={index}className={clsx(style.statistical__body__progress)}>
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
                        <h1>Quá trình phát triển của cửa hàng Hữu Nhân</h1>
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
                    <Row gutter={[{ xl: 30 }, { xl: 30 }]}>
                        <Col xl={24}>
                            <section className={clsx(style.card__head)}>
                                <h1>Sứ mệnh</h1>
                            </section>
                        </Col>
                        {
                            dataCard.map((item, index) => {
                                return (
                                    <Col xl={6}
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
                    <Row align={"middle"} >
                        <Col xl={24}>
                            <section className={clsx(style.achievement__head)}>
                                <h1>Thành tựu</h1>
                            </section>
                        </Col>
                        <Col xl={12}>
                            <section className={clsx(style.achievement__img)}>
                                <img src={image.introduce.achievement} alt="alt" />
                            </section>
                        </Col>
                        <Col xl={12}>
                            <Row gutter={[{ xl: 30 }, { xl: 30 }]}>
                                {
                                    dataAchievement.map((item, index) => {
                                        return (
                                            <Col xl={12} key={index}>
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
                    <Row gutter={[{xl:30},{xl: 30}]}>
                        <Col xl={24}>   
                            <section className={clsx(style.organization__head)}>
                                <h1>Cơ cấu tổ chức</h1>
                            </section>
                        </Col>
                        {
                            dataOrganization.map((item, index) => {
                                return (
                                    <Col xl={6} key={index}>
                                        <section className={clsx(style.organization__body)}>
                                            <item.icon className={clsx(style.icon)}/>
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