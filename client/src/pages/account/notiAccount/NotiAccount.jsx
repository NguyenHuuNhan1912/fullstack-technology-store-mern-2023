// Library
import {clsx} from 'clsx';

// Local
import style from './notiAccount.module.scss';
import images from 'assets/images';

const NotiAccount = () => {
    return (
        <main className={clsx(style.main)}>
            <section className={clsx(style.notiAccount)}>
                <section className={clsx(style.notiAccount__no)}>
                    <img src={images.account.noNoti} alt="img" />
                    <p>Bạn chưa có thông báo mới</p>
                </section>
            </section>
        </main>
    )
}

export default NotiAccount;