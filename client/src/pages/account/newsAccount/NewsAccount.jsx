import { clsx } from 'clsx';
import { useState } from 'react';
import style from './newsAccount.module.scss';
const dataNews = [
    {
        title: 'Bản tin khuyến mãi',
        content: [
            'Bản tin khuyến mại(1 tuần/lần)',
            'Bản tin khuyến mại tháng(1 tháng/lần)',
            'Các thông tin khuyến mại và thông tin giảm giá hấp dẫn với số lượng giới hạn chỉ dành riêng cho bạn',
            'Khuyến mãi tri ân Khách hàng thân thiết trong chương trình Membership Loyalty'
        ]
    },
    {
        title: 'Bản tin công nghệ',
        content: [
            'Góc công nghệ: giới thiệu các sản phẩm công nghệ mới nhất', 
            'Góc Gaming: tất tần tật về gaming và gamer, các giải đấu esport đỉnh cao', 
            'Góc thủ thuật: hướng dẫn các thủ thuật máy tính và công nghệ ứng dụng cao trong cuộc sống từ chuyên gia Phong Vũ', 
        ],
    },
    {
        title: 'Thư mời tham dự event',
        content: [
            'Giải đấu esport do Phong Vũ tổ chức/tài trợ',
            'Event miễn phí trải nghiệm sản phẩm do Phong Vũ và các đối tác tổ chức tài trợ'
        ]
    }
];
const NewsAccount = () => {
    const [check, setCheck]= useState(true);
    return (
        <main className={clsx(style.main)}>
            <section className={clsx(style.newsAccount)}>
                <section className={clsx(style.newsAccount__head)}>
                    <h1>Quản lý thông báo</h1>
                </section>
                <section className={clsx(style.newsAccount__body)}>
                    {
                        dataNews.map((item, index) => {
                            return (
                                <section className={clsx(style.newsAccount__body__content)} key={index}>
                                    <h1>{item.title}</h1>
                                    <ul>
                                        {
                                            item.content.map((item, index) => {
                                                return (
                                                    <li key={index}>
                                                        <input 
                                                            type="checkbox" 
                                                            defaultChecked={check}
                                                            onClick={() => setCheck(!check)}
                                                        />
                                                        <span>{item}</span>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </section>
                            )
                        })
                    }
                    <button>Cập nhật</button>
                </section>
            </section>
        </main>
    )
}

export default NewsAccount;