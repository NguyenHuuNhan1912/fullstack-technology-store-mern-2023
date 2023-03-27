import images from 'assets/images/index';
import {clsx} from 'clsx';
import style from './notFound.module.scss';
import {Link} from 'react-router-dom';
import {BiArrowBack} from 'react-icons/bi';
const NotFound = () => {
    return (
        <main className={clsx(style.notFound)}>
            <section className={clsx(style.notFound__head)}>
                <img src={images.notFound.notFound} alt="" />
            </section>
            <section className={clsx(style.notFound__body)}>
                <Link to="/">
                    <button>
                        <BiArrowBack className={clsx(style.icon)}/>
                        <span>Về trang chủ</span>
                    </button>
                </Link>
            </section>
        </main>
    )
}
export default NotFound;