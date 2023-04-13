// Library
import clsx from 'clsx';

// Local
import style from './selectSpeed.module.scss';
import images from 'assets/images/index';

// React
import { useEffect, useState, useRef } from 'react';

// Variables Global
const datasocialNetwork = [
    { icon: images.socialNetWork.phone, path: 'tel: 0342040063'},
    { icon: images.socialNetWork.fB, path: 'https://www.facebook.com/nguyenhuunhan.frontend/' },
    { icon: images.socialNetWork.mess, path: 'https://www.facebook.com/nguyenhuunhan.frontend/' },
    { icon: images.socialNetWork.map, path: 'https://goo.gl/maps/5NK6ywM1q8GxEmzq8'},
    { icon: images.socialNetWork.youtube, path: 'https://www.youtube.com/@NguyenHuuNhan1010' },
    { icon: images.socialNetWork.email, path: 'mailto: nguyenhuunhan.coder@gmail.com' },
];

const SelectSpeed = () => {
    const [show, setShow] = useState(false);
    var goToTopRef = useRef();
    useEffect(() => {
        const handleScroll = () => {
            setShow(window.scrollY >= 300);
        }
        window.removeEventListener('scroll', handleScroll);
        window.addEventListener('scroll', handleScroll, {passive: true});
        return () => window.removeEventListener('scroll', handleScroll);
    },[show]);
    const handleClick = () => {
        goToTopRef.current.style = 'animation: smoothBack 1.5s linear 1; transform: translateX(150%);';
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
    return (
        <main className={clsx(style.selectSpeed)}>
            <ul className={clsx(style.navList)}>
                {
                    datasocialNetwork.map((item, index) => {
                        return (
                            <li key={index} className={clsx(style.navItem)}>
                                <a href={item.path} target='_blank'>
                                    <img src={item.icon} alt="icon"/>
                                </a>
                            </li>
                        )
                    })
                }
            </ul>
            {
                <button 
                    style={{transform: `${!show ? 'translateX(150%)' : 'translateX(0)'}`}} ref={goToTopRef} 
                    onClick={handleClick} className={clsx(style.btn, style.btnGoToTop)}
                >
                    <img src={images.socialNetWork.goToTop} alt="alt"/>
                </button>
            }
        </main>
    )
}
export default SelectSpeed;