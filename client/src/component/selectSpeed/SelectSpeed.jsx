import clsx from 'clsx';
import style from './selectSpeed.module.scss';
import images from 'assets/images/index';

import { useEffect, useState, useRef } from 'react';
const datasocialNetwork = [
    { icon: images.socialNetWork.phone},
    { icon: images.socialNetWork.fB },
    { icon: images.socialNetWork.mess },
    { icon: images.socialNetWork.map },
    { icon: images.socialNetWork.youtube },
    { icon: images.socialNetWork.email },
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
                                <a href="https://dashtar-admin.vercel.app/dashboard">
                                    <img src={item.icon} alt="icon"/>
                                </a>
                            </li>
                        )
                    })
                }
            </ul>
            {/* <h1 className='a'>this is button</h1> */}
            {(
                <button style={{transform: `${!show ? 'translateX(150%)' : 'translateX(0)'}`}} ref={goToTopRef} onClick={handleClick} className={clsx(style.btn, style.btnGoToTop)}>
                    <img src={images.socialNetWork.goToTop} alt="alt"/>
                </button>
            )}
        </main>
    )
}
export default SelectSpeed;